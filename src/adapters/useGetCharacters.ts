import {useEffect, useState} from 'react';
import {getInformation} from '../ports/RickAndMortyRepository';
import {Character} from '../ports/types';

export type ReturnType = {
  characters: Character[];
  loading: boolean;
  error: unknown;
  getCharacters: () => Promise<void>;
};

export const useGetCharacters: () => ReturnType = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    getCharacters();
  }, []);

  const getCharacters = async () => {
    setLoading(true);
    try {
      const response = await getInformation();
      setCharacters(response.results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    characters,
    loading,
    error,
    getCharacters,
  };
};
