import { NonAuthGuard } from "@/src/common/components/providers/non-auth-guard"
import { SignupForm } from "@/src/features/auth/views/sign-up/signup-form"

export default function SignUpPage() {
  return (
    <NonAuthGuard>
      <SignupForm />
    </NonAuthGuard>
  )
}