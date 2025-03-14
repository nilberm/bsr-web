import Sidebar from "@/components/Siderbar";
import { Inter } from "next/font/google";

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
        <div className="flex w-full min-h-screen bg-slate-200">
          <Sidebar /> {children}
        </div>
      </body>
    </html>
  );
}
