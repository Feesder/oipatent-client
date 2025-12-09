import { AuthGuard } from "@/src/common/components/providers/auth-guard";
import { AppSidebar } from "@/src/common/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/src/common/components/ui/sidebar";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AuthGuard>
        <SidebarInset>
          {children}
        </SidebarInset>
      </AuthGuard>
    </SidebarProvider>
  );
}
