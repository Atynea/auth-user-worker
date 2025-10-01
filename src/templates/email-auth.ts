export function templateEmailVerifyUser(first_name: string, url: string) {
	return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8" />
            <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; }
            h1 { color: #333333; }
            p { font-size: 16px; color: #555555; }
            .btn {
                display: inline-block;
                margin-top: 15px;
                padding: 10px 20px;
                background: rgb(86, 217, 176);
                color: #ffffff !important;
                text-decoration: none;
                border-radius: 5px;
            }
            </style>
        </head>
        <body>
            <div class="container">
            <h1>¡Hola! ${first_name.toUpperCase}, Te mandamos un saludo de parte del equipo de Atynea</h1>
            <p>Para confirmar tu registro en nuestra pagina web, da clic en el siguiente botón: 🚀.</p>
            <a href="${url}" class="btn">¡Confirmar!</a>
            </div>
        </body>
        </html>
    `;
}
