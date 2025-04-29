"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ListView } from "./list-view";
import { useLanguage } from "@/components/providers/language-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CalendarData, CalendarEvent } from "@/types/calendar-data";

interface EventsContainerProps {
  calendarData: CalendarData;
  itemsPerPage: number;
}

export function EventsContainer({ calendarData, itemsPerPage }: EventsContainerProps) {
  const { t } = useLanguage();
  const topRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [futureIndex, setFutureIndex] = useState(0);

  const calculateFutureIndex = useCallback((events: CalendarEvent[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return events.findIndex(event => new Date(event.start.dateTime ?? event.start.date ?? '') >= today) || events.length;
  }, []);

  useEffect(() => {
    const loadedEvents = calendarData.items;
    const safeFutureIndex = calculateFutureIndex(loadedEvents);

    setEvents(loadedEvents);
    setFutureIndex(safeFutureIndex);

    const fullPagesBefore = safeFutureIndex > 0 ? Math.floor((safeFutureIndex - 1) / itemsPerPage) + 1 : 0;
    setCurrentPage(fullPagesBefore);

    setLoading(false);
  }, [calendarData, calculateFutureIndex, itemsPerPage]);

  useEffect(() => {
    if (!loading && topRef.current) {
      const headerTop = topRef.current.getBoundingClientRect().top + window.scrollY;
      if (headerTop < window.scrollY - 32) {
        topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [currentPage, loading]);

  const paginationData = useMemo(() => {
    const firstPageSize = futureIndex % itemsPerPage || (futureIndex === 0 ? 0 : itemsPerPage);
    const fullPagesBefore = futureIndex > 0 ? Math.floor((futureIndex - 1) / itemsPerPage) + 1 : 0;
    const totalPages = (firstPageSize > 0 ? 1 : 0) + fullPagesBefore + Math.ceil((events.length - futureIndex) / itemsPerPage);

    const getStartIndex = () => {
      if (firstPageSize === 0) return currentPage * itemsPerPage;
      if (currentPage === 0) return 0;
      if (currentPage <= fullPagesBefore) return firstPageSize + (currentPage - 1) * itemsPerPage;
      return futureIndex + (currentPage - fullPagesBefore - 1) * itemsPerPage;
    };

    const start = getStartIndex();
    const size = (currentPage === 0 && firstPageSize !== 0)
      ? firstPageSize
      : Math.min(itemsPerPage, events.length - start);

    const paginated = events.slice(start, start + size);
    const canGoNext = start + paginated.length < events.length;

    return { paginated, canGoNext, totalPages };
  }, [currentPage, events, futureIndex, itemsPerPage]);

  const handlePreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 0));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, paginationData.totalPages - 1));

  return (
    <div ref={topRef} className="container mx-auto px-4 py-8">
      <div className="flex flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold">{t("Events")}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handlePreviousPage} disabled={currentPage === 0}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextPage} disabled={!paginationData.canGoNext}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="mt-8 space-y-4">
          <div className="flex flex-col gap-4 my-6">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-medium">
                <Skeleton className="h-6 w-32" />
              </h3>
              <div className="flex-1 h-px bg-border" />
            </div>
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-[120px] w-full" />
            ))}
          </div>
        </div>
      ) : (
        <>
          <ListView events={paginationData.paginated} startIndex={0} endIndex={paginationData.paginated.length - 1} />
          <div className="flex gap-2 justify-center mt-8">
            <Button variant="outline" className="w-32" onClick={handlePreviousPage} disabled={currentPage === 0}>
              {t("Previous")}
            </Button>
            <Button variant="outline" className="w-32" onClick={handleNextPage} disabled={!paginationData.canGoNext}>
              {t("Next")}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
