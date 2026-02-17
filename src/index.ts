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
import handlerRegisterUserCall from './handlers/handler-register-user-call';
import { handlerRegiserApprovedApplicationCall } from './handlers/handler-register-approved-aplication-call';

export default class AuthUserWorker extends WorkerEntrypoint<Env> {
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

	async registerCallPostulant(email: string, tenant: string, display_name: string, call_id: string) {
		const response = await handlerRegisterUserCall(email, tenant, display_name, call_id, this.env, this.ctx);

		return {
			ok: response.ok,
			error: response.error || null,
		};
	}

	async registerApprovedAplicationCall(Supabase: string, email: string, tenant: string) {
		const {ok} = await handlerRegiserApprovedApplicationCall(Supabase, email, tenant, this.env, this.ctx);
		if(ok){
			return true;
		}else{
			return false;
		}
	}

	async registerRejectedAplicationCall(display_name: string, email: string, tenant: string) {
		const {ok} = await handlerRegiserApprovedApplicationCall(display_name, email, tenant, this.env, this.ctx);
		if(ok){
			return true;
		}else{
			return false;
		}
	}
}
