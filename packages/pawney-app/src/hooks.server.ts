import type { Handle } from "@sveltejs/kit"
import { sequence } from "@sveltejs/kit/hooks";
import { stytchClient } from "$lib/server/stytch";

const validateSession: Handle = async ({ event, resolve }) => {
    const session_token = event.cookies.get('session_token');

    if(session_token) {
        try {
            const { user, session_token: new_session_token, session } = await stytchClient.sessions.authenticate({ 
                session_token,
                session_duration_minutes: 60 * 24 * 30 // 30 days
             });

            event.locals.user = { user_id: user.user_id, email: user.emails[0].email, session_id: session.session_id };

            // Update the cookie with a new session token.
            event.cookies.set('session_token', new_session_token, {
                path: '/',
                secure: true,
                httpOnly: true,
                sameSite: 'none',
                maxAge: 60 * 60 * 24 * 30,
            });
        } catch (error) {
            console.error(error);
            event.cookies.delete('session_token', {
                path: '/'
            });
        }
    }

    return resolve(event);
}

export const handle = sequence(validateSession);
