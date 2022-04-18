import { createClient } from "@supabase/supabase-js";

const SupabaseURL = process.env.REACT_APP_SUPABASE_URL;
const SupabaseToken = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(SupabaseURL, SupabaseToken);

export { supabase };
