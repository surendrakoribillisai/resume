// Supabase configuration
// Keep the Publishable key here. Never use a secret/service_role key.

window.SUPABASE_URL = "https://hjgxzpfbyevisssuteps.supabase.co";

window.SUPABASE_PUBLISHABLE_KEY = "sb_publishable_6rqyiBlM3Mcxo2kyMxXPEQ_KpcZms9g";

// Do not stop the Admin page if Supabase/CDN is temporarily unavailable.
try {
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
    console.warn("Supabase client unavailable. Admin will use local storage.");
  }
} catch (error) {
  console.warn("Supabase initialization failed. Admin will still load.", error);
  window.supabaseClient = null;
}
