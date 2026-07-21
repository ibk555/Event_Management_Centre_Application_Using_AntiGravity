# Event Center Booking System
A minimalist, web-based booking application for an event center built with **Next.js** and **Prisma (SQLite)**. This application enables customers to view real-time hourly availability and request time slots. An admin dashboard is included to securely manage and approve or decline pending bookings to prevent scheduling conflicts.
## Features
- **Customer Journey:**
  - View a card-based calendar displaying real-time availability of hourly time slots.
  - Submit booking requests by providing Name and Email.
  - Minimalist, mobile-first UI with responsive design.
- **Admin Dashboard:**
  - Secure, password-protected entry.
  - Real-time overview of all Confirmed, Pending, and Cancelled bookings.
  - One-click actions to instantly Approve or Decline (Cancel) booking requests.
## Tech Stack
- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Styling:** Vanilla CSS & CSS Modules (Custom Design System)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** SQLite (for local development/MVP)
## Getting Started
### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
### Installation
1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repository-url>
   cd Event_Registration_App
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Initialize the Database**:
   Set up the local SQLite database and generate the Prisma Client:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
### Usage
- **Customer Facing UI:** Open [http://localhost:3000](http://localhost:3000) in your browser to view the booking calendar.
- **Admin Dashboard:** Open [http://localhost:3000/admin](http://localhost:3000/admin). 
  - *Default Password:* `admin`
## Environment Variables
This project uses a `.env` file to manage environment variables. The following variables are currently used:
- `DATABASE_URL` (Defaults to `file:./dev.db`)
- `ADMIN_PASSWORD` (Defaults to `admin`)
## Future Enhancements
- Integrate Paystack payment gateway to require payment before confirmation.
- Swap SQLite with PostgreSQL for production deployments (e.g., Vercel Postgres).
- Integrate an email service (e.g., Resend or SendGrid) for sending automated confirmation emails.
