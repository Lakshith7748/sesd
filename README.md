# Freelance Marketplace Platform

## About the Project
This is a straightforward platform designed to connect clients with freelancers. Clients can post projects with descriptions and budgets, and freelancers can place bids on those open projects. 

The main goal of the system is to provide a clean, secure environment where both parties can manage their work. It includes role-based dashboards, secure authentication, and a built-in workflow for admins to handle any disputes.

## How it Helps Clients and Freelancers
Finding the right match is the core focus of the platform:
- **For Clients:** When a project is posted, the back-end utilizes a Bid Ranking system. This ensures that the bids clients receive are sorted by relevance and quality. Clients don't have to sift through spam; they see the best matches up front.
- **For Freelancers:** Freelancers get a clear view of open projects and can submit structured proposals. Because bids are ranked smartly, high-quality freelancers with strong proposals are prioritized and get noticed faster by the clients.

## Clean Architecture and Design Principles
The backend is built with Object-Oriented Programming (OOP) and SOLID design principles to keep the code maintainable and easy to extend:

- **Single Responsibility Principle (SRP):** The codebase strictly separates concerns. Controllers handle web requests, Services hold business logic, and Repositories manage database interactions.
- **Dependency Inversion Principle (DIP):** The services rely on abstract Interfaces (like `IProjectRepository`) instead of concrete database implementations. This makes it easy to switch out the database layer without rewriting business logic.
- **Open/Closed Principle (OCP) via Strategy Pattern:** We use a Strategy pattern for features like sorting and ranking bids (`BidRankingStrategy`). If we ever want to change how bids are ranked, we only have to add a new strategy rather than modifying existing, working code.

## Tech Stack
- **Frontend:** React, Vite, React Router, Axios
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB, Mongoose

## How to Run the Code
You will need two separate terminal windows to run both the backend and frontend at the same time.

### 1. Run the Backend
Open a terminal in the root folder and run:
```bash
cd backend
npm install
```

Make sure your `backend/.env` file is set up with variables like `PORT`, `MONGO_URI`, and `JWT_SECRET`. Then start the server:
```bash
npm run dev
```

### 2. Run the Frontend
Open a second terminal in the root folder and run:
```bash
cd frontend
npm install
```

Start the frontend application:
```bash
npm run dev
```

The frontend will run locally on port 5177 and will securely communicate with the backend API on port 5050.
