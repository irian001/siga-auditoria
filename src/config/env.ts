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
  VITE_SIGA_SUPABASE_ANON_KEY: z
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
  supabaseAnonKey?: string;
};

/**
 * Único ponto autorizado para leitura de variáveis públicas do Vite.
 * Esta SDD não realiza conexão com API nem Supabase.
 */
export const appEnvironment: AppEnvironment = environmentSchema.parse(import.meta.env);
