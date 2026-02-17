import { sendEmail } from '../emails/send-emails';
import { getSupabaseAdminClient } from '../supabase/getAdminClient';
import { templateApprovedApplication } from '../templates/template-approved-aplication';

export async function handlerRegiserApprovedApplicationCall(
	idSupabase: string,
	email: string,
	tenant: string,
	env: Env,
	ctx: ExecutionContext,
) {
	try {
		const supabase = await getSupabaseAdminClient(env);

		const { data, error } = await supabase.from('users').select('id, full_name').eq('supabase', idSupabase).single();

		if (error || !data) {
			throw new Error(error?.message || 'Erro descnocido al obtener el usuario de Supabase');
		}

		const { error: errorRegisterTenantPermission } = await supabase.from('tenant_permissions').insert({
			tenant,
			user: data.id,
			role: 'entrepreneur',
		});

		if (errorRegisterTenantPermission) {
			throw new Error(errorRegisterTenantPermission.message || 'Error desconocido al insertar el permiso del tenant');
		}

		const { data: dataAuth, error: errorAuth } = await supabase.auth.admin.getUserById(idSupabase);

		if (errorAuth || !dataAuth) {
			await supabase.from('tenant_permissions').delete().eq('tenant', tenant).eq('user', data.id);
			throw new Error(errorAuth?.message || 'Error desconocido al obtener los datos de autenticación del usuario en Supabase');
		}

		const currentData = dataAuth.user.app_metadata || {};

		const currentTenants = currentData.tenants || [];

		const updatedTenants = currentTenants.includes(tenant) ? currentTenants : [...currentTenants, tenant];

		const { error: updateError } = await supabase.auth.admin.updateUserById(idSupabase, {
			app_metadata: {
				...currentData,
				tenants: updatedTenants,
				role: currentData.role || 'entrepreneur',
				finished_onboarding: currentData.finished_onboarding || false,
				user_id: currentData.user_id || data.id,
			},
		});

		if (updateError) {
			await supabase.from('tenant_permissions').delete().eq('tenant', tenant).eq('user', data.id);
			throw new Error(updateError.message || 'Error desconocido al actualizar los datos de autenticación del usuario en Supabase');
		}

		const url = `${env.REDIRECT_PRINCIPAL_PLATFORM_URL}${tenant}`;

		const result = await sendEmail(
			{
				from: 'hola@atynea.com',
				to: email,
				subject: '¡Tu aplicación ha sido aprobada!',
				html: templateApprovedApplication(data.full_name, tenant, url),
			},
			env,
		);

		if (!result) {
			await supabase.from('tenant_permissions').delete().eq('tenant', tenant).eq('user', data.id);
			await supabase.auth.admin.updateUserById(idSupabase, { app_metadata: currentData });
			throw new Error('Error al intentar enviar el correo de aprobación');
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
