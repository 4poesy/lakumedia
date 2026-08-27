import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/lib/types/supabase';

export function createClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    process.env.NEXT_SUPABASE_URL ||
    'https://bscpqpfraimbxewvjlid.supabase.co';

  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_KEY ||
    process.env.NEXT_SUPABASE_SERVICE_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzY3BxcGZyYWltYnhld3ZqbGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NDcxMzksImV4cCI6MjEwMzIyMzEzOX0.tk4946uho9BwCCbS-iTiWnsSYV3dNzIBfpOHDrD5YYQ';

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
