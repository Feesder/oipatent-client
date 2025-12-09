"use client";

import { useRouter } from "next/navigation";
import Logo from "./logo";
import Navbar from "./navbar";
import { Button } from "./ui/button";
import { useAuthStore } from "@/src/features/auth/stores/auth-store";
import { Brain, SquareChevronRight } from "lucide-react";
import { routes } from "../constants/routes";

export default function Header() {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <header className="bg-neutral-950 text-white">
      <div className="mx-auto flex h-20 px-10 items-center justify-between px-4">
        <Logo />
        <Navbar />

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button
              onClick={() => {
                router.push(routes.ipObjects);
              }}
            >
              <SquareChevronRight />Консоль
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  router.push(routes.signIn);
                }}
                variant="outline"
              >
                Войти
              </Button>
              <Button
                onClick={() => {
                  router.push(routes.signUp);
                }}
              >
                Начать
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
