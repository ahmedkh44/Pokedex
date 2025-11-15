# 🎯 Pokémon Browser

A modern, responsive Pokémon browser built with React and TypeScript, featuring pagination and infinite scroll views.

## ✨ Features

- 📱 Fully responsive design
- 📄 Pagination view with page controls
- ♾️ Infinite scroll view with automatic loading
- 🔍 Detailed Pokémon information pages
- ⚡ Fast and optimized performance
- 🎨 Beautiful UI matching reference designs
- 💪 TypeScript for type safety
- 🔄 React Query for data fetching and caching

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ahmedkh44/Pokedex
cd pokemon-browser
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:your url`

## 📦 Build for Production
```bash
npm run build
```

The build output will be in the `dist` folder.

## 🌐 Deployment

### Deploy to Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
