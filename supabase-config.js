window.SUPABASE_URL = "https://hjgxzpfbyevisssuteps.supabase.co";

window.SUPABASE_PUBLISHABLE_KEY = "YOUR_PUBLISHABLE_KEY";

try {
  window.supabaseClient = window.supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_PUBLISHABLE_KEY
  );
} catch (e) {
  console.error("Supabase connection failed:", e);
  window.supabaseClient = null;
}
