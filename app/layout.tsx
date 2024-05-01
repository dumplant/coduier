import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/providers/modal-provider";
import { CodeContextProvider } from "@/context/codeContext";
import Script from "next/script";
import { PageContextProvider } from "@/context/pageContext";
import { MessageContextProvider } from "@/context/messageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coduier",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ModalProvider />
          <PageContextProvider>
            <CodeContextProvider>
              <MessageContextProvider>{children}</MessageContextProvider>
            </CodeContextProvider>
          </PageContextProvider>
        </body>
        <Script src="https://unpkg.com/@babel/standalone/babel.min.js" />
      </html>
    </ClerkProvider>
  );
}
