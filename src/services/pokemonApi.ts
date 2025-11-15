import type { PokemonDetail, PokemonListResponse } from "../types";

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (
  limit: number,
  offset: number
): Promise<PokemonListResponse> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon list');
  }
  return response.json();
};

export const fetchPokemonDetail = async (id: number): Promise<PokemonDetail> => {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon details');
  }
  return response.json();
};