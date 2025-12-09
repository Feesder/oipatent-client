import { NonAuthGuard } from "@/src/common/components/providers/non-auth-guard";
import { SigninForm } from "@/src/features/auth/views/sign-in/signin-form";

export default function SignInPage() {
  return (
    <NonAuthGuard>
        <SigninForm />
    </NonAuthGuard>
  )
}