import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ztwngiyufazuafmvilcz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0d25naXl1ZmF6dWFmbXZpbGN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwNDQ0OTMsImV4cCI6MjA0NjYyMDQ5M30.f_C1aI8VRPdSgxBaOHY0NcDpbSgj-9-h6tPVZCOa_1g";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
