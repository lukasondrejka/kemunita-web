import { Header } from "@/components/header"
import { EventsContainer } from "@/components/events-container"
import { Footer } from "@/components/footer"
import { CalendarData } from "@/types/calendar-data";

export const runtime = 'edge';
export const dynamic = 'force-dynamic'; 

async function fetchCalendarData(): Promise<CalendarData> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CALENDAR_API_URL}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch calendar data");
    }

    const calendarData: CalendarData = await response.json();

    calendarData.items = calendarData.items.map((item, index) => {
      return { ...item, index };
    });

    return calendarData;
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    // @ts-ignore
    return { items: [] } as CalendarData;
  }
}

export default async function Page() {
  const itemsPerPage = 10;
  const calendarData = await fetchCalendarData();

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-grow">
        <EventsContainer calendarData={calendarData} itemsPerPage={itemsPerPage} />
      </div>
      <Footer updatedAt={calendarData.updated} />
    </main>
  );
}
