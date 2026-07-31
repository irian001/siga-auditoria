import { createServerClient } from "@supabase/ssr";
import { getCookies, setCookie } from "@tanstack/react-start/server";

import { appEnvironment, isSupabaseConfigured } from "@/config/env";

export function getSupabaseServerClient() {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase authentication is not configured.");
  }

  return createServerClient(appEnvironment.supabaseUrl!, appEnvironment.supabaseAnonKey!, {
    cookies: {
      getAll() {
        return Object.entries(getCookies()).map(([name, value]) => ({ name, value }));
      },
      setAll(cookies) {
        cookies.forEach(({ name, value, options }) => {
          setCookie(name, value, {
            ...options,
            secure: appEnvironment.environment === "production",
          });
        });
      },
    },
  });
}
