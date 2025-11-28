# React Pokédex

A fast and responsive Pokédex application built with **React**, **Vite**, **Bootstrap**, and the public **PokéAPI**.  
The project focuses on clean structure, efficient data loading, and a smooth browsing experience across all devices.

## Features

- Progressive loading of Pokémon data  
- Infinite scroll with safe batching and race-condition prevention  
- Data normalization for consistent units and naming  
- Automatic fallback images when primary sprites are unavailable  
- Deduplication to avoid repeated Pokémon entries  
- Responsive layout using Bootstrap grid and utilities  

## Technology Stack

- **React** (Vite + JSX)
- **Bootstrap** for layout and styling  
- **PokéAPI** for real-time Pokémon data  
- **JavaScript (ES Modules)**

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173/
```

## Project Structure

```
src/
  components/
    Pokedex.jsx
    PokemonCard.jsx
  services/
    pokemonService.js
  constants/
    pokemonTypes.js
  utils/
    (...)
```

This structure keeps components, service calls, and constants organized for easy maintenance and scalability.

## Build for Production

```bash
npm run build
```

The optimized output will be located in the `dist` directory.

## Future Enhancements

- Search functionality  
- Filters by type, stats, or region  
- Shiny Pokémon toggle  
- Virtualized list for large datasets  
- Local caching for faster reloads  

## License

This project is open for personal and educational use.  
Feel free to modify and adapt it as needed.
