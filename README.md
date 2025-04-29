# KEmunITa Web

🌐 [kemunita.pages.dev](https://kemunita.pages.dev)

A web application for browsing KEmunITa events.

Built with [Next.js](https://nextjs.org/), styled with [Tailwind CSS](https://tailwindcss.com/), and deployed on [Cloudflare Pages](https://pages.cloudflare.com/).

## Development Setup

Follow these steps to set up the project locally:

1. Clone the Repository

    ```bash
    git clone https://github.com/lukasondrejka/kemunita-web.git
    cd kemunita-web
    ```

2. Install Dependencies

    ```bash
    npm install
    ```

3. Configure Environment Variables

    Create a `.env` file in the project root with the following content:

    ```env
    NEXT_PUBLIC_CALENDAR_API_URL=
    ```

    - `NEXT_PUBLIC_CALENDAR_API_URL`:  

        URL of the Calendar API endpoint providing event data from [KEmunITa API](https://github.com/lukasondrejka/kemunita-api). Alternatively, you can connect directly to a [Google Calendar API v3 `events.list`](https://developers.google.com/calendar/api/v3/reference/events/list) endpoint.


4. Start the Development Server

    ```bash
    npm run dev
    ```

The app will be available at: [http://localhost:3000](http://localhost:3000)

## Resources

- [Next.js](https://nextjs.org/docs)
- [React](https://reactjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
