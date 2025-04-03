// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			flash?: { type: 'success' | 'error'; message: string };
		}
		// interface PageState {}
		// interface Platform {}
		// interface Platform {}
		namespace Superforms {
			type Message = {
				type: 'error' | 'success' | 'warning';
				message: string;
			}
		}
	}
}

export { };
