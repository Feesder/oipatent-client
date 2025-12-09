"use client";

import { Button } from "@/src/common/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/common/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/src/common/components/ui/field";
import { Input } from "@/src/common/components/ui/input";
import { useForm } from "@tanstack/react-form";
import z from "zod/v4";
import { SignUpBody, signUp } from "@/src/common/api/requests/auth/sign-up";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "../../stores/auth-store";
import { routes } from "@/src/common/constants/routes";

const signUpSchema = z.object({
  username: z
    .string("Недопустимый формат")
    .trim()
    .min(3, "Имя пользователя не может состоять из 3 букв")
    .max(255, "Длина имени пользователя должна составлять не более 255 символов"),
  email: z
    .email("Неверный адрес электронной почты")
    .trim()
    .min(1, "Требуется электронная почта")
    .max(255, "Длина электронного письма должна составлять не более 255 символов"),
  firstname: z
    .string()
    .trim()
    .min(1, "Требуется указать имя")
    .max(255, "Длина имени должна составлять не более 255 символов"),
  lastname: z
    .string()
    .trim()
    .min(1, "Требуется указать фамилию")
    .max(255, "Длина фамилии должна составлять не более 255 символов"),
  password: z
    .string()
    .min(8, "Пароль должен содержать не менее 8 символов")
    .regex(/[A-Z]/, "Пароль должен содержать как минимум 1 заглавную букву")
    .regex(/[0-9]/, "Пароль должен содержать как минимум 1 цифру")
    .refine((val) => !val.includes(" "), "Пароль не должен содержать пробелов"),
  confirm_password: z.string().min(8, "Пароль должен содержать не менее 8 символов"),
});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const authStore = useAuthStore();

  const signUpMutation = useMutation({
    mutationFn: (data: SignUpBody) => signUp(data),
    onSuccess: (data) => {
      const [user, auth] = data
      useAuthStore.getState().setAuth(auth, user)
      toast.success("Учетная запись успешно создана!");
      router.push(routes.home)
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm({
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: ({ value }) => {
      const result = signUpSchema.safeParse(value);
      if (!result.success) {
        toast.error(result.error.issues[0]?.message);
        return;
      }

      signUpMutation.mutate({
        username: value.username,
        email: value.email,
        firstname: value.firstname,
        lastname: value.lastname,
        password: value.password,
      });
    },
  });

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card {...props}>
          <CardHeader>
            <CardTitle>Создать учетную запись</CardTitle>
            <CardDescription>
              Введите свои данные ниже, чтобы создать учетную запись
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                form.handleSubmit();
              }}
              className="w-full"
            >
              <FieldGroup>
                <form.Field
                  name="username"
                  validators={{
                    onChange: ({ value }) => {
                      const result =
                        signUpSchema.shape.username.safeParse(value);

                      return result.success
                        ? null
                        : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="grid gap-2">
                      <label htmlFor={field.name}>Имя пользователя</label>
                      <Input
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="MyUsername"
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
                  name="firstname"
                  validators={{
                    onChange: ({ value }) => {
                      const result =
                        signUpSchema.shape.firstname.safeParse(value);

                      return result.success
                        ? null
                        : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="grid gap-2">
                      <label htmlFor={field.name}>Имя</label>
                      <Input
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="John"
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
                  name="lastname"
                  validators={{
                    onChange: ({ value }) => {
                      const result =
                        signUpSchema.shape.lastname.safeParse(value);

                      return result.success
                        ? null
                        : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="grid gap-2">
                      <label htmlFor={field.name}>Фамилия</label>
                      <Input
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="Smith"
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
                  name="email"
                  validators={{
                    onChange: ({ value }) => {
                      const result = signUpSchema.shape.email.safeParse(value);

                      return result.success
                        ? null
                        : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="grid gap-2">
                      <label htmlFor={field.name}>Электронная почта</label>
                      <Input
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="myemail@example.com"
                        type="email"
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
                  name="password"
                  validators={{
                    onChange: ({ value }) => {
                      const result =
                        signUpSchema.shape.password.safeParse(value);

                      return result.success
                        ? null
                        : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="grid gap-2">
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium"
                      >
                        Пароль
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(event) => {
                          const valueWithoutSpaces = event.target.value.replace(
                            /\s/gu,
                            ""
                          );
                          field.handleChange(valueWithoutSpaces);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === " ") {
                            event.preventDefault();
                          }
                        }}
                        type="password"
                        placeholder="Password"
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
                  name="confirm_password"
                  validators={{
                    onChangeListenTo: ["password"],
                    onChange: ({ value, fieldApi }) => {
                      const password = fieldApi.form.getFieldValue("password");

                      if (!value) return "Пожалуйста, подтвердите свой пароль";

                      if (value !== password) return "Пароли не совпадают";

                      return null;
                    },
                  }}
                >
                  {(field) => (
                    <div className="grid gap-2">
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium"
                      >
                        Подтвердите пароль
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        type="password"
                        placeholder="Confirm password"
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
                <FieldGroup>
                  <Field>
                    <form.Subscribe
                      selector={(state) => [
                        state.canSubmit,
                        state.isSubmitting,
                      ]}
                    >
                      {([canSubmit, isSubmitting]) => (
                        <Button
                          type="submit"
                          isLoading={signUpMutation.isPending}
                          disabled={!canSubmit || isSubmitting}
                        >
                          Создать аккаунт
                        </Button>
                      )}
                    </form.Subscribe>
                    <FieldDescription className="px-6 text-center">
                      У вас уже есть учетная запись? <Link href="/sign-in">Войти</Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
