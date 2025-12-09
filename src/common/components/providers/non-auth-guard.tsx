"use client"

import { useAuthStore } from "@/src/features/auth/stores/auth-store"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const NonAuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const token = useAuthStore.getState().getToken()

    useEffect(() => {
        console.log(token)
        if (token) {
            toast.info("Вы уже автаризованы")
            router.replace("/")
        }
    }, [])

    return <>
        {children}
    </>
}