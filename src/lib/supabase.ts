import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function isValidSupabaseConfig(url: string | undefined, key: string | undefined) {
  if (!url || !key) return false;
  if (url.includes("YOUR_SUPABASE") || key.includes("YOUR_SUPABASE")) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

if (!isValidSupabaseConfig(supabaseUrl, supabaseAnonKey)) {
  throw new Error(
    "Configuração do Supabase inválida. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY em .env.local (desenvolvimento) ou nas Environment Variables do projeto na Vercel (produção). A URL deve começar com https://.",
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
