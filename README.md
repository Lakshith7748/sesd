# Freelance Marketplace Platform

## Overview

The Freelance Marketplace Platform is a robust, full-stack application designed to seamlessly connect clients looking for specialized talent with capable freelancers. Engineered with modern enterprise patterns, the platform provides a comprehensive suite of tools for managing projects, placing and tracking bids, handling secure authenticated sessions, and an administrative dashboard to manage users and disputes.

## High-Level Architecture

The platform adopts a decoupled client-server architecture, allowing the API and user interface to scale independently.

- **Frontend:** Built with React 18 and Vite.
- **Backend:** Built with Node.js, Express, and TypeScript.
- **Database:** MongoDB as the primary data store using Mongoose ODM.

## Key Features

- **Role-Based Access Control:** Strict routing and authorization logic for isolated roles (Freelancer, Client, and Administrator).
- **Project Board & Bidding Engine:** Real-time visibility into open projects with a state-driven bidding flow allowing dynamic pricing and smart proposal management.
- **Enterprise-Grade Security:** Utilizes JSON Web Tokens (JWT) for secure authentication and bcrypt for irreversible password hashing.
- **Real-Time Analytics & Reporting:** Interactive dashboards granting every user archetype context-aware project health metrics and bid activity tracking.
- **Dispute & Moderation System:** Integrated workflows for Admins to view project statuses, manage users, and resolve ongoing disputes quickly.

## Technical Rationale (Why this stack?)

- **React + Vite (Frontend):** Selected for its unmatched developer experience, near-instant Hot Module Replacement (HMR), and predictable unidirectional data flow. This ensures a fast, highly reactive user interface.
- **Node.js + Express + TypeScript (Backend):** The event-driven, non-blocking I/O model of Node aligns perfectly with handling high volumes of concurrent requests (such as a busy bidding queue). TypeScript brings absolute compile-time predictability, enforcing domain boundaries and eliminating a wide class of runtime bugs.
- **MongoDB + Mongoose (Database):** A document-oriented NoSQL approach provides the extreme schema flexibility required when managing unpredictable metadata tied to diverse projects, bids, and user archetypes.

## Running the Application Locally

The application is split into two discrete workspaces: `frontend` and `backend`. You must run both concurrently to fully operate the platform.

### Prerequisites

- Node.js (version 18 or newer recommended).
- A running instance of MongoDB (update the `MONGO_URI` environment variable accordingly).

### 1. Starting the Backend Service

Open your terminal and navigate to the root directory, then execute:

```bash
cd backend
npm install
```

Configure your environment variables inside the `backend/.env` file:
```env
PORT=5050
MONGO_URI=mongodb://127.0.0.1:27017/freelancemarket
JWT_SECRET=your_super_secret_key
CORS_ORIGINS=http://127.0.0.1:5177
NODE_ENV=development
```

Start the backend development server:
```bash
npm run dev
```

### 2. Starting the Frontend Client

Open a new, separate terminal and navigate back to the root directory, then execute:

```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run via Vite on `http://127.0.0.1:5177` by default. It utilizes a proxy configuration to automatically direct local API calls to the backend on port 5050.
