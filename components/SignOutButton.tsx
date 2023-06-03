import { enterPressed } from "@/utils/utils"
import { signOut } from "next-auth/react"

export default function SignOutButton() {
    return (
        <p
            className="hover:opacity-80 rounded-md transition-colors mt-0"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent) => enterPressed(e) ? signOut() : undefined}
            onClick={() => signOut()}
        >
            Sign out
        </p>
    )
}
