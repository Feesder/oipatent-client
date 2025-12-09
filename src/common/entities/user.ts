import { UserRole } from "../constants/user-role";

export interface User {
  id: string;
  role: UserRole;
  email: string;
  username: string
  firstname: string;
  lastname: string;
  createdAt?: string | null;
  updatedAt?: string | null;
}
