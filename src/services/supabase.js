import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://bbwwldbpdwokqhnjyltg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJid3dsZGJwZHdva3Fobmp5bHRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MTc2NTYsImV4cCI6MjA1ODM5MzY1Nn0.zauJL2BMhBE-Jym3FnhOWBcF5ifXNBjFbe1WJ5PhWj4";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
