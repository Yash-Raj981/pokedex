import React, { useState } from 'react';
import { TYPE_COLORS } from '../constants/pokemonTypes.js';

function PokemonCard({ pokemon }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const mainType = pokemon.types[0];
  const backgroundColor = TYPE_COLORS[mainType] || '#A8A77A';

  const outerStyle = {
    width: '100%',
    cursor: 'pointer',
  };

  const flipStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  };

  const sideBase = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backfaceVisibility: 'hidden',
    borderRadius: '12px',
    overflow: 'hidden',
    padding: '10px',
  };

  return (
    <div
      style={outerStyle}
      onClick={() => setIsFlipped((prev) => !prev)}
      role='button'
      aria-pressed={isFlipped}>
      <div
        className='card border-0 shadow-sm'
        style={{
          position: 'relative',
          width: '100%',
          height: '320px',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
        <div style={flipStyle}>
          {/* FRONT */}
          <div
            style={{
              ...sideBase,
              backgroundColor,
            }}
            className='d-flex flex-column justify-content-start align-items-center p-2'>
            {/* Image */}
            <div
              className='d-flex align-items-center justify-content-center mt-3'
              style={{
                backgroundColor: 'rgba(255,255,255,0.6)',
                borderRadius: '50%',
                width: '110px',
                height: '110px',
              }}>
              <img
                src={pokemon.imageUrl}
                alt={pokemon.name}
                style={{ width: '85px', height: '85px' }}
                onError={(e) => (e.target.src = pokemon.fallbackUrl)}
              />
            </div>

            {/* Number */}
            <span
              className='mt-2 px-2 py-1 rounded-pill small fw-bold'
              style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
              #{pokemon.formattedId}
            </span>

            {/* Name */}
            <p className='fw-bold mt-2 mb-1 text-center small'>{pokemon.name}</p>

            {/* Types */}
            <span className='small text-center'>
              {pokemon.types
                .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
                .join(', ')}
            </span>

            {/* Height + Weight */}
            <div className='d-flex justify-content-around mt-3 w-100 small'>
              <div className='text-center'>
                <div className='fw-bold'>{pokemon.height} m</div>
                <div className='text-muted'>Height</div>
              </div>
              <div className='text-center'>
                <div className='fw-bold'>{pokemon.weight} kg</div>
                <div className='text-muted'>Weight</div>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            style={{
              ...sideBase,
              transform: 'rotateY(180deg)',
              backgroundColor,
              padding: 0,
            }}
            className='d-flex flex-column'>
            {/* White translucent overlay for readability */}
            <div
              className='flex-grow-1 p-3'
              style={{
                backgroundColor: 'rgba(255,255,255,0.88)',
                overflowY: 'auto',
                borderRadius: '12px',
              }}>
              <p className='fw-semibold mb-2 small text-center'>Base Stats</p>

              {pokemon.stats
                .filter(
                  (s) => !['speed', 'special-attack', 'special-defense'].includes(s.name)
                )
                .map((stat) => (
                  <div key={stat.name} className='mb-2'>
                    <div className='d-flex justify-content-between small'>
                      <span className='text-capitalize'>{stat.name}</span>
                      <span className='fw-bold'>{stat.base}</span>
                    </div>

                    <div className='progress' style={{ height: '6px' }}>
                      <div
                        className='progress-bar bg-primary'
                        role='progressbar'
                        style={{ width: `${stat.base}%` }}
                      />
                    </div>
                  </div>
                ))}

              <p className='fw-semibold mt-3 mb-2 small text-center'>Advanced Stats</p>

              {pokemon.stats
                .filter((s) =>
                  ['speed', 'special-attack', 'special-defense'].includes(s.name)
                )
                .map((stat) => (
                  <div key={stat.name} className='mb-2'>
                    <div className='d-flex justify-content-between small'>
                      <span className='text-capitalize'>{stat.name}</span>
                      <span className='fw-bold'>{stat.base}</span>
                    </div>

                    <div className='progress' style={{ height: '6px' }}>
                      <div
                        className='progress-bar bg-warning'
                        role='progressbar'
                        style={{ width: `${stat.base}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
