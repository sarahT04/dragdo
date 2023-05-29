import { getServerSession } from "next-auth/next";
import { Inter } from "next/font/google";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Providers from "./Providers";
import { signIn } from "next-auth/react";
import './globals.css';

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
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`
      ${inter.className}
      transition-all duration-150
      bg-slate-300
      text-slate-800
      dark:text-slate-300
      dark:bg-slate-800
      `}>
        <Providers>
          {session
            ? children
            : <button onClick={() => signIn('google')}>
              Sign up or login
            </button>
          }
        </Providers>
      </body>
    </html>
  )
}
