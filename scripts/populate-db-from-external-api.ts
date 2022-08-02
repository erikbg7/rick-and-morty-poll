import axios from 'axios';
import prisma from '../src/server/prisma';

const API_URL = 'https://rickandmortyapi.com/graphql';

const PAGE_CHARACTERS_QUERY = `query {
    characters( page: $page) {
      info {
        next
      }
      results {
        id
        name
    	  image	
      }
    }
  }`;

const getCharactersByPage = async (page: number) => {
  const query = PAGE_CHARACTERS_QUERY.replace('$page', page.toString());
  const res = await axios.post(API_URL, { query });
  return res.data.data;
};

let characters: any[] = [];

const getCharacters = async (page: number) => {
  const data = await getCharactersByPage(page);

  const results = data.characters?.results;
  const nextPage = data.characters?.info?.next;

  characters = [...characters, ...results];

  if (nextPage) {
    await getCharacters(nextPage);
  }
};

const populateDbFromExternalApi = async () => {
  await getCharacters(1);

  const charactersToInsert = characters.map((c) => ({
    id: parseInt(c.id),
    name: c.name,
    imageUrl: c.image,
  }));

  const populationResult = await prisma.character.createMany({ data: charactersToInsert });
  console.log('Population result:', populationResult);
};

populateDbFromExternalApi();
