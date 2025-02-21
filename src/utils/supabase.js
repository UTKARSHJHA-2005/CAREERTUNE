// Supabase Initialization for authentication
import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase URL or Anon Key.");
}
// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Function to set authentication session
const supabaseClient = async (accessToken) => {
    if (accessToken) {
        await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: "",
        });
    }
    return supabase;
};
// Export both as named exports
export default supabaseClient;
