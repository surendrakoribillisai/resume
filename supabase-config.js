// Paste your Supabase Project URL and Publishable key here.
// Do NOT put a secret/service_role key in this file.
window.SUPABASE_URL = "https://hjgxzpfbyevisssuteps.supabase.co/rest/v1/";
window.SUPABASE_PUBLISHABLE_KEY = "sb_publishable_6rqyiBlM3Mcxo2kyMxXPEQ_KpcZms9g";

if (window.SUPABASE_URL.startsWith("http") && !window.SUPABASE_URL.includes("PASTE_PROJECT_URL")) {
  window.supabaseClient = window.supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_PUBLISHABLE_KEY
  );
}