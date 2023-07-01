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
      <body className={poppins.className}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
