"use client"
import Homepage from "./Homepage"
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import useSWRSubscription from 'swr/subscription'
import { subscribeTodaySticky } from '@/utils/service';

export default async function IndexPage() {
    const session = await getServerSession(authOptions);
    const { email, name } = session?.user || {};
    const { data } = useSWRSubscription(['sticky', email], subscribeTodaySticky);
    console.log(data);
    return (
        <Homepage email={email} />
    )
}