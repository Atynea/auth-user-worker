import { sendEmailVerifyUser } from '../emails/send-emails';
import { verificationUserIntoCall } from '../services/verification-user-into-call';
import { getSupabaseAdminClient } from '../supabase/getAdminClient';
import { templateSuccessRegisterCall } from '../templates/succes-register-call';

/**
 * # Handler para registrar un usuario a una convocatoria.
 * ### 1. Recibe el email, tenant, display_name y call_id del postulante.
 * ### 2. Verifica que el email no esté registrado en la base de datos - tabla user
 * ### 3. Si el email no está registrado, se registra el usuario en la tabla auth con una contraseña random y se asocia a la convocatoria (call) correspondiente.
 * ### 4. Si el email ya está registrado, se verifica que no este asociado a la organizacion quien creo la convocatoria
 * ### 5. Si el email ya esta registrado y no esta asociado a la organizacion, se verifica que no este ya registrado en la convocatoria.
 * ### 6. si no esta ni en la organizacion ni en la convocatoria, se asocia el usuario a la convocatoria.
 * ### 7.se crea el magic link para el usuario y se envia un correo de confirmacion de registro a la convocatoria.
 */
export default async function handlerRegisterUserCall(
	email: string,
	tenant: string,
	display_name: string,
	call_id: string,
	env: Env,
	ctx: ExecutionContext,
) {
	try {
		const supabase = await getSupabaseAdminClient(env);

		const response = await verificationUserIntoCall({ email, tenant, call_id, display_name, env, ctx });

		if (!response.ok || !response.data) {
			throw new Error(response.error || 'Error desconocido al verificar el correo en la convocatoria');
		}

		const supabase_user_id = response.data.supabase_user_id;

		// ASOCIAR USUARIO A LA CONVOCATORIA
		const { error: errorRegisterCall } = await supabase.from('calls_aplications').insert({
			call: call_id,
			user: supabase_user_id,
			display_name,
			email: email,
			status: 'draft',
		});

		if (errorRegisterCall) {
			throw new Error(errorRegisterCall.message);
		}

		const { data: dataMagiclink, error: errorMagicLink } = await supabase.auth.admin.generateLink({
			email,
			type: 'magiclink',
		});

		if (errorMagicLink) {
			throw new Error(errorMagicLink.message);
		}

		const hashToken = dataMagiclink.properties.hashed_token;

		const url = `${env.REDIRECT_CALL_PLATFORM_URL}${call_id}/auth/verify?hashed_token=${hashToken}&type=signup`;

		console.log('URL DE VERIFICACION:', url);

		const result = await sendEmailVerifyUser(
			{
				from: 'hola@atynea.com',
				to: email,
				subject: 'Preoceso de convocatoria',
				html: templateSuccessRegisterCall(display_name, url),
			},
			env,
		);

		if (!result) {
			throw new Error('Error al intentar enviar el correo de verificación');
		}

		return { ok: true };
	} catch (error) {
		return { ok: false, error: error instanceof Error ? error.message : 'Error desconocido' };
	}
}
