import { useEffect, useRef, useCallback } from "react";

interface ModalProps {
  open: boolean;
  children?: React.ReactNode;
  onCancel: () => void;
  width?: string;
  className?: string; // nova prop adicionada
}

export default function Modal({
  open,
  onCancel,
  children,
  width,
  className,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onCancel();
      }
    },
    [onCancel]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, handleClickOutside]);

  return (
    <section
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center z-[9999] transition-opacity duration-500 ease-in-out ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={modalRef}
        className={`min-h-[20rem] bg-zinc-50 rounded-lg ${
          width ? width : "w-[70%]"
        } ${className ?? ""}`}
      >
        {children}
      </div>
    </section>
  );
}
