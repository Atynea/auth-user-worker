/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { WorkerEntrypoint } from 'cloudflare:workers';
import { handlerAuthUser } from './handlers/handler-auth-user';

export default class extends WorkerEntrypoint<Env> {
	async fetch(request: Request): Promise<Response> {
		return new Response('Hello Nicolas');
	}

	async generateAuthLink(email: string, tenant: string, first_name: string) {
		const { ok } = await handlerAuthUser(email, tenant, first_name, this.env, this.ctx);
		if (ok) {
			return true;
		} else {
			return false;
		}
	}
}
