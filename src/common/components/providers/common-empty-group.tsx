"use client"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/src/common/components/ui/empty"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeftFromLine } from "lucide-react";

export function CommonEmptyGroup() {
  const router = useRouter();

  return (
    <Empty className="flex min-h-svh w-full items-center justify-center p-6">
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          Страницы, которую вы ищете, не существует.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant={"outline"} onClick={() => {
          router.replace("/")
        }}><ArrowLeftFromLine />Вернуться назад</Button>
      </EmptyContent>
    </Empty>
  )
}
