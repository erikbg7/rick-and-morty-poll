const getCharacterById = async (id: string) => {
  const res = await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          character( id: ${id}) {
          name
          image
        }
      }`,
    }),
  });

  const data = await res.json();
  return data.data;
};

const getAllCharactersPagination = async (page: number) => {
  const res = await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          characters( page: ${page}) {
            results {
              name
    	        image	
            }
          }
        }`,
    }),
  });

  const data = await res.json();
  return data.data;
};

export { getCharacterById, getAllCharactersPagination };
