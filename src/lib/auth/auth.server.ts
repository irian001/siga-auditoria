import { createServerFn } from "@tanstack/react-start";

import { isSupabaseConfigured } from "@/config/env";
import { getSupabaseServerClient } from "@/data/supabase/supabaseServerClient";
import { createSupabaseUserContextRepository } from "@/data/supabase/supabaseUserContextRepository";
import type { UserAccessState } from "@/domain/organizationMembership";

export type ServerAuthState = {
  configured: boolean;
  authenticated: boolean;
  identity: { id: string; email: string } | null;
  access: UserAccessState | null;
};

export const getServerAuthState = createServerFn({ method: "GET" }).handler(
  async (): Promise<ServerAuthState> => {
    if (!isSupabaseConfigured) {
      return { configured: false, authenticated: false, identity: null, access: null };
    }

    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      return { configured: true, authenticated: false, identity: null, access: null };
    }

    return {
      configured: true,
      authenticated: true,
      identity: { id: data.user.id, email: data.user.email ?? "" },
      access: await createSupabaseUserContextRepository(supabase).resolveCurrentUserAccess(
        data.user.id,
      ),
    };
  },
);
