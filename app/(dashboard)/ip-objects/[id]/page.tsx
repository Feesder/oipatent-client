import { AppSidebar } from "@/src/common/components/app-sidebar";
import { IpObjectConsole } from "@/src/features/ip-objects/views/ip-object-console/ip-object-console";

export default async function Page({ params }: {params: Promise<{id: string}>}) {
    const { id } = await params; 

    console.log(id)

    return <>
        <AppSidebar />
        <IpObjectConsole/>
    </>
}