"use client"
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<SessionProvider>
			<ThemeProvider enableSystem={true} attribute="class">
				{children}
			</ThemeProvider>
		</SessionProvider>
	)
}

export default Providers