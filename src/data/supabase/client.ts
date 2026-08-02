import { createBrowserClient } from "@supabase/ssr";

import { appEnvironment } from "@/config/env";

let browserClient: ReturnType<typeof createBrowserClient> | undefined;

export function getSupabaseBrowserClient() {
  const { supabaseUrl, supabasePublishableKey } = appEnvironment;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "Integração Supabase não configurada: informe a URL e a chave publicável do projeto oficial.",
    );
  }

  browserClient ??= createBrowserClient(supabaseUrl, supabasePublishableKey);

  return browserClient;
}
