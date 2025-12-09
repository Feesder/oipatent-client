import { Auth } from "@/src/common/entities/auth"
import { request } from "../../request"
import { User } from "@/src/common/entities/user";
import { mapUserResponseToUser } from "../../mapper/user.mapper";
import { mapAuthResponseToAuth } from "../../mapper/auth.mapper";
import { UserResponse } from "../../responses/user.response";
import { AuthResponse } from "../../responses/auth.response";

export interface SignInBody {
    username: string,
    password: string,
}

export const signIn = async (payload: SignInBody): Promise<[User, Auth]> => {
    const response = await request.post<{
        data: UserResponse,
        auth: AuthResponse
    }>("/auth/sign-in", {
        username: payload.username,
        password: payload.password
    });

    return [mapUserResponseToUser(response.data.data), mapAuthResponseToAuth(response.data.auth)]
}