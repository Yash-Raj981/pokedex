# React Pokédex – Fast, Responsive & Modern

A fully responsive Pokédex built with **React**, **Vite**, **Bootstrap**, and **PokéAPI**.  
Uses **progressive loading**, **infinite scroll**, **batch fetching**, and **error-proof data normalization**.

---

## 🚀 Features

### ✓ Progressive Loading  
First batch loads instantly. Others load as you scroll.

### ✓ Infinite Scroll (Race-Safe)  
`useRef()` prevents duplicate loads and batching overlap.

### ✓ Pokémon Data Normalization  
- Height → meters  
- Weight → kilograms  
- Capitalized names  
- Flattened stats  

### ✓ Guaranteed No Duplicate Pokémon  
Map-based deduplication ensures stable and unique results.

### ✓ Fallback Image Support  
If Pokémon.com sprite fails, app uses official-artwork sprite.

### ✓ Fully Responsive with Bootstrap  
Adaptive card resizing with clean layout.

---

## 📁 Project Structure

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

---

## 🛠 Installation

```
npm install
npm run dev
```

---

## 📌 Future Enhancements
- Search bar
- Filters (type, stat, region)
- Shiny toggle
- Virtualized list for 10,000+ items
- Local caching

---

## 📜 License
MIT License

