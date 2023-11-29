import type { PageServerLoad } from './$types'; 
import { z } from 'zod';
import { stytchClient } from '$lib/server/stytch';
import { redirect } from '@sveltejs/kit';

// A validator for the URL paramter.
// 'stytch_token_type' must be 'magic_links'.
// 'token' must be a string.

const TokenValidator = z.object({
    stytch_token_type: z.literal('magic_links'),
    token: z.string(),
});


export const load: PageServerLoad = async ({ url, cookies }) => {
    // Build an object from the URL parameters.
    const params: unknown = Object.fromEntries(url.searchParams.entries());

    // Validate the URL parameters.
    const validated = TokenValidator.parse(params);

    // Validate the token against stytch.
    const { session_token } = await stytchClient.magicLinks.authenticate({
        token: validated.token,
        session_duration_minutes: 60 * 24 * 30,
    });

    // Store the session token in a secure cookie.
    cookies.set('session_token', session_token, {
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 60 * 60 * 24 * 30,
    });

    // Redirect to the home page.
    throw redirect(301, '/');
}
