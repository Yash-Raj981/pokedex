import React from 'react';
import Pokedex from './components/Pokedex.jsx';

const appBackgroundStyle = {
  background: 'linear-gradient(90deg, #d4d3dd, #efefbb)',
};

function App() {
  return (
    <div style={appBackgroundStyle} className='min-vh-100 d-flex justify-content-center'>
      <div className='container py-4'>
        <h1 className='display-4 text-center mb-4'>Pokedex</h1>
        <Pokedex />
      </div>
    </div>
  );
}

export default App;
