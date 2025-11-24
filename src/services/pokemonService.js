const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const OFFICIAL_IMAGE = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';
const FALLBACK_IMAGE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const formatId = (id) => id.toString().padStart(3, '0');

const buildImageUrl = (id) => `${OFFICIAL_IMAGE}${formatId(id)}.png`;
const buildFallbackImageUrl = (id) => `${FALLBACK_IMAGE}${id}.png`;

// Normalizer
const normalizePokemon = (data) => {
  const id = data.id;

  return Object.freeze({
    id,
    formattedId: formatId(id),
    name: capitalize(data.name),
    types: data.types.map((t) => t.type.name),
    height: data.height / 10, // meters
    weight: data.weight / 10, // kg
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      base: s.base_stat,
    })),
    abilities: data.abilities.map((a) => capitalize(a.ability.name)),
    imageUrl: buildImageUrl(id),
    fallbackUrl: buildFallbackImageUrl(id),
  });
};

const safeFetchPokemon = async (id) => {
  try {
    const res = await fetch(`${POKEMON_API_URL}${id}`);
    if (!res.ok) throw new Error('404');
    return await res.json();
  } catch {
    return null;
  }
};

export const fetchPokemonBatch = async (start, end) => {
  const requests = [];
  for (let i = start; i <= end; i++) {
    requests.push(safeFetchPokemon(i));
  }

  const results = await Promise.all(requests);
  return results.filter(Boolean).map(normalizePokemon);
};
