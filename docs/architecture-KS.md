# Architecture: Bugs

## Hook: useBugs (src/hooks/useBugs.ts)

**1. What does it do?**
It keeps the list of bugs in React state for the Bugs page. It loads the bugs
when the page opens and gives back `bugs`, `loading`, `error`, `addBug` and
`removeBug`.

**2. How did I decide what logic to include?**
The hook only holds what the screen needs: the list, a loading flag and an
error message. It doesn't check if a bug is valid or touch the data, because
those are business logic and data access. It only talks to the service.

**3. Where is it used?**
In `Bugs.tsx`, which passes `addBug` to `AddBugForm` and `removeBug` to
`BugList`.

## Service: bugService (src/services/bugService.ts)

**1. What does it do?**
It holds the rules for bugs. For the Bugs page it uses `getBugs`, `addBug`,
`removeBug`, `validateBugName`, `isValidCategory` and `buildNewBug`. It also
holds `adjustCount`, which the Bugs page uses for the count.

**2. How did I decide what logic to include?**
Rules like "the name must be at least 3 characters" and "the category must exist" are business logic, so they live here and not in the form. The service doesn't store data or show anything on screen. It asks the repository for data and throws an error when a rule is broken.

**3. Where is it used?**
In `useBugs` (getBugs, addBug, removeBug) and in `Bugs.tsx` (adjustCount). Other pages use other methods of the same service.

## Repository: bugRepository (src/repositories/bugRepository.ts)

**1. What does it do?**
It stores the bugs and has the basic CRUD methods: `getAll`, `getById`, `add`, `update` and `remove`. It starts from the test data in `src/data/bugData.ts`
(10 test bugs) and gives new bugs an ID.

**2. How did I decide what logic to include?**
It only reads and changes data. It has no rules and no screen code. When we have a back-end, only this file needs to change to call it.

**3. Where is it used?**
Only by `bugService`, which is called by `useBugs`.