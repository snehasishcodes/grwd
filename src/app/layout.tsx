import SessionProvider from "@/providers/session";
import { ThemeProvider } from "@/providers/theme";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

export const metadata: Metadata = {
	title: "grwd",
	description: "",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
				<SessionProvider>
					<ThemeProvider>
						{children}
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
