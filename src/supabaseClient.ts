import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wbhrljyegtuxcrriaqis.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiaHJsanllZ3R1eGNycmlhcWlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMzU5NzYsImV4cCI6MjA3MDYxMTk3Nn0.V5v66K84usz0DFucKHW7NjptTtlEalCXaowNtsHAiYw';
export const supabase = createClient(supabaseUrl, supabaseKey);
