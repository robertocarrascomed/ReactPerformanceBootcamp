import {CharacterInformation} from './types';

export const getInformation: () => Promise<CharacterInformation> = async () => {
  try {
    const response = await fetch(
      'https://rickandmortyapi.com/api/character/?page=2',
    );
    return response.json();
  } catch (error) {
    return error;
  }
};
