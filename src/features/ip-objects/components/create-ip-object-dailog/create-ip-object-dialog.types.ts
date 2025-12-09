import { User } from "@/src/common/entities/user";

export interface CreateIpObjectDialogProps {
    user: User | null,
    isOpen: boolean;
    onCloseChange: (needToRefetch: boolean) => void;
}