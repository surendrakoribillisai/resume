window.SUPABASE_URL = "https://hjgxzpfbyevisssuteps.supabase.co/rest/v1/";

window.SUPABASE_PUBLISHABLE_KEY = "sb_publishable_6rqyiBlM3Mcxo2kyMxXPEQ_KpcZms9g";

if (
  window.supabase &&
  window.SUPABASE_URL &&
  window.SUPABASE_PUBLISHABLE_KEY
) {
  window.supabaseClient = window.supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_PUBLISHABLE_KEY
  );
} else {
  console.warn("Supabase is not available. Admin will use local storage.");
}
