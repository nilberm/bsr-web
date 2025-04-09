"use client";

import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDrag } from "@use-gesture/react";
import { useReportRange } from "@/hooks/Report/useReportRange";

type MonthItem = {
  label: string; // "April 2025"
  month: number; // 1-12
  year: number;
  key: string; // "2025-04"
};

function generateMonths(start: string, end: string): MonthItem[] {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const currentYear = dayjs().year();
  const months: MonthItem[] = [];

  let current = startDate;
  while (current.isBefore(endDate) || current.isSame(endDate, "month")) {
    months.push({
      label:
        current.year() === currentYear
          ? current.format("MMMM")
          : current.format("MMMM YYYY"),
      month: current.month() + 1,
      year: current.year(),
      key: current.format("YYYY-MM"),
    });
    current = current.add(1, "month");
  }

  return months;
}

export default function MonthSlider({
  onChange,
}: {
  onChange: (month: number, year: number) => void;
}) {
  const { data, isLoading } = useReportRange();
  const [months, setMonths] = useState<MonthItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (data?.start && data?.end) {
      const generated = generateMonths(data.start, data.end);
      setMonths(generated);

      const current = dayjs();
      const currentIndex = generated.findIndex(
        (m) => m.month === current.month() + 1 && m.year === current.year()
      );
      setSelectedIndex(currentIndex !== -1 ? currentIndex : 0);
    }
  }, [data]);

  useEffect(() => {
    if (months.length > 0) {
      onChange(months[selectedIndex].month, months[selectedIndex].year);

      const selectedItem = itemRefs.current[selectedIndex];
      if (selectedItem) {
        selectedItem.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [selectedIndex, months, onChange]);

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

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-4">Loading months...</div>
    );
  }

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
        {months.map((month, index) => (
          <button
            key={month.key}
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
            {month.label}
          </button>
        ))}
      </div>

      <button
        onClick={() =>
          setSelectedIndex((prev) => Math.min(prev + 1, months.length - 1))
        }
        className="text-zinc-600 hover:text-zinc-900"
      >
        <ChevronRight size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
}
