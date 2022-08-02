import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { trpc } from '@/utils/trpc';
import { getCharactersIds } from '@/utils/characters';

const versusStyle = {
  color: '#3EE8E2',
  textShadow:
    '2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff',
};

const Home: NextPage = () => {
  const [characterIds, setCharacterIds] = useState<string[]>(getCharactersIds);
  const [firstId, secondId] = characterIds;

  const voteMutation = trpc.useMutation('send-vote');

  const handleCharacterVoting = (id: string) => {
    id === firstId
      ? voteMutation.mutate({ voteFor: firstId, voteAgainst: secondId })
      : voteMutation.mutate({ voteFor: secondId, voteAgainst: firstId });
    setCharacterIds(getCharactersIds);
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <h1 className="text-5xl text-center mb-5">Which character is your favorite?</h1>
          <div className="flex justify-center max-w-2xl mt-4 p-6">
            <div className="w-60 h-60">
              {firstId && <CharacterCard id={firstId} onClick={handleCharacterVoting} />}
            </div>
            <div className="mx-4 my-auto">
              <span className="font-rick text-5xl" style={versusStyle}>
                VS
              </span>
            </div>
            <div className="w-60 h-60">
              {secondId && <CharacterCard id={secondId} onClick={handleCharacterVoting} />}
            </div>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

type CharacterCardProps = { id: string; onClick(id: string): void };

const CharacterCard: React.FC<CharacterCardProps> = ({ id, onClick }) => {
  const { data, isLoading } = trpc.useQuery(['get-character-by-id', { id }]);
  
  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-40 h-40 border-2 rounded-md overflow-hidden cursor-pointer"
        onClick={() => onClick(id)}
      >
        <Image
          alt={data.character.name}
          src={data.character.image}
          layout="fill"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjQwMCIgaGVpZ2h0PSIxNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMzMzIiBvZmZzZXQ9IjIwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzIyMiIgb2Zmc2V0PSI1MCUiIC8+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMzMzMiIG9mZnNldD0iNzAlIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiMzMzMiIC8+CiAgPHJlY3QgaWQ9InIiIHdpZHRoPSI0MDAiIGhlaWdodD0iMTQwIiBmaWxsPSJ1cmwoI2cpIiAvPgogIDxhbmltYXRlIHhsaW5rOmhyZWY9IiNyIiBhdHRyaWJ1dGVOYW1lPSJ4IiBmcm9tPSItNDAwIiB0bz0iNDAwIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgIC8+Cjwvc3ZnPg=="
        />
      </div>
      <h2 className="text-xl text-center mt-3">{data.character.name}</h2>
    </div>
  );
};

export default Home;
