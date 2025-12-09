import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/src/common/components/ui/card";
import { ListIpObjectsProps } from "./list-ip-objects.type";
import { Skeleton } from "@/src/common/components/ui/skeleton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/src/common/components/ui/empty";
import {
  CirclePlus,
  Ellipsis,
  EllipsisVertical,
  FolderCode,
  ListFilter,
  PlusCircle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Button } from "@/src/common/components/ui/button";
import { Badge } from "@/src/common/components/ui/badge";
import { formatDate } from "@/src/common/lib/format-date";
import { Spinner } from "@/src/common/components/ui/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/common/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { routes } from "@/src/common/constants/routes";
import { Input } from "@/src/common/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/common/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { IpObject } from "@/src/common/entities/ip-object";
import { set } from "zod/v4";
import Link from "next/link";

export const ListIpObjects = ({
  onOpenCreateIpObjectDialog,
  onOpenEditIpObjectSheet,
  ipObjects,
  isLoading,
}: ListIpObjectsProps) => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<
    "all" | "invention" | "utility_model" | "industrail_design"
  >("all");
  const [sort, setSort] = useState<"newest" | "oldest" | "title">("newest");

  const ipObjectsFiltered = useMemo(() => {
    let result = [...ipObjects];

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      result = result.filter((ipObject) =>
        ipObject.title.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== "all") {
      result = result.filter((ipObject) => ipObject.patentType === typeFilter);
    }

    result.sort((a, b) => {
      switch (sort) {
        case "newest":
          return (
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt || "").getTime() -
            new Date(b.createdAt || "").getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [ipObjects, search, typeFilter, sort]);

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {ipObjects.length > 0 ? (
        <>
          <div className="w-full flex gap-3 mb-4 items-center justify-between">
            <Input
              placeholder="Название патента"
              onChange={(event) => setSearch(event.target.value)}
            />
            <Select onValueChange={(value) => setTypeFilter(value as any)}>
              <SelectTrigger>
                <p className="font-medium">Тип патента</p>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Типы патента</SelectLabel>
                  <SelectItem value="all">все</SelectItem>
                  <SelectItem value="invention">Изобретение</SelectItem>
                  <SelectItem value="utility_model">Полезная модель</SelectItem>
                  <SelectItem value="industrail_design">
                    Промышленный дизайн
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSort(value as any)}>
              <SelectTrigger>
                <ListFilter />
                <p className="font-medium">Сортировка</p>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Сортировка</SelectLabel>
                  <SelectItem value="newest">Сначала новые</SelectItem>
                  <SelectItem value="oldest">Сначала старые</SelectItem>
                  <SelectItem value="title">По названию</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button onClick={onOpenCreateIpObjectDialog} variant={"outline"}>
              <PlusCircle />
              Создать патент
            </Button>
          </div>
          <div className="grid gap-3 grid-cols-4">
            {ipObjectsFiltered.map((ipObject) => (
              <Card key={ipObject.id}>
                <Link href={`${routes.ipObjectById(ipObject.id || "")}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>
                        {ipObject.title}
                        <Badge className="ml-2" variant={"outline"}>
                          {ipObject.patentType}
                        </Badge>
                      </CardTitle>
                      <CardAction>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size={"icon-sm"}
                              variant={"ghost"}
                              className="rounded-full"
                            >
                              <Ellipsis />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent onClick={(event) => event.stopPropagation()}>
                            <DropdownMenuItem
                              onClick={(event) => {
                                event.stopPropagation();
                                onOpenEditIpObjectSheet(ipObject.id || "")
                              }
                              }
                            >
                              <SquarePen />
                              Изменить
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={(event) => {
                                  event.stopPropagation();
                                }}
                            >
                              <Trash2 />
                              Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardAction>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <div>
                      <p className="text-md">{ipObject.description}</p>
                      <p className="text-sm text-muted-foreground">
                        Было обновлено: {formatDate(ipObject.updatedAt || "")}
                      </p>
                    </div>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <Empty className="flex w-full items-center justify-center">
          <EmptyHeader className="max-w-2xl">
            <EmptyMedia variant="icon">
              <FolderCode />
            </EmptyMedia>
            <EmptyTitle>Нет проекта</EmptyTitle>
            <EmptyDescription>
              Рекомендую создать ваш первый проект, чтобы активировать рабочее
              пространство и получить доступ ко всем возможностям платформы.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={onOpenCreateIpObjectDialog}>
              <CirclePlus /> Создать проект
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
};
