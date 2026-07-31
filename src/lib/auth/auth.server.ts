import { createServerFn } from "@tanstack/react-start";

import { isSupabaseConfigured } from "@/config/env";
import { getSupabaseServerClient } from "@/data/supabase/supabaseServerClient";

export type ServerAuthState = {
  configured: boolean;
  authenticated: boolean;
  identity: { id: string; email: string } | null;
};

export const getServerAuthState = createServerFn({ method: "GET" }).handler(
  async (): Promise<ServerAuthState> => {
    if (!isSupabaseConfigured) {
      return { configured: false, authenticated: false, identity: null };
    }

    const { data, error } = await getSupabaseServerClient().auth.getUser();
    if (error || !data.user) {
      return { configured: true, authenticated: false, identity: null };
    }

    return {
      configured: true,
      authenticated: true,
      identity: { id: data.user.id, email: data.user.email ?? "" },
    };
  },
);
