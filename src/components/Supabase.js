import { createClient } from '@supabase/supabase-js';
import { createClient as createRealtime } from '@supabase/realtime-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
