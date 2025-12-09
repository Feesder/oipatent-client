import { UserRole } from "../../constants/user-role";

export interface UserResponse {
  id: string;
  role: UserRole;
  email: string;
  username: string
  firstname: string;
  lastname: string;
}
