import { getTodaySticky } from "@/utils/service"
import Homepage from "./Homepage"

export default async function IndexPage() {
    const initialData = await getTodaySticky();
    return (
        <Homepage initialData={initialData} />
    )
}