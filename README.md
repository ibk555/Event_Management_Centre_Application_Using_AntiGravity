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
