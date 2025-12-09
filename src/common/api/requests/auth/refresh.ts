import { Auth } from "@/src/common/entities/auth"
import { request } from "../../request"
import { User } from "@/src/common/entities/user";
import { mapUserResponseToUser } from "../../mapper/user.mapper";
import { mapAuthResponseToAuth } from "../../mapper/auth.mapper";
import { UserResponse } from "../../responses/user.response";
import { AuthResponse } from "../../responses/auth.response";
import axios from "axios";

export const refresh = async (): Promise<[User, Auth]> => {
    const response = await axios.get<{
        data: UserResponse,
        auth: AuthResponse
    }>("http://localhost:8080/auth/refresh", {withCredentials: true});

    return [mapUserResponseToUser(response.data.data), mapAuthResponseToAuth(response.data.auth)]
}