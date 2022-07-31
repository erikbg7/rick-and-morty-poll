const MAX_CHARACTER_ID = 826;

const getRandomCharacter = (blacklistedId?: string): string => {
  const characterId = Math.floor(Math.random() * MAX_CHARACTER_ID).toString();
  if (blacklistedId === characterId) {
    return getRandomCharacter(blacklistedId);
  }
  return characterId;
};

const getCharactersIds = (): string[] => {
  const firstId = getRandomCharacter();
  const secondId = getRandomCharacter(firstId);

  return [firstId, secondId];
};

export { getRandomCharacter, getCharactersIds };
