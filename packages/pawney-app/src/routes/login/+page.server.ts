import type { Actions } from "./$types";
import { z } from "zod";
import { stytchClient } from "$lib/server/stytch";
import { redirect } from "@sveltejs/kit";

// A Zod validator that checks the shape of the incoming request.
// E-mail is required, and must be a valid e-mail address.

const LoginValidator = z.object({
    email: z.string().email(),
});

export const actions: Actions = {
    async default({ request }) {
        // Get form data.
        const data = await request.formData();
        const formaData: unknown = Object.fromEntries(data.entries());

        // Validate form data.
        const validated = LoginValidator.parse(formaData);

        // TODO: Check that the user is not already logged in by verifying the session token.

        // Send magic link via stytch.
        await stytchClient.magicLinks.email.loginOrCreate({
            email: validated.email,
            login_magic_link_url: "http://localhost:5173/authenticate",
        });

        throw redirect(301, "/login/sent");
    }
};
