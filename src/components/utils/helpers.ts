export const extractIdFromUrl = (url: string): number => {
  const parts = url.split('/').filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
};

export const formatPokemonNumber = (id: number): string => {
  return `#${String(id).padStart(4, '0')}`;
};

export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatStatName = (name: string): string => {
  const statNames: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Attack',
    'special-defense': 'Sp. Defense',
    speed: 'Speed',
  };
  return statNames[name] || capitalizeFirstLetter(name);
};

export const formatHeight = (height: number): string => {
  return `${(height / 10).toFixed(1)} m`;
};

export const formatWeight = (weight: number): string => {
  return `${(weight / 10).toFixed(1)} kg`;
};