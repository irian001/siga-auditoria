import { z } from "zod";

import type { SigaEnvironment } from "@/domain/contracts";

const environmentSchema = z.object({
  VITE_SIGA_ENV: z.enum(["development", "staging", "production"]).default("development"),
  VITE_SIGA_APP_NAME: z.string().trim().min(1).default("SIGA"),
  VITE_SIGA_API_URL: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined),
  VITE_SIGA_SUPABASE_URL: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined),
  VITE_SIGA_SUPABASE_PUBLISHABLE_KEY: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined),
});

export type AppEnvironment = {
  environment: SigaEnvironment;
  appName: string;
  apiUrl?: string;
  supabaseUrl?: string;
  supabasePublishableKey?: string;
};

// Estes valores identificam o projeto oficial e são públicos por definição.
// A chave publicável pode ser enviada ao navegador; chaves secretas e service_role
// continuam proibidas no frontend.
const officialSupabasePublicConfig = {
  url: "https://umuassmgminmliuypoyp.supabase.co",
  publishableKey: "sb_publishable_mFVLbZTEK3sGSnPiZecvuA_nBKdlYUd",
} as const;

/**
 * Único ponto autorizado para leitura de variáveis públicas do Vite.
 * Somente variáveis públicas podem ser lidas neste módulo.
 */
const parsedEnvironment = environmentSchema.parse(import.meta.env);

export const appEnvironment: AppEnvironment = {
  environment: parsedEnvironment.VITE_SIGA_ENV,
  appName: parsedEnvironment.VITE_SIGA_APP_NAME,
  apiUrl: parsedEnvironment.VITE_SIGA_API_URL,
  supabaseUrl: parsedEnvironment.VITE_SIGA_SUPABASE_URL ?? officialSupabasePublicConfig.url,
  supabasePublishableKey:
    parsedEnvironment.VITE_SIGA_SUPABASE_PUBLISHABLE_KEY ??
    officialSupabasePublicConfig.publishableKey,
};

export const isSupabaseConfigured = Boolean(
  appEnvironment.supabaseUrl && appEnvironment.supabasePublishableKey,
);
