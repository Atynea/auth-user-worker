export function templateRejectedApplication(
	display_name: string,
	tenantName: string
) {
	return `
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
	<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
		<tr>
			<td align="center">
				<table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

					<!-- Header -->
					<tr>
						<td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #00353D 0%, #5CE1B7 100%);">
							<h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 600;">
								Gracias por tu participación
							</h1>
						</td>
					</tr>

					<!-- Content -->
					<tr>
						<td style="padding: 40px;">
							<p style="margin: 0 0 20px; color: #00353D; font-size: 16px; line-height: 1.6;">
								Hola, <strong>${display_name}</strong> 👋
							</p>

							<p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
								Queremos agradecerte sinceramente por tu interés en formar parte de <strong>${tenantName}</strong> y por el tiempo que dedicastes a tu postulación.
							</p>

							<p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
								Después de un proceso de evaluación detallado, en esta ocasión tu postulación no ha sido seleccionada.
							</p>

							<p style="margin: 0 0 30px; color: #333333; font-size: 16px; line-height: 1.6;">
								Valoramos tu esfuerzo y te animamos a participar en futuras convocatorias que se ajusten a tu perfil.
							</p>

							<p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">
								Te deseamos muchos éxitos en tus próximos proyectos y procesos.
							</p>
						</td>
					</tr>

				</table>
			</td>
		</tr>
	</table>
</body>
</html>
	`;
}