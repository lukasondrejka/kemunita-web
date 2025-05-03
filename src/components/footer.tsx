"use client"

import { useLanguage } from "@/components/providers/language-provider";
import { formatDate } from "@/lib/utils";

interface FooterProps {
  updatedAt: string;
}

export function Footer({ updatedAt }: FooterProps) {
  const { t, language } = useLanguage();

  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between ">
          <div className="space-y-1 mb-1">
            <p className="text-sm text-muted-foreground">
              KEmunITa
            </p>
            {updatedAt && (
              <p className="text-sm text-muted-foreground">
                {t("Updated on")} {formatDate(updatedAt, language, { year: "numeric", month: "long", day: "numeric" })}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:items-end space-y-1">
            <a
              href="https://calendar.google.com/calendar/u/0/embed?src=35fcf776db47a319bd987cbf7073325f9fb9fb91b804a0589ffb6de4b8b39c11@group.calendar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {t("Google Calendar")}
            </a>
            <a
              href="https://www.facebook.com/groups/1478296816463043"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {t("Facebook Group")}
            </a>
            <a
              href="https://www.linkedin.com/search/results/all/?keywords=%23KEmunITa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {t("LinkedIn #KEmunITa")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
