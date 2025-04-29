"use client";

import { useLanguage } from "./providers/language-provider";

interface MonthSeparatorProps {
  month: number;
  year: number;
}

export function MonthSeparator({ month, year }: MonthSeparatorProps) {
  const { language } = useLanguage();

  const monthName = new Date(year, month).toLocaleString(language, { month: "long" });

  return (
    <div className="flex items-center gap-4 my-6">
      <h3 className="text-lg font-medium first-letter:uppercase">
        {monthName} {year}
      </h3>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
