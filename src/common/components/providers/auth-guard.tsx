"use client"

import { useAuthStore } from "@/src/features/auth/stores/auth-store"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const token = useAuthStore.getState().getToken()

    useEffect(() => {
        console.log(token)
        if (!token) {
            toast.error("Вы не автаризованы")
            router.replace("/")
        }
    }, [])

    return <>
        {children}
    </>
}