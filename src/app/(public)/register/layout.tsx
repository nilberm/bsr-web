"use client";

import { Roboto } from "next/font/google";
import registerImage from "../../../assets/register/photo-register.png";
import registerSuccessImage from "../../../assets/register/photo-register-sucess.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Register",
//   description: "Register",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="flex">
          <aside className="w-[45%] bg-[#172554] rounded-r-[310px] relative shadow-[4px_1px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center">
            <Image
              src={
                pathname === "/register/finished"
                  ? registerSuccessImage
                  : registerImage
              }
              alt="register"
              className="w-72"
            />
          </aside>
          {children}
        </main>
      </body>
    </html>
  );
}
