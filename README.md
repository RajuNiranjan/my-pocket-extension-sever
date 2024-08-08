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

# Contact Management App

This is a Contact Management Application built with ReactJS, TypeScript, and TailwindCSS, featuring a dashboard with a line graph and a map displaying COVID-19 case data. This application allows for robust contact management including adding, editing, and deleting contact details, alongside visual data presentations.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Contact Management**: Add, view, edit, and delete contacts.
- **Contacts List**: Display a list of all contacts.
- **Contact Details**: View details for each contact.
- **Dashboard**: Includes a line graph showing COVID-19 case fluctuations.
- **Map Visualization**: Map with markers showing country-specific COVID-19 data.

## Technologies Used

- ReactJS
- TypeScript
- TailwindCSS
- React Router v6
- React Query (TanstackQuery)
- Redux
- Chart.js
- React Leaflet
- Deployment: Vercel, GitHub Pages, Heroku

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
npm install # or yarn install
```
