import { Button } from "@/src/common/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/src/common/components/ui/dialog";
import { Input } from "@/src/common/components/ui/input";
import { Field, useForm } from "@tanstack/react-form";
import z from "zod/v4";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/common/components/ui/select";
import { CreateIpObjectDialogProps } from "./create-ip-object-dialog.types";
import { useMutation } from "@tanstack/react-query";
import { createIpObject } from "@/src/common/api/requests/ip-objects/create-ip-ojbect";
import { toast } from "sonner";
import { useAuthStore } from "../../../auth/stores/auth-store";
import { Textarea } from "@/src/common/components/ui/textarea";

const createIpObjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Название проекта должно состоять не менее 3 символов")
    .max(50, "Название проекта должно состоять не более 50 символов"),
  description: z
    .string()
    .trim()
    .min(3, "Описание проекта должно состоять не менее 3 символов")
    .max(1024, "Описание проекта должно состоять не более 1024 символов"),
  jurisdiction: z.string().trim(),
  patentType: z
    .string("Недопустимый формат")
    .trim()
    .min(1, "Требуется указать тип патента"),
});

export const CreateIpObjectDialog = ({
  user,
  isOpen,
  onCloseChange,
}: CreateIpObjectDialogProps) => {
  const ipObjectMutation = useMutation({
    mutationFn: (data: {
      user_id: string;
      title: string;
      patent_type: string;
      description: string;
      jurisdiction: string;
    }) => createIpObject(data),
    onSuccess: () => {
      onCloseChange(true);
      toast.success("Проект успешно создан!");
    },
    onError: () => {
      toast.error("Произошла ошибка при создании проекта");
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      jurisdiction: "kz",
      patentType: "",
    },
    onSubmit: ({ value }) => {
      const result = createIpObjectSchema.safeParse(value);
      if (!result.success) {
        toast.error(result.error.issues[0]?.message);
        return;
      }

      ipObjectMutation.mutate({
        title: value.title,
        description: value.description,
        jurisdiction: value.jurisdiction,
        patent_type: value.patentType,
        user_id: user?.id || "",
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={() => onCloseChange(false)}>
      <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle>Создать проект</DialogTitle>
            <DialogDescription>
              В этом диалоге вы сможете добавить новый проект и настроить его
              основные параметры.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <form.Field
              name="title"
              validators={{
                onChange: ({ value }) => {
                  const result =
                    createIpObjectSchema.shape.title.safeParse(value);

                  return result.success
                    ? null
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => (
                <div className="grid gap-2">
                  <label htmlFor={field.name}>Название</label>
                  <Input
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="TestProject"
                    type="text"
                    value={field.state.value}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <span className="text-sm text-red-500">
                      {field.state.meta.errors[0]}
                    </span>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field
              name="description"
              validators={{
                onChange: ({ value }) => {
                  const result =
                    createIpObjectSchema.shape.description.safeParse(value);

                  return result.success
                    ? null
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => (
                <div className="grid gap-2">
                  <label htmlFor={field.name}>Описание</label>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Description"
                    value={field.state.value}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <span className="text-sm text-red-500">
                      {field.state.meta.errors[0]}
                    </span>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field
              name="patentType"
              validators={{
                onChange: ({ value }) => {
                  const result =
                    createIpObjectSchema.shape.jurisdiction.safeParse(value);

                  return result.success
                    ? null
                    : result.error.issues[0]?.message;
                },
              }}
            >
              {(field) => (
                <div className="grid gap-2">
                  <label htmlFor={field.name}>Тип патента</label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                  >
                    <SelectTrigger
                      className="w-full"
                      name={field.name}
                      id={field.name}
                    >
                      <SelectValue placeholder="Выбрать тип патента" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Патенты</SelectLabel>
                        <SelectItem value="invention">Изобретение</SelectItem>
                        <SelectItem value="utility_model">
                          Полезная модель
                        </SelectItem>
                        <SelectItem value="industrail_design">
                          Промышленный дизайн
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <span className="text-sm text-red-500">
                      {field.state.meta.errors[0]}
                    </span>
                  )}
                </div>
              )}
            </form.Field>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button onClick={() => onCloseChange(false)} variant={"outline"}>
                Отмена
              </Button>
            </DialogClose>
            <Button isLoading={ipObjectMutation.isPending} type="submit">
              Создать
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
