# Bugs Journal

## Team Name
KyMiZa

## Team Members
* Kyra Strange
* Zachary Stewart
* Michael Docentes

## Project Description
This project is a bugs journal where users can explore different bugs and keep track of what they find. It focuses on three main parts: finding bugs, collecting them, and identifying what species they are.

The goal is to make it easier to document and understand bugs in a simple and organized way.

## User Stories

### Kyra
* As a user, I want to see a list of bugs grouped by category, so I can learn what kinds of cool bugs exist.
* As a user, I want to add a new bug with its name, scientific name and category, so I can build up my journal with the bugs I find.
* As a user, I want to remove a bug from the list, so my journal stays accurate.

### Michael
* As a user, I want to be able to add a new bug to my collection so that I can keep track of my collection.
* As a user, I want to be able to remove a bug off my collection so my lists stays as accurate as possible.
* As a user, I want to be to be able to see the total number of bugs automatically update so that it always show how many bugs is in my collection.

### Zak
* As a user, I want to submit information about a bug I found so that I can create a bug identification submission.
* As a user, I want to upload a photo and enter what kind of bug I think I found so that my submission contains useful identification information.
* As a user who does not know what kind of bug I found, I want to request identification help so that I can submit the bug without providing my own identification.

## Completed Work

### Sprint 1

#### Kyra
* Built the home view with a list of bugs, grouped by type (Moths, Ants, Butterflies and more). Each bug shows its scientific name.
* Added a search box and a simple Bug data format.
* Set up the colours and fonts from `STYLEGUIDE.md`, these were files provided by Zach through our team chat.
* Put the app online with Vercel, wrote the project description and initial user stories in this README.

#### Michael
* Built the Collection page. It shows each collected bug with its name, scientific name, order, habitat and date collected.
* Showed the total number of bugs collected.

#### Zak
* Built the Identification page as a guide to identifying bugs. It lists features to look for, like colour and wing shape, with a short description of each.

### Sprint 2

#### Kyra
* Set up page navigation with React Router. The app now has four pages: Home, Bugs, Collection and Identification.
* Built a shared layout with a nav bar and a footer. The nav bar looks the same on every page and shows which page you are on.
* Made a Home page, so Home and Bugs are now two different pages.
* Built the Bugs page with an "Add a Bug" form that checks the input, and a list where you can add and remove bugs. The list is split into small parts: `AddBugForm`, `BugList` and `BugItem`.
* Moved the shared data into `App.tsx`. Helped connect the "Total Bugs Discovered" counter so that all three pages show it and change accordingly. It stays correct when you switch pages.
* Moved the files into the same folders as Module 2 demo (`pages/` and `common/`).
* Helped combine the three team branches into `develop`, fixed the merge problems, and put the result online with Vercel.

#### Michael
* Added an "Add a New Bug" form to the Collection page. It checks that the common name and order are filled in.
* Added a Delete button to each bug. The list updates right away when you add or delete a bug.

#### Zak
* Built a bug submission form on the Identification page. It has a name, a photo upload, a guess of the bug type, and a checkbox to ask for help identifying it.
* Added a preview that updates as you type.
  
