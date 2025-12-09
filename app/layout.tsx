import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/src/common/components/providers/theme-provider";
import { QueryProvider } from "@/src/common/components/providers/query-provider";
import { Toaster } from "@/src/common/components/ui/sonner";

export const metadata: Metadata = {
  title: "Review Management System",
  description:
    "Manage and respond to customer reviews across multiple platforms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
