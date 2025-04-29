"use client";

import { EventCard } from "@/components/event-card";
import { MonthSeparator } from "@/components/month-separator";
import { useLanguage } from "@/components/providers/language-provider";
import type { CalendarEvent } from "@/types/calendar-data";

interface ListViewProps {
  events: CalendarEvent[];
  startIndex: number;
  endIndex: number;
}

export function ListView({ events, startIndex, endIndex }: ListViewProps) {
  const { t } = useLanguage();
  const currentItems = events.slice(startIndex, endIndex + 1);

  let lastMonth = -1;
  let lastYear = -1;

  if (currentItems.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {t("No events")}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {currentItems.map((event, index) => {
        const eventDate = new Date(event.start.dateTime ?? event.start.date ?? "");
        const eventMonth = eventDate.getMonth();
        const eventYear = eventDate.getFullYear();

        const insertSeparator = eventMonth !== lastMonth || eventYear !== lastYear;
        lastMonth = eventMonth;
        lastYear = eventYear;

        return (
          <div key={"event-" + event.index} className="space-y-4">
            {insertSeparator && <MonthSeparator month={eventMonth} year={eventYear} />}
            <EventCard event={event} />
          </div>
        );
      })}
    </div>
  );
}
