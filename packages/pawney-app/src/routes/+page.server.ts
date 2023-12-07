import type { PageServerLoad } from "./$types"
import { formance } from "$lib/server/formance";

export const load: PageServerLoad = async ({}) => {
    const info = await formance.ledger.getInfo();

    console.log(info);

    return {
        ledger: {
            server: info.configInfoResponse?.data.server,
            version: info.configInfoResponse?.data.version 
        }
    };
}
