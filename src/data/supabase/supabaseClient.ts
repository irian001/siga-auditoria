import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { appEnvironment, isSupabaseConfigured } from "@/config/env";

let browserClient: SupabaseClient | undefined;

export function getSupabaseBrowserClient(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase authentication is not configured.");
  }

  browserClient ??= createBrowserClient(
    appEnvironment.supabaseUrl!,
    appEnvironment.supabaseAnonKey!,
  );
  return browserClient;
}
