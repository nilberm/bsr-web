import { Inter } from "next/font/google";
import Sidebar from "@/components/Siderbar";
import { BalanceVisibilityProvider } from "@/context/BalanceVisibilityContext";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home",
  description: "Maximize Your Time, Minimize Your Worries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <BalanceVisibilityProvider>
            <div className="flex w-full h-screen bg-slate-200 overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
          </BalanceVisibilityProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
