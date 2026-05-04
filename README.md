# WordPress DS Tracker

A component browser for tracking the status of WordPress design system components across `@wordpress/components`, `@wordpress/ui`, and `@wordpress/dataviews`.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Structure

```
src/
├── kanban-board.jsx        # Main component — all data and demos live here
├── main.jsx                # React entry point
├── design-tokens.css       # WPDS CSS custom properties
└── dataviews-overrides.css # DataViews layout overrides
```

## Tech stack

- [Vite](https://vitejs.dev/) + React
- [`@wordpress/admin-ui`](https://www.npmjs.com/package/@wordpress/admin-ui) — Page shell
- [`@wordpress/ui`](https://www.npmjs.com/package/@wordpress/ui) — Design System components
- [`@wordpress/components`](https://www.npmjs.com/package/@wordpress/components) — Classic component library
- [`@wordpress/dataviews`](https://www.npmjs.com/package/@wordpress/dataviews) — DataViews, DataForm, DataViewsPicker
