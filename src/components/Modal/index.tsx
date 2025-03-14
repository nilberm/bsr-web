/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  children?: React.ReactNode;
  onCancel: () => void;
  width?: string;
}
export default function Modal({ open, onCancel, children, width }: ModalProps) {
  const handleClickOutsideModalContent = (e: MouseEvent) => {
    if ((e.target as HTMLElement).id === "background") {
      onCancel();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleClickOutsideModalContent);
    }
    return () => {
      document.removeEventListener("click", handleClickOutsideModalContent);
    };
  }, [open]);

  return (
    <section
      id="background"
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center z-[9999] transition-opacity duration-500 ease-in-out ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        id="content"
        className={`min-h-[20rem] bg-zinc-50 rounded-lg ${
          width ? width : "w-[70%]"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
