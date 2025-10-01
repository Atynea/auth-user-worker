import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

export async function getSupabaseAdminClient(env: Env) {
	const supabaseUrl = env.SUPABASE_URL;
	const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

	const supabase = createClient<Database>(supabaseUrl, supabaseServiceRoleKey);

	return supabase;
}
