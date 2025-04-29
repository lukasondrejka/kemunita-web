import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Language } from "@/lib/translations";

export type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}

export function formatDate(dateString: string, language: Language): string {
  return new Date(dateString).toLocaleDateString(getLocale(language), {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(dateString: string, language: Language): string {
  return new Date(dateString).toLocaleTimeString(getLocale(language), {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getLocale(language: Language): string {
  return language === "sk" ? "sk-SK" : "en-US";
}
