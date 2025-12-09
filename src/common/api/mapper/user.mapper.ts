import { User } from "../../entities/user";
import { UserResponse } from "../responses/user.response";

export const mapUserResponseToUser = (userResponse: UserResponse): User => {
    return {
        id: userResponse.id,
        email: userResponse.email,
        role: userResponse.role,
        username: userResponse.username,
        firstname: userResponse.firstname,
        lastname: userResponse.lastname
    }
}