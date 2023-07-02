import "./globals.css";
import { Montserrat } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
const poppins = Montserrat({ weight: ["500", "700"], subsets: ["latin"] });

export const metadata = {
    title: "Tranquil",
    description: "A wellness app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement {
    return (
        <html lang="en" suppressHydrationWarning>
            <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⛲️</text></svg>" />

            <body className={poppins.className}>
                <Providers attribute="class" defaultTheme="system" enableSystem>
                    {children}
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
