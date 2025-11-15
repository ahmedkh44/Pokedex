export interface Pokemon {
  name: string;
  url: string;
  id: number;
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  base_experience: number;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}