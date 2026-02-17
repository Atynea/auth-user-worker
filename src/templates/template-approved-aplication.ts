export function templateApprovedApplication(display_name: string, tenantName: string, resetPasswordUrl: string) {
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
								¡Tu postulación fue aprobada! 🎉
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
								Nos complace informarte que tu postulación fue <strong>aprobada exitosamente</strong>.
							</p>

							<p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
								Desde ahora haces parte de la familia <strong>${tenantName}</strong>.
							</p>

							<p style="margin: 0 0 30px; color: #333333; font-size: 16px; line-height: 1.6;">
								Para acceder, debes crear tu contraseña utilizando la opción <strong>"Olvidé mi contraseña"</strong> con el correo electrónico con el que realizaste tu registro.
							</p>

							<!-- Button -->
							<table width="100%" cellpadding="0" cellspacing="0">
								<tr>
									<td align="center" style="padding: 20px 0;">
										<a href="${resetPasswordUrl}" style="
											display: inline-block;
											padding: 16px 40px;
											background-color: #5CE1B7;
											color: #00353D;
											text-decoration: none;
											border-radius: 8px;
											font-size: 16px;
											font-weight: 600;
											box-shadow: 0 4px 12px rgba(92, 225, 183, 0.4);
										">
											Crear mi contraseña
										</a>
									</td>
								</tr>
							</table>

							<p style="margin: 30px 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
								Si tienes algún inconveniente, verifica que estés utilizando el mismo correo con el que realizaste tu postulación.
							</p>

							<!-- Fallback link -->
							<p style="margin-top: 16px; font-size: 12px; color: #999999;">
								Si el botón no funciona, copia y pega este enlace en tu navegador:<br />
								${resetPasswordUrl}
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
