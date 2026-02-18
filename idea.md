# FreelanceMarket — Multi-Role Project Bidding Platform



## Problem Statement
Clients need a reliable way to post short-term projects and hire skilled freelancers through a competitive bidding process. The core challenge is enforcing strict business rules: only one freelancer per project, preventing duplicate bids, managing project state transitions, and ensuring bid acceptance is atomic. A poorly designed backend leads to race conditions, unauthorized actions, and broken workflows.

## Scope
FreelanceMarket handles the full lifecycle of a freelance project:
1. **Client posts a project** with title, description, budget, and deadline.
2. **Freelancers browse and bid** on open projects with a proposal and amount.
3. **Client reviews bids and accepts one** — atomically assigning the freelancer.
4. **Freelancer submits work** — client marks project complete.
5. **Admin monitors** users and projects; can block bad actors.

Out of scope: payments, real-time chat, file uploads, ratings (can be added later).

## User Roles
| Role | Responsibility |
|---|---|
| **Client** | Post, edit, delete projects; review and accept bids; mark completion |
| **Freelancer** | Browse open projects; place/withdraw bids; submit work on assigned projects |
| **Admin** | View all users/projects; block users; resolve disputes |

## Key Features (Implementable)
- JWT-based authentication with role enforcement via middleware
- Project CRUD with ownership checks
- Bid placement with duplicate-bid prevention
- Transactional bid acceptance (project status + freelancer assignment in one atomic write)
- Project state machine: `OPEN → ASSIGNED → IN_PROGRESS → COMPLETED`
- Admin user management (block/unblock)
- Dispute creation and resolution

## Backend Architecture

### Layer Structure
```
HTTP Request
    │
    ▼
[Route + Auth Middleware]   ← JWT verify, role check
    │
    ▼
[Controller]                ← Parse req, call service, send res
    │
    ▼
[Service]                   ← Business logic, validations, orchestration
    │
    ▼
[Repository]                ← MongoDB queries via Mongoose (abstracted)
    │
    ▼
[MongoDB]
```

### Design Patterns Applied
| Pattern | Where Used | Why |
|---|---|---|
| **Repository** | All data access | Decouples business logic from Mongoose |
| **Factory** | `UserFactory.create(role, data)` | Creates correct User type at registration |
| **State** | `Project.transitionTo(status)` | Validates legal status transitions |
| **Strategy** | `BidRankingStrategy` | Sorts bids by price/date without changing service logic |
| **Middleware** | `authenticate`, `authorize(role)` | Reusable auth/role guards on routes |


## Tech Stack
- **Runtime**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (jsonwebtoken) + bcrypt
- **Frontend**: React (minimal — dashboard views only)

