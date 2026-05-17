# MindSpa — High-Level Design (HLD)

```mermaid
graph TB
    subgraph "Client Browser"
        subgraph "React 18 SPA (CRA + react-scripts)"
            ROUTER["React Router v6<br/>BrowserRouter<br/>━━━━━━━━━━<br/>29 Routes"]
            CTX1["ContentContext<br/>(blogs, reels, podcasts)"]
            CTX2["LMSContext<br/>(auth, courses, progress,<br/>enrollments, wishlist, cart)"]
            PAGES["Pages (14)<br/>Home / About / Contact / Services / Courses<br/>Dashboard / Profile / Login / Register<br/>Admin / AdminLMS / Gallery / etc."]
            COMPS["Reusable Components (36+)<br/>Header / Footer / Hero / Blog<br/>Team / Gallery / AppointmentForm<br/>LMS: Quiz / Notes / Discussion"]
            HOOKS["Custom Hooks<br/>useScrollReveal / useParallax<br/>useTilt / useRipple"]
            API["API Client (api.js)<br/>fetch + JWT Bearer<br/>(XHR for file uploads)"]

            ROUTER --> PAGES
            PAGES --> COMPS
            CTX1 --> PAGES
            CTX2 --> PAGES
            COMPS --> HOOKS
            PAGES --> API
            CTX1 --> API
            CTX2 --> API
        end
    end

    subgraph "Network"
        HTTP["📡 HTTP REST<br/>JSON + FormData<br/>(no WebSocket / GraphQL)"]
    end

    subgraph "Backend Server (Render)"
        subgraph "Express v4 — Node.js"
            MW["Middleware Stack<br/>cors / express.json<br/>JWT auth / adminOnly<br/>multer (uploads)<br/>error handler"]
            AUTH["Auth Routes<br/>POST /register<br/>POST /login<br/>GET  /me"]
            COURSE["Course Routes<br/>CRUD courses/modules/lessons<br/>quizzes, resources"]
            ENROLL["Enrollment Routes<br/>POST /enroll<br/>DELETE /unenroll<br/>GET /enrollments"]
            PROG["Progress Routes<br/>GET  /progress<br/>POST /toggle-complete"]
            BLOG["Blog Routes<br/>CRUD blogs<br/>via API (not localStorage)"]
            REVIEW["Review Routes<br/>GET /reviews<br/>POST /review"]
            ADMIN["Admin Routes<br/>GET /users<br/>DELETE /user<br/>GET /stats"]
            UPLOAD["Upload Routes<br/>POST /upload<br/>GET  /uploads<br/>DELETE /upload"]

            MW --> AUTH
            MW --> COURSE
            MW --> ENROLL
            MW --> PROG
            MW --> BLOG
            MW --> REVIEW
            MW --> ADMIN
            MW --> UPLOAD
        end
    end

    subgraph "Database"
        MYSQL[("MySQL (Hostinger)<br/>━━━━━━━━━━<br/>users<br/>instructors<br/>courses<br/>modules<br/>lessons<br/>quizzes / quiz_questions<br/>resources<br/>enrollments<br/>lesson_progress<br/>reviews<br/>certificates<br/>blogs")]
    end

    subgraph "Storage"
        LOCAL["Browser localStorage<br/>━━━━━━━━━━<br/>mindspa_lms_token (JWT)<br/>notes / bookmarks<br/>wishlist / cart<br/>discussions / quizAttempts<br/>streak<br/>mindspa_reels / mindspa_podcasts"]
        DISK["Server Disk<br/>uploads/"]
    end

    %% Data Flow
    API -->|"fetch('localhost:4000/api/*')"| HTTP
    HTTP -->|"JSON / FormData"| MW
    AUTH --> MYSQL
    COURSE --> MYSQL
    ENROLL --> MYSQL
    PROG --> MYSQL
    BLOG --> MYSQL
    REVIEW --> MYSQL
    ADMIN --> MYSQL
    UPLOAD --> DISK
    CTX2 -.->|persist| LOCAL
    CTX1 -.->|persist reels/podcasts| LOCAL
    API -.->|token| LOCAL

    %% Styling
    classDef client fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    classDef backend fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef db fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    classDef storage fill:#fce4ec,stroke:#c62828,stroke-width:2px

    class ROUTER,CTX1,CTX2,PAGES,COMPS,HOOKS,API,HTTP client
    class MW,AUTH,COURSE,ENROLL,PROG,BLOG,REVIEW,ADMIN,UPLOAD backend
    class MYSQL db
    class LOCAL,DISK storage
```

## Architecture Overview

### Frontend (React 18 SPA)
- **Build Tool**: Create React App (react-scripts 5)
- **Routing**: React Router DOM v6 with 29 routes
- **State Management**: React Context API (ContentContext + LMSContext) + localStorage
- **Styling**: Plain CSS with CSS custom properties (variables), no preprocessor
- **API Client**: Centralized `fetch()` wrapper with JWT Bearer auth in `src/utils/api.js`

### Backend (Express v4 REST API)
- **Runtime**: Node.js
- **Port**: 4000
- **Auth**: JWT (jsonwebtoken) + bcryptjs for password hashing
- **File Uploads**: multer → disk storage
- **Security**: CORS, JWT middleware (`auth`, `adminOnly`), role-based access

### Database (MySQL)
- **Host**: Hostinger remote MySQL (srv547.hstgr.io)
- **Client**: mysql2 (promise-based connection pool)
- **Schema**: 12 tables with auto-seeding on first run

### Data Flow
```
React Component → Context (state) → api.js (fetch) → HTTP → Express Route → MySQL
                                                         ↓
                                                   JWT Validation
                                                         ↓
                                                   Role Check (user/admin)
```
- **Auth flow**: Login → server issues JWT → stored in localStorage → sent as Bearer token on every request
- **Guest mode**: LMS allows browsing without login; soft-enroll stored in localStorage
- **No caching layer** — all reads go directly to MySQL via Express
- **No WebSocket** — all communication is request/response over HTTP

### Key Design Decisions
| Decision | Rationale |
|---|---|
| Monolithic Express server | Single deployable unit, simple ops |
| Context API (no Redux) | Small-to-medium app, avoids extra dependency |
| Plain CSS (no Tailwind/SASS) | Low complexity, custom design system |
| localStorage for ephemeral state | Offline-friendly, no server round-trips for wishlist/cart/notes |
| JWT (no sessions) | Stateless auth, works well with SPA |
| react-scripts (CRA) | Familiar build chain, zero-config |
