import { Roboto } from "next/font/google";

import logo_symbol from "../../../assets/logo/logo_symbol.png";
import Image from "next/image";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Login",
  description: "Login",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="flex">
          <aside className="w-[45%] bg-[#172554] rounded-r-[310px] relative shadow-[4px_1px_4px_0px_rgba(0,0,0,0.25)]">
            <Image
              src={logo_symbol}
              alt="logo"
              className="absolute top-[calc(50%-110px)] right-[-110px] rounded-full shadow-[4px_1px_4px_0px_rgba(0,0,0,0.25)]"
            />
          </aside>
          {children}
        </main>
      </body>
    </html>
  );
}
