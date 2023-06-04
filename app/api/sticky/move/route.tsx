import { NextResponse } from "next/server";

type reqType = {
    from: moveStickyProps;
    to: moveStickyProps;
};

export async function PATCH(request: Request) {
    const { from, to }: reqType = await request.json()
    try {
        const data = await getTodaySticky({ email });
        return NextResponse.json({ success: true, data, message: "Data retrieved" });
    } catch (e) {
        console.log(e)
        return NextResponse.json({ success: false, data: null, message: "Didn't get data" });
    }
}