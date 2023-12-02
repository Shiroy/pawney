import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    // If the user is not logged in, redirect to the login page.
    if (!locals.user) {
        throw redirect(302, "/login");
    }
}
