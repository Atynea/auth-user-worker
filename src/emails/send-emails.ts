import { Resend } from 'resend';

export interface EmailOptions {
	from: string;
	to: string;
	subject: string;
	html: string;
}

export const sendEmail = async (options: EmailOptions, env: Env): Promise<boolean> => {
	try {
		const resend = new Resend(env.RESEND_API_KEY);
		const { error } = await resend.emails.send({
			from: 'hola@atynea.com',
			to: options.to,
			subject: options.subject,
			html: options.html || '',
		});

		if (error) {
			console.error('❌ Error al enviar email:', error);
			return false;
		}

		console.log('✅ Email enviado correctamente');
		return true;
	} catch (error) {
		console.error('❌ Error al enviar email:', error);
		return false;
	}
};
