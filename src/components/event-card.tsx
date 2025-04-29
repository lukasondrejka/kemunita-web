"use client";

import { useEffect, useRef, useState, useMemo, ReactElement } from "react";
import type { CalendarEvent } from "@/types/calendar-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useLanguage } from "./providers/language-provider";
import { formatDate, formatTime } from "@/lib/utils";

interface EventCardProps {
  event: CalendarEvent;
  expanded?: boolean;
}

export function EventCard({ event, expanded = false }: EventCardProps) {
  const { t, language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [isTruncated, setIsTruncated] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const startDate = event.start.dateTime ?? event.start.date ?? "";
  const endDate = event.end?.dateTime ?? "";


  useEffect(() => {
    if (descriptionRef.current) {
      setIsTruncated(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
    }
  }, [event.description]);

  const formatDescription = (text: string): ReactElement<any> => {
    if (!text) return <></>;
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: text
            .trim()
            .replace(/\n{2,}/g, "\n")
            .replace(/\n/g, "<br>")
            .replace(/^(<br>\s*)+/, "")
            .replace(/(<\/?(span|b|i|u|strong|em)[^>]*>)(\s*<br\s*\/?>)+/gi, "$1")
            .replace(/(<span[^>]*>[^<]*<\/span>)(\s*<br\s*\/?>)+/gi, "$1")
            .replace(/<a\s+(?![^>]*\btarget=["']_blank["'])/gi, '<a target="_blank" ')
        }}
      />
    );
  }

  const renderDateTime = () => {
    if (!startDate) return null;

    const startFormattedDate = formatDate(startDate, language);
    const startFormattedTime = formatTime(startDate, language);

    if (!endDate) {
      return (
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4 shrink-0" />
          <span>{startFormattedDate}</span>
        </div>
      );
    }

    const endFormattedDate = formatDate(endDate, language);
    const endFormattedTime = formatTime(endDate, language);

    if (startFormattedDate === endFormattedDate) {
      return (
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>{startFormattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 shrink-0" />
            <span>{startFormattedTime} - {endFormattedTime}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1">
        <Calendar className="h-4 w-4 shrink-0" />
        <span>{startFormattedDate} {startFormattedTime} - {endFormattedDate} {endFormattedTime}</span>
      </div>
    );
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="mb-2">{event.summary}</CardTitle>
        <CardDescription className="flex flex-col gap-2">
          {renderDateTime()}
          {event.location && (
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4 shrink-0" />
              <a href={`https://www.google.com/maps/search/?api=1&query=${event.location}`} target="_blank" rel="noopener noreferrer">
                {event.location}
              </a>
            </div>
          )}
        </CardDescription>
      </CardHeader>

      {event.description && (
        <CardContent>
          <div
            ref={descriptionRef}
            className={`prose dark:prose-invert max-w-none ${!isExpanded ? "line-clamp-3 overflow-hidden" : ""}`}
          >
            {formatDescription(event.description)}
          </div>
        </CardContent>
      )}

      {event.description && isTruncated && (
        <CardFooter>
          <Button variant="ghost" onClick={() => setIsExpanded(prev => !prev)}>
            {isExpanded ? t("Read Less") : t("Read More")}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
