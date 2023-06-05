import { getTodaySticky } from "@/utils/service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email }: { email: string } = await request.json()
    try {
        const data = await getTodaySticky({ email });
        return NextResponse.json({ success: true, data, message: "Data retrieved" });
    } catch (e) {
        console.log(e)
        return NextResponse.json({ success: false, data: null, message: "Didn't get data" });
    }
}