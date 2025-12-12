# Documentation for Script IDE

Work in progress...

## Getting started

Work in progress...

## Components

#### main.tsx

This is the main entry point for the app. It renders the app layout and provides the app context.

The app uses Chakra UI components for styling and layout, which has basic configurtions in the `@/themes/theme.ts` file.

We also initialize the Monaco editor settings here as well.

#### App.tsx

This is a mediator component that renders the apps main element. It sets the base styling and render out the `Router` component (which are not yet fully utilized).

#### AppContext.tsx

This is the app context provider. It provides the app context to all child components.

Right now it only initializes the MDS (MiniDapp System) API, but will later on be moved to a `service.js` file in the public folder.

May be removed in the future if no uses are found.

---

work in progress
