"use client";

import { fetchIpObjects } from "@/src/common/api/requests/ip-objects/fetch-ip-objects";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ListIpObjects } from "../list-ip-objects/list-ip-objects";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/src/common/components/ui/breadcrumb";
import { CreateIpObjectDialog } from "../../components/create-ip-object-dailog/create-ip-object-dialog";
import { use, useState } from "react";
import { fetchIpObjectsByUserId } from "@/src/common/api/requests/ip-objects/fetch-ip-objects-by-user-id";
import { useAuthStore } from "@/src/features/auth/stores/auth-store";
import { EditIpObjectSheet } from "../../components/edit-ip-object-sheet/edit-ip-object-sheet";

export const IpObjectView = () => {
  const [isOpenCreateIpObjectDialog, setisOpenCreateIpObjectDialog] = useState(false);
  const [isOpenEditIpObjectSheet, setIsOpenEditIpObjectSheet] = useState(false);
  const [editIpObjectId, setEditIpObjectId] = useState<string | null>(null);

  const user = useAuthStore(state => state.user);

  const { data, isPending, refetch } = useQuery({
    enabled: Boolean(user?.id),
    queryKey: ["IpObjects"],
    queryFn: () => fetchIpObjectsByUserId(user?.id || ""),
  });

  const handleOpenEditIpObjectSheet = (id: string) => {
    setIsOpenEditIpObjectSheet(true);
    setEditIpObjectId(id)
  }

  const handleCloseEditIpObjectSheet = (needToRefetch: boolean) => {
    setIsOpenEditIpObjectSheet(false);
    if (needToRefetch) {
      refetch();
    }
  }

  const handleOpenCreateIpObjectDialog = () => {
    setisOpenCreateIpObjectDialog(true);
  }

  const handleCloseCreateIpObjectDialog = (needToRefetch: boolean) => {
    setisOpenCreateIpObjectDialog(false);
    if (needToRefetch) {
      refetch();
    }
  }

  return (
    <div className="w-full">
      <header className="flex h-14 items-center gap-2 border-b px-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumb>
      </header>
      <div className="w-full p-10">
        <ListIpObjects onOpenEditIpObjectSheet={handleOpenEditIpObjectSheet} onOpenCreateIpObjectDialog={handleOpenCreateIpObjectDialog}  isLoading={isPending} ipObjects={data || []} />
      </div>
      <CreateIpObjectDialog user={user} isOpen={isOpenCreateIpObjectDialog} onCloseChange={handleCloseCreateIpObjectDialog} />  
      <EditIpObjectSheet ipObejctId={editIpObjectId || ""} user={user} isOpen={isOpenEditIpObjectSheet} onCloseChange={handleCloseEditIpObjectSheet} />
    </div>
  );
};
