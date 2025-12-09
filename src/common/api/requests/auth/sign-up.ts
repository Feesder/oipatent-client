import { Auth } from "@/src/common/entities/auth"
import { request } from "../../request"
import { User } from "@/src/common/entities/user";
import { UserResponse } from "../../responses/user.response";
import { AuthResponse } from "../../responses/auth.response";
import { email } from "zod/v4";
import { mapUserResponseToUser } from "../../mapper/user.mapper";
import { mapAuthResponseToAuth } from "../../mapper/auth.mapper";

export interface SignUpBody {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
}

export const signUp = async (payload: SignUpBody): Promise<[User, Auth]> => {
    const response = await request.post<{
        data: UserResponse,
        auth: AuthResponse
    }>("/auth/sign-up", {
        username: payload.username,
        firstname: payload.firstname,
        lastname: payload.lastname,
        email: payload.email,
        password: payload.password
    });

    return [mapUserResponseToUser(response.data.data), mapAuthResponseToAuth(response.data.auth)]
}