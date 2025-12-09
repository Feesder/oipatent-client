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
import { toast } from "sonner";
import { signIn, SignInBody } from "@/src/common/api/requests/auth/sign-in";
import Link from "next/link";
import { useAuthStore } from "../../stores/auth-store";
import { useRouter } from "next/navigation";
import { routes } from "@/src/common/constants/routes";

const signUpSchema = z.object({
  username: z
    .string("Недопустимый формат")
    .trim()
    .min(3, "Имя пользователя не может состоять из 3 букв")
    .max(255, "Длина имени пользователя должна составлять не более 255 символов"),
  password: z
    .string()
    .min(8, "Пароль должен содержать не менее 8 символов")
    .regex(/[A-Z]/, "Пароль должен содержать как минимум 1 заглавную букву")
    .regex(/[0-9]/, "Пароль должен содержать как минимум 1 цифру")
    .refine((val) => !val.includes(" "), "Пароль не должен содержать пробелов"),
});

export function SigninForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const signInMutation = useMutation({
    mutationFn: (data: SignInBody) => signIn(data),
    onSuccess: (data) => {
      const [user, auth] = data
      useAuthStore.getState().setAuth(auth, user)
      toast.success("Вы вошли в систему!");
      router.push(routes.home)
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      const result = signUpSchema.safeParse(value);
      if (!result.success) {
        toast.error(result.error.issues[0]?.message);
        return;
      }

      signInMutation.mutate({
        username: value.username,
        password: value.password,
      });
    },
  });

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card {...props}>
          <CardHeader>
            <CardTitle>Войдите в свою учетную запись</CardTitle>
            <CardDescription>
              Введите свои данные, чтобы войти в аккаунт
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
                          isLoading={signInMutation.isPending}
                          disabled={!canSubmit || isSubmitting}
                        >
                          Продолжить
                        </Button>
                      )}
                    </form.Subscribe>
                    <FieldDescription className="px-6 text-center">
                      У вас по-прежнему нет учетной записи? <br /> <Link href="/sign-up">Создайте его, чтобы начать работу</Link>
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
