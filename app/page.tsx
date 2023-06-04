import { getTodaySticky } from "@/utils/service"
import Homepage from "./Homepage"
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function IndexPage() {
    const session = await getServerSession(authOptions);
    const { email } = session?.user || {};
    const initialData = await getTodaySticky({ email: email ?? null });
    return (
        <Homepage initialData={initialData} />
    )
}