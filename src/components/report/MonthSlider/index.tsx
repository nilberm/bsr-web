"use client";

import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDrag } from "@use-gesture/react";

const MONTHS = generateMonths("2025-02", "2026-02");

function generateMonths(start: string, end: string) {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const months: string[] = [];

  let current = startDate;
  while (current.isBefore(endDate) || current.isSame(endDate, "month")) {
    months.push(current.format("MMMM"));
    current = current.add(1, "month");
  }

  return months;
}

export default function MonthSlider({
  onChange,
}: {
  onChange: (monthIndex: number) => void;
}) {
  const currentMonthIndex = MONTHS.findIndex(
    (m) => m === dayjs().format("MMMM")
  );

  const [selectedIndex, setSelectedIndex] = useState(
    currentMonthIndex !== -1 ? currentMonthIndex : 0
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Centraliza o mês selecionado
  useEffect(() => {
    onChange(selectedIndex);

    const selectedItem = itemRefs.current[selectedIndex];
    if (selectedItem) {
      selectedItem.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  // Hook para permitir drag com mouse e touch
  useDrag(
    ({ down, movement: [mx], memo }) => {
      const container = containerRef.current;
      if (!container) return;

      if (memo === undefined) {
        memo = container.scrollLeft;
      }

      if (down) {
        container.scrollLeft = memo - mx;
      }

      return memo;
    },
    {
      target: containerRef,
      eventOptions: { passive: false },
      pointer: { touch: true },
    }
  );

  return (
    <div className="flex items-center justify-between bg-zinc-50 px-4 py-2">
      <button
        onClick={() => setSelectedIndex((prev) => Math.max(prev - 1, 0))}
        className="text-zinc-600 hover:text-zinc-900"
      >
        <ChevronLeft size={24} strokeWidth={2.5} />
      </button>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar cursor-grab"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {MONTHS.map((month, index) => (
          <button
            key={month}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            onClick={() => setSelectedIndex(index)}
            className={clsx(
              "snap-center flex-shrink-0 text-base px-4 py-1 rounded-full transition",
              selectedIndex === index
                ? "bg-zinc-300 text-zinc-900 font-semibold"
                : "text-slate-600 hover:text-zinc-800"
            )}
          >
            {month}
          </button>
        ))}
      </div>

      <button
        onClick={() =>
          setSelectedIndex((prev) => Math.min(prev + 1, MONTHS.length - 1))
        }
        className="text-zinc-600 hover:text-zinc-900"
      >
        <ChevronRight size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
}
