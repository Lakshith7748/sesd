# FreelanceMarket - Backend-First Bidding Platform

## Problem Statement
The gig economy requires robust platforms where clients can post requirements and freelancers can bid for work. Existing solutions are often UI-heavy but lack strict transactional integrity or clean backend separation. "FreelanceMarket" aims to solve this by providing a highly scalable, secure, and architecturally strict backend system for managing project lifecycles, role-based workflows, and concurrent bidding processes.

## Scope
The system facilitates the entire workflow of a short-term project:
1.  **Project Creation**: Clients define requirements and budget.
2.  **Bidding Phase**: Freelancers submit proposals.
3.  **Contract Formation**: secure transaction where a bid is accepted.
4.  **Delivery**: Work submission and project closure.

## Key Features
*   **Role-Based Access Control (RBAC)**: Strict separation between Client, Freelancer, and Admin capabilities.
*   **Transactional Bidding**: Prevents race conditions (e.g., accepting two bids simultaneously) using DB transactions.
*   **Project State Machine**: Enforces valid transitions (OPEN -> ASSIGNED -> IN_PROGRESS -> COMPLETED -> CLOSED).
*   **Dispute Resolution**: Admin-mediated flows for halted projects.
*   **Bid Management**: Logic to prevent duplicate bids and ensure only qualified freelancers can bid.

## User Roles
1.  **Client**: Posts projects, reviews bids, hires freelancers, marks completion.
2.  **Freelancer**: Browses open projects, places bids, submits work.
3.  **Admin**: Global oversight, user banning, dispute arbitration.

## Backend Architecture Overview
The application follows a **Clean Architecture** approach using the **MERN** stack. Complexity is pushed to the domain and service layers, keeping controllers thin.

### Layers
1.  **Interface Adapters (Controllers)**: Handle HTTP requests, input validation, and DTO conversion.
2.  **Application Business Rules (Services)**: Orchestrate use cases (e.g., `PlaceBid`, `AcceptOffer`).
3.  **Enterprise Business Rules (Entities/Models)**: Core logic and data structures.
4.  **Frameworks & Drivers (Repositories/DB)**: Database implementations (Mongoose) hidden behind repository interfaces.

### Tech Stack
*   **Node.js & Express**: API Runtime.
*   **MongoDB**: Data persistence (with Mongoose).
*   **React**: Minimal frontend for demonstration.

## Design Patterns Used
*   **Repository Pattern**: Mandatory for all data access to decouple business logic from Mongoose.
*   **Factory Pattern**: Used in the `UserFactory` to instantiate the correct User subclass (Client vs. Freelancer) during registration based on the role payload.
*   **State Pattern**: The `Project` entity uses a state pattern logic to validate transitions (e.g., ensuring a project cannot go from `OPEN` to `COMPLETED` without `ASSIGNED`).
*   **Strategy Pattern**: Potential use for `BidRankingStrategy` (e.g., by price, by rating, or by time) to sort bids for the client.

