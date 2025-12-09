import { User } from "@/src/common/entities/user";

export interface EditIpObjectSheetProps {
    user: User | null,
    ipObejctId: string,
    isOpen: boolean;
    onCloseChange: (needToRefetch: boolean) => void;
}