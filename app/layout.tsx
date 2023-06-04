import { Inter } from "next/font/google";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Providers from "./Providers";
import './globals.css';
import { getServerSession } from "next-auth";
import SignInButton from "@/components/SignInButton";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DragoDo',
  description: 'Drag and Drop your To-Do-List!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`
      ${inter.className}
      transition-all duration-150
      dark-mode
      `}>
        <Providers>
          {session
            ? children
            : <main
              className="grid place-items-center h-screen w-screen"
            >
              <SignInButton />
            </main>
          }
        </Providers>
      </body>
    </html>
  )
}
