"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const { t } = useLanguage();
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="border-b h-[72px]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">{t('app.name')}</h1>
        </div>
        {mounted && (
          <div className="flex items-center space-x-2">
            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant={language === "sk" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("sk")}
                className="rounded-none"
              >
                SK
              </Button>
              <Button
                variant={language === "en" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("en")}
                className="rounded-none"
              >
                EN
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
