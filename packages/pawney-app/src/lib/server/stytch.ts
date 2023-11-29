import { Client } from 'stytch';
import { STYTCH_PROJECT_ID, STYTCH_SECRET } from "$env/static/private"

export const stytchClient = new Client({
  project_id: STYTCH_PROJECT_ID,
  secret: STYTCH_SECRET,
});
