import { Formance } from "@formance/formance-sdk";
import axios from "axios";
import { FORMANCE_CLIENT_ID, FORMANCE_CLIENT_SECRET, FORMANCE_URL } from "$env/static/private"

function createCredentialProvider(formance_stack_url: string, clientId: string, clientSecret: string, axiosInstance = axios.create()) {
    let access_token: string | null = null;
    let token_expiration_timestamps: number | null = null;

    return async function() {
        if (access_token && token_expiration_timestamps && token_expiration_timestamps > Date.now()) {
            console.log("Using cached access token");
            return access_token;
        }

        console.log("Refreshing access token");

        //Retrieve well-known configuration
        const { data: wellKnownConfig } = await axiosInstance.get(`${formance_stack_url}/api/auth/.well-known/openid-configuration`);

        //Retrieve the token endpoint
        const tokenEndpoint = wellKnownConfig.token_endpoint as string;

        const requestData = "grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret;

        const { data } = await axiosInstance.post(tokenEndpoint, requestData);

        access_token = data.access_token;
        token_expiration_timestamps = Date.now() + data.expires_in * 1000;

        return access_token;
    }
}

const formanceCredentialProvider = createCredentialProvider(
    FORMANCE_URL,
    FORMANCE_CLIENT_ID,
    FORMANCE_CLIENT_SECRET
);

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(async config => {
    config.headers["Authorization"] = `Bearer ${await formanceCredentialProvider()}`;
    return config;
});

export const formance = new Formance({
    defaultClient: axiosInstance,
    serverURL: FORMANCE_URL,
});
