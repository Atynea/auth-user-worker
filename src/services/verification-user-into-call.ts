import { getSupabaseAdminClient } from '../supabase/getAdminClient';

type propsVerificationUserIntoCall = {
	email: string;
	tenant: string;
	call_id: string;
	env: Env;
	ctx: ExecutionContext;
};

export async function verificationUserIntoCall({ email, tenant, call_id, env, ctx }: propsVerificationUserIntoCall) {
	try {
		const supabase = await getSupabaseAdminClient(env);

		const { data, error } = await supabase.from('users').select('id, supabase_user, email').eq('email', email).single();

		let supabase_user_id = null;

		if (error) {
			throw new Error(error.message);
		}

		if (!data) {
			const { data: authData, error: authError } = await supabase.auth.admin.createUser({});

			if (authError) {
				throw new Error(authError.message);
			}

			return { ok: true };
		} else {
			// VERIFICAR QUE NO ESTE INSCRITO EN LA CONVOCATORIA
			const { data: dataCall, error: errorCall } = await supabase
				.from('calls_aplications')
				.select('id')
				.eq('call', call_id)
				.eq('user', data.supabase_user)
				.single();

			if (errorCall || dataCall) {
				throw new Error(errorCall?.message || 'El usuario ya se encuentra registrado en la convocatoria');
			}

			// VERIFICAR QUE NO SEA PARTE DE LA ORGANIZACION
			const { data: dataUser, error: errorUser } = await supabase
				.from('tenant_permissions')
				.select('id')
				.eq('tenant', tenant)
				.eq('user', data.id)
				.single();

			if (errorUser || dataUser) {
				throw new Error(errorUser?.message || 'El usuario ya pertenece a la organizacion que creo la convocatoria');
			}

			supabase_user_id = data.supabase_user;
		}

		if (!supabase_user_id) {
			throw new Error('Error desnoconcido al verificar al usuario');
		}

		return {
			ok: true,
			data: {
				supabase_user_id,
			},
		};
	} catch (error) {
		return { ok: false, error: error instanceof Error ? error.message : 'Error desconocido' };
	}
}
