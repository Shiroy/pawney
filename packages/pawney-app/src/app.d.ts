// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { UserInfo } from "$lib/shared/user";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: UserInfo;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
