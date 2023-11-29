import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { stytchClient } from "$lib/server/stytch";
import { invalidateAll } from "$app/navigation";

export const load: PageServerLoad = async ({ locals, cookies }) => {
    if (locals.user) {
        try {
            await stytchClient.sessions.revoke({ 
                session_id: locals.user.session_id,
            });
        } catch (error) {
            console.error(error);
        }
    }

    cookies.delete('session_token', {
        path: '/'
    });

    throw redirect(302, '/');
}
