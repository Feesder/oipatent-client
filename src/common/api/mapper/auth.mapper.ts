import { Auth } from "../../entities/auth";
import { AuthResponse } from "../responses/auth.response";

export const mapAuthResponseToAuth = (authResponse: AuthResponse): Auth => {
    return {
        accessExpires: authResponse.access_expires,
        accessToken: authResponse.access_token,
        tokenType: authResponse.token_type
    }
}