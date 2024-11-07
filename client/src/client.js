import { createClient } from '@supabase/supabase-js'
const URL = 'https://jhphanvfkjdicuocufrh.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpocGhhbnZma2pkaWN1b2N1ZnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5NTYwNTgsImV4cCI6MjA0NjUzMjA1OH0.XRA815P4HPjtRdIt32lVtyyKry7Ky32IgZgssEZyb2k';
export const supabase = createClient(URL, API_KEY);
