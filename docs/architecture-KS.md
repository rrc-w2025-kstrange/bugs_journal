# Architecture: Bugs

The Bugs feature now uses two apps. The front-end (`apps/frontend`) shows the page. The back-end (`apps/backend`) checks the requests and saves the bugs in a database. Because of this, the bugs are still there when you close and open the app again.

How a request travels:

```
Front-end:  Bugs page -> useBugs hook -> bugService -> bugRepository (fetch)
                                                            |
                                                      sends a request
                                                            |
Back-end:   bugRoutes -> bugValidation -> bugController -> bugService -> bugRepository -> Prisma -> Database
```

The page only needs three routes (addresses):

| What the page does | Route |
|---|---|
| Show all bugs | `GET /api/bugs` |
| Add a bug | `POST /api/bugs` |
| Remove a bug | `DELETE /api/bugs/:id` |

---

# Front-end

## Hook: useBugs (apps/frontend/src/hooks/useBugs.ts)

**1. What does it do?**
It keeps the list of bugs for the Bugs page. It loads the bugs when the page opens. It gives the page `bugs`, `loading`, `error`, `addBug` and `removeBug`.

**2. How did I decide what to put in it?**
The hook only holds what the screen needs: the list, a loading flag and an error message. It does not check if a bug is good, and it does not touch the data. It only talks to the service.

**3. Where is it used?**
In `Bugs.tsx`. The page gives `addBug` to `AddBugForm` and `removeBug` to `BugList`.

## Service: bugService (apps/frontend/src/services/bugService.ts)

**1. What does it do?**
It holds the rules for bugs. The Bugs page uses `getBugs`, `addBug`, `removeBug`, `validateBugName`, `isValidCategory` and `buildNewBug`. It also has `adjustCount`, which changes the bug count.

**2. How did I decide what to put in it?**
Rules like "the name must have at least 3 letters" and "the category must be real" live here, not in the form. The service does not save data and does not show anything on screen. It asks the repository for data, and it throws an error if a rule is broken. These checks stop a bad request before it is sent. The back-end checks the same rules again, so the data stays safe even if a request does not come from this page.

**3. Where is it used?**
In `useBugs` (getBugs, addBug, removeBug) and in `Bugs.tsx` (adjustCount). Other pages use other methods of the same service.

## Repository: bugRepository (apps/frontend/src/repositories/bugRepository.ts)

**1. What does it do?**
It asks the back-end for the bugs using `fetch`. It has three methods: `getAll` (`GET /api/bugs`), `add` (`POST /api/bugs`) and `remove` (`DELETE /api/bugs/:id`). The back-end address comes from `VITE_API_BASE_URL` in the front-end `.env` file. It no longer keeps the bugs itself, so I deleted the old test data file `bugData.ts`.

**2. How did I decide what to put in it?**
It only sends requests and gives back the answers. It has no rules and no screen code. When I added the back-end, only this file had to change. The page, the hook and the service stayed the same. I removed `getById` and `update` because no page uses them and the back-end has no routes for them.

**3. Where is it used?**
Only by the front-end `bugService`, which is used by `useBugs`.

---

# Back-end

## Routes: bugRoutes (apps/backend/src/routes/bugRoutes.ts)

**1. What does it do?**
It connects each address to the code that answers it. It makes the three routes above. `app.ts` puts them under `/api/bugs`.

**2. How did I decide what to put in it?**
A route only decides where a request goes: which validation and which controller. It does not check or save anything itself. I made only the three routes the page really uses, so nothing extra is open on the back-end.

**3. Where is it used?**
In `app.ts`, where `app.use("/api/bugs", bugRoutes)` turns the routes on.

## Validation: bugValidation (apps/backend/src/validations/bugValidation.ts)

**1. What does it do?**
It checks each request before the controller sees it, using Zod. `validateBugBody` checks a new bug: the name needs at least 3 letters, the scientific name is optional, the category must be one of the six, and extra unknown fields are not allowed. `validateBugId` checks that the id in the address is a positive whole number. If a request is bad, the answer is `400` with the reason.

**2. How did I decide what to put in it?**
It only checks that the request looks right. It does not read or write the database. Keeping it in its own file keeps the controller simple, and every request that changes data gets checked the same way.

**3. Where is it used?**
In `bugRoutes`: `validateBugBody` on `POST /` and `validateBugId` on `DELETE /:id`. `GET /` sends no data, so there is nothing to check.

## Controller: bugController (apps/backend/src/controllers/bugController.ts)

**1. What does it do?**
It reads the request, asks the service for the data, and sends back the answer. `getAll` sends the list. `add` sends `201` and the new bug. `remove` sends `204` when it worked, or `404` if the bug does not exist.

**2. How did I decide what to put in it?**
The controller only handles the request and the answer. It does not check the data (validation did that) and it does not use the database (the service does that).

**3. Where is it used?**
In `bugRoutes`, one method for each route.

## Service: bugService (apps/backend/src/services/bugService.ts)

**1. What does it do?**
It sits between the controller and the repository. It has `getAll`, `add` and `remove`, and each one asks the repository.

**2. How did I decide what to put in it?**
Right now the validation and the database table already cover the bug rules, so the service just passes the request along. I kept it as its own layer so a new rule later (for example, no two bugs with the same name) has a clear place to go.

**3. Where is it used?**
Only by `bugController`.

## Repository: bugRepository (apps/backend/src/repositories/bugRepository.ts)

**1. What does it do?**
It is the only back-end file that talks to the database, using the Prisma client. `getAll` gets all bugs in order of id. `add` saves one new bug. `remove` deletes a bug by id and says if it was found. It also changes an empty scientific name (`null` in the database) to "left out", so it matches the `Bug` type.

**2. How did I decide what to put in it?**
It only reads and writes data. It has no rules and no request code. If the database changes, only this file has to change.

**3. Where is it used?**
Only by the back-end `bugService`.

## Database: Prisma model and migration (apps/backend/prisma)

**1. What does it do?**
`schema.prisma` describes the `Bug` table: `id` (made by the database), `name`, `scientificName` (optional) and `category`. The `create_bugs` migration builds that table in the database. `src/db/prisma.ts` makes the Prisma client one time and shares it with the repository.

**2. How did I decide what to put in it?**
The table is in Third Normal Form. Every column is only about that one bug, nothing is repeated, and no column depends on another normal column. `category` is just the bug's category name, so I did not need another table.

**3. Where is it used?**
The Prisma client is used by `bugRepository`. The database address comes from `DATABASE_URL` in `apps/backend/.env`, through `prisma.config.ts`.

---

# Other notes

- **CORS:** `app.ts` only accepts browser requests from the front-end address in `FRONTEND_URL`.
- **Bug count:** "Total Bugs Discovered" is still kept in `App.tsx` because other pages share it. It is not saved in the database, so it goes back to 0 after a refresh. Fixing this needs a team decision.
- **Seed file (optional):** `apps/backend/prisma/seedBugs.ts` adds the 10 test bugs to the database. Run it from `apps/backend` with `npx tsx prisma/seedBugs.ts`.