# Identification Architecture

This document describes the architecture used for the bug-identification
submission feature. The feature separates user-interface state, business
rules, and data access so that the in-memory data source can later be replaced
with a back-end service.

## Architecture flow

```text
Identification.tsx
        |
        v
useSubmissions.ts
        |
        v
submissionService.ts
        |
        v
submissionRepository.ts
        |
        v
submissionData.ts
```

The identification page uses the custom hook. The hook calls the service, and
the service calls the repository. The page does not access the repository
directly.

## `useSubmissions`

### What it does

`useSubmissions` manages the identification submissions used by the
identification page. It provides:

- The current `submissions` list
- A `loading` state while submissions are being loaded
- An `error` message when a service operation fails
- `addSubmission` for creating a submission
- `removeSubmission` for deleting a submission

It loads the initial list through `submissionService.getSubmissions()`. After a
successful add or remove operation, it updates the local React state so the
page reflects the repository state.

### Why this logic belongs in the hook

The hook owns UI-related state and asynchronous React behavior. This includes
loading indicators, error messages, state updates, and preventing state
updates after the component has unmounted.

It does not validate submission fields or manipulate repository data directly.
Keeping those responsibilities out of the hook means the same service rules
can be used by another UI component later.

### Where it is used

`useSubmissions` is used by
[Identification.tsx](../src/components/pages/Identification.tsx). The page
uses the returned list to render submissions and the returned actions to
submit and remove identification records.

## `submissionService`

### What it does

`submissionService` provides the application operations for identification
submissions:

- `getSubmissions` retrieves all submissions
- `addSubmission` validates, normalizes, and creates a submission
- `removeSubmission` validates the ID and removes a submission

When a submission is added, the service:

- Requires a non-empty name
- Requires an identification unless the user requested identification help
- Trims the name and identification values
- Assigns the initial `"pending"` status
- Sends the finished input to the repository

The service throws an error when input is invalid or when a requested
submission cannot be removed.

### Why this logic belongs in the service

Validation, normalization, and the initial status are business rules rather
than data-storage concerns. Keeping them in the service ensures that all
callers receive the same behavior and that the repository remains a simple
data-access boundary.

The service also validates IDs and converts a failed repository removal into a
clear application error. It does not manage React state or render UI.

### Where it is used

`submissionService` is used by
[useSubmissions.ts](../src/hooks/useSubmissions.ts). The hook is the intended
application entry point for the service, so the identification page does not
need to know how submissions are stored.

## `submissionRepository`

### What it does

`submissionRepository` provides basic data-access operations for
`BugSubmission` records:

- `getAll` returns all submissions
- `getById` returns one submission or `null`
- `add` stores a submission and assigns its ID
- `remove` deletes a submission and reports whether anything was removed

The repository initializes its private in-memory list from
[submissionData.ts](../src/data/submissionData.ts). Repository reads and
returned records are copied so callers cannot directly mutate the repository's
internal array or objects.

### Why this logic belongs in the repository

The repository is the boundary around the data source. It owns storage,
retrieval, ID generation, and basic CRUD behavior, but it does not decide
whether a submission is valid or what status a new submission should have.

The initial test data gives the application a stable data shape while the
repository boundary leaves room to replace the in-memory implementation with
database calls in a later module.

### Where it is used

`submissionRepository` is used by
[submissionService.ts](../src/services/submissionService.ts). No component
calls the repository directly. This preserves the flow from the component
through the hook and service before reaching the data-access layer.

## Shared bug count

The shared `Total Bugs Discovered` counter uses the same three-layer pattern:

```text
Bug-counting component
        |
        v
useBugCount.ts
        |
        v
bugCountService.ts
        |
        v
bugCountRepository.ts
```

### `useBugCount`

`useBugCount` provides the current `bugCount`, `incrementBugCount`, and
`decrementBugCount` actions. It subscribes to the repository-level count so
multiple components see the same value without receiving count props from
`App.tsx`.

The hook owns the React subscription, while the service remains responsible
for changing the value. The repository's subscription notifications keep the
counter display synchronized after an add or remove action.

`useBugCount` is used by
[Bugs.tsx](../src/components/pages/Bugs.tsx),
[Collection.tsx](../src/components/pages/Collection.tsx), and
[Identification.tsx](../src/components/pages/Identification.tsx). The add and
remove controls use the same hook in
[AddBugForm.tsx](../src/components/common/add-bug-form/AddBugForm.tsx) and
[BugList.tsx](../src/components/common/bug-list/BugList.tsx).

### `bugCountService`

`bugCountService` exposes the application operations for the shared counter:
reading the count, incrementing it, and decrementing it. Decrementing is
clamped at zero so the existing counter behavior is preserved.

The service owns that counter rule rather than the components. Components do
not calculate a new count or call the repository directly; they request an
increment or decrement through the hook.

### `bugCountRepository`

`bugCountRepository` owns the shared in-memory count and provides `get`, `set`,
and `subscribe` operations. It is the data-access boundary for this shared
resource. It does not decide when the count should change or apply the
non-negative rule.

The repository is used by
[bugCountService.ts](../src/services/bugCountService.ts). `App.tsx` no longer
initializes or prop-drills the counter; the repository-level value is shared
by all mounted counter hooks across the routed pages.

## Supporting implementation

The shared `BugSubmission` type in
[bugSubmission.ts](../src/types/bugSubmission.ts) defines the shape of stored
submissions and the input used when creating them. The test data in
[submissionData.ts](../src/data/submissionData.ts) contains ten initial
records conforming to that type.
