import { getSupabaseAdminClient } from '../supabase/getAdminClient';
import { createHash } from './create-hash';

type propsVerificationUserIntoCall = {
	email: string;
	tenant: string;
	call_id: string;
	display_name: string;
	env: Env;
	ctx: ExecutionContext;
};

export async function verificationUserIntoCall({ email, tenant, call_id, display_name, env, ctx }: propsVerificationUserIntoCall) {
	try {
		const supabase = await getSupabaseAdminClient(env);

		const { data, error } = await supabase.from('users').select('id, supabase_user, email').eq('email', email).maybeSingle();

		let supabase_user_id = null;

		if (error) {
			throw new Error(error.message);
		}

		if (!data) {
			// SI EL USUARIO NO EXISTE, SE CREA EN SUPABASE AUTH

			const { data: authData, error: authError } = await supabase.auth.admin.createUser({
				email,
				password: 'AtyneaCallPlatform',
				user_metadata: {
					display_name,
				},
			});

			if (authError) {
				throw new Error(authError.message);
			}

			const { error: createUserError } = await supabase
				.from('users')
				.insert({ email, supabase_user: authData.user.id, full_name: display_name, ent_first_name: display_name });

			if (createUserError) {
				throw new Error(createUserError.message);
			}

			supabase_user_id = authData.user.id;
		} else {
			// VERIFICAR QUE NO ESTE INSCRITO EN LA CONVOCATORIA
			const { data: dataCall, error: errorCall } = await supabase
				.from('calls_aplications')
				.select('id')
				.eq('call', call_id)
				.eq('user', data.supabase_user)
				.maybeSingle();

			if (errorCall || dataCall) {
				throw new Error(errorCall?.message || 'El usuario ya se encuentra registrado en la convocatoria');
			}

			const { data: dataAuth, error: errorAuth } = await supabase.auth.admin.getUserById(data.supabase_user);

			if (errorAuth || !dataAuth) {
				await supabase.from('tenant_permissions').delete().eq('tenant', tenant).eq('user', data.id);
				throw new Error(errorAuth?.message || 'Error desconocido al obtener los datos de autenticación del usuario');
			}

			const currentData = dataAuth.user.app_metadata || {};

			const currentTenants = currentData.tenants || [];

			const currentRole = currentData.role || null;

			// VERIFICAR QUE NO SEA PARTE DEL TENANT O QUE NO TENGA UN ROL DISTINTO A EMPRENDEDOR, PORQUE SI ES ASI, NO PUEDE APLICAR A LA CONVOCATORIA POR SEGURIDAD
			if(currentTenants.includes(tenant) || currentRole !== 'entrepreneur') {
				throw new Error('Correo invalido para hacer parte de la convocatoria, Prueba con otro');
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
