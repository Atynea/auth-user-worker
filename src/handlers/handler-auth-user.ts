import { sendEmailVerifyUser } from '../emails/send-emails';
import { getSupabaseAdminClient } from '../supabase/getAdminClient';
import { templateEmailVerifyUser } from '../templates/email-auth';

export async function handlerAuthUser(email: string, tenant: string, first_name: string, env: Env, ctx: ExecutionContext) {
	try {
		const supabase = await getSupabaseAdminClient(env);

		const { data: dataMagiclink, error: errorMagicLink } = await supabase.auth.admin.generateLink({
			email,
			type: 'magiclink',
		});

		if (errorMagicLink) {
			throw new Error(errorMagicLink.message);
		}

		const hashToken = dataMagiclink.properties.hashed_token;

		const url = `${env.REDIRECT_URL}${tenant}/auth/verify?hashed_token=${hashToken}&type=signup`;

		console.log(url);

		const result = await sendEmailVerifyUser(
			{
				from: 'hola@atynea.com',
				to: email,
				subject: 'Confirmación de correo',
				html: templateEmailVerifyUser(first_name, url),
			},
			env
		);

		if (!result) {
			throw new Error('Error al intentar enviar el correo de verificación');
		}

		return new Response('Enviado con exito el correo de activación');
	} catch (error) {
		return new Response('Falló el envio del correo de activación');
	}
}
