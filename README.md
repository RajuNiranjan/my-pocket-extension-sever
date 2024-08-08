<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
``` -->

Contact Management App with Charts and Maps

This is a contact management application built with ReactJS, TypeScript, TailwindCSS, React Router v6, and React Query (TanstackQuery). The application also includes a dashboard with a line graph and a map showing COVID-19 case data.
Table of Contents

    Features
    Technologies Used
    Getting Started
        Prerequisites
        Installation
        Running the App
    API Endpoints
    Usage
        Contacts Management
        Dashboard
    Deployment
    Contributing
    License

Features

    Add, view, edit, and delete contacts.
    Display a list of all contacts.
    View contact details.
    Dashboard with a line graph showing COVID-19 case fluctuations.
    Map with markers showing country-specific COVID-19 data.

Technologies Used

    ReactJS
    TypeScript
    TailwindCSS
    React Router v6
    React Query (TanstackQuery)
    Redux
    Chart.js
    React Leaflet
    Vercel/GitHub Pages/Heroku for deployment

Getting Started
Prerequisites

    Node.js (version 14 or higher)
    npm or yarn
