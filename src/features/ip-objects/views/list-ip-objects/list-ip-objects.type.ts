import { IpObject } from "@/src/common/entities/ip-object";

export interface ListIpObjectsProps {
    isLoading: boolean;
    ipObjects: IpObject[];
    onOpenCreateIpObjectDialog: () => void;
    onOpenEditIpObjectSheet: (id: string) => void
}