import { editPinned } from "@/utils/service";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    const { id }: { id: string } = await request.json()
    try {
        await editPinned(id, true);
        return NextResponse.json({ success: true, message: "Data pinned" });
    } catch (e) {
        console.log(e)
        return NextResponse.json({ success: false, message: "Error in firebase" });
    }
}