# Architecture Document - Michael

### 1. bugRepository.ts
*   **What does it do?** It handles data access. It imports the test data array and provides methods to read, add, and delete bugs.
*   **How does it separate concerns?** It isolates database/API calls. The rest of the app doesn't know the data comes from a local file right now; later it will be swapped to a database.
*   **Where is it used?** It is imported by the `useBugs` hook to fetch the initial data.

### 2. bugService.ts
*   **What does it do?** It holds the business logic (validation, ID generation, building objects, calculating counts).
*   **How does it separate concerns?** It contains pure TypeScript rules. It doesn't care about React state or where the data is saved.
*   **Where is it used?** It is used in `AddBugForm.tsx`, `Collection.tsx`, and `Identification.tsx` to validate data and format objects before they are saved.

### 3. useBugs.ts (Hook)
*   **What does it do?** It handles presentation logic and state. It calls the repository on mount and stores the bugs in `useState`.
*   **How does it separate concerns?** It bridges React with the data. It doesn't handle UI rendering (components do that) and it doesn't handle data access (repository does that).
*   **Where is it used?** It is invoked inside the `Bugs` page component to provide the list of bugs.