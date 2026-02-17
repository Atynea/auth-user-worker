import { sendEmail } from '../emails/send-emails';
import { templateRejectedApplication } from '../templates/template-rejected-aplication';

export async function handlerRegiserRejectedApplicationCall(
	display_name: string,
	email: string,
	tenant: string,
	env: Env,
	ctx: ExecutionContext,
) {
	try {
		const resultado = await sendEmail(
			{
				from: 'hola@atynea.com',
				to: email,
				subject: 'Resultado de tu aplicación',
				html: templateRejectedApplication(display_name, tenant),
			},
			env,
		);

		if (!resultado) {
			throw new Error('Error al enviar el correo de rechazo');
		}

		return {
			ok: true,
		};
	} catch (error) {
		return {
			ok: false,
		};
	}
}
