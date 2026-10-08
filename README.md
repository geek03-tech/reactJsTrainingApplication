# Employee Management Portal — Consistent 4-Day Applications

## What changed in this version

All four days now use the **same UI system and the same source structure**. Day 1 establishes the project architecture, reusable components and visual language; Day 2, Day 3 and Day 4 extend those exact files/concepts rather than starting a visually unrelated application.

### Day 1
- Data source: **dummy/local data only**
- CRUD: local React state
- React fundamentals, reusable components, hooks, controlled forms
- Same API/service folder exists for architectural continuity, but the ReqRes service is intentionally not used for employee data

### Day 2
- Data source: **ReqRes `https://jsonplaceholder.typicode.com/users`**
- CRUD: GET / POST / PUT / DELETE through `employeeService`
- Service layer, API client, loading/error states, details route and pagination-aware fetch

### Day 3
- Data source: **ReqRes**
- CRUD: same API service
- ReqRes login endpoint for authentication
- Role-aware UI, protected routes, English/Hindi i18n
- Same components and page layout as Day 1 and Day 2

### Day 4
- Data source: **ReqRes**
- CRUD: same API service
- Centralized reducer + Context state
- Memoized derived data
- Lazy-loaded Reports route + Suspense
- CI/CD workflow
- Same visual design and folder structure

## Consistent folder structure

Every day follows the same top-level shape:

```text
src/
├── app/
├── components/
│   ├── common/
│   ├── employee/
│   └── layout/
├── data/
├── hooks/
├── pages/
│   ├── Employees/
│   ├── Login/
│   └── Reports/
├── services/
├── store/
├── types/
├── test/
├── App.jsx
├── main.jsx
└── index.css
```

Some folders are intentionally unused on earlier days. This is deliberate: the learner sees the same architecture evolve instead of learning a completely new project layout every day.

## ReqRes configuration

Create a `.env` file inside **Day 2, Day 3 and Day 4**:

```env
VITE_REQRES_API_KEY=your_reqres_api_key_here
```

Current ReqRes documentation says `/api/*` requests require an `x-api-key` header. The supplied `employeeService` automatically adds this header when `VITE_REQRES_API_KEY` is configured.

## Important ReqRes CRUD behavior

The requested endpoint is the standard demo users endpoint:

```text
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

The frontend updates its own React state after successful POST/PUT/DELETE calls so the UI demonstrates a complete CRUD flow.

For a browser training application, do not hard-code a private/manage API key into source control. Use an environment variable and a public/client-safe key according to your ReqRes project setup.

## Run

For each day:

```bash
cd day-1
npm install
npm run dev
```

Tests:

```bash
npm test
```

Production build:

```bash
npm run build
```
