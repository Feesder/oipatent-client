"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/src/common/components/ui/breadcrumb";
import { Button } from "@/src/common/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/src/common/components/ui/select";
import {
  SidebarInset,
  SidebarTrigger,
} from "@/src/common/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

export const IpObjectConsole = () => {

  return (
    <div className="flex flex-col justify-between h-screen">
      <header className="flex h-14 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumb>
      </header>
    </div>
  );
};
