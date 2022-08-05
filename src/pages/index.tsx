import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { trpc } from '@/utils/trpc';
import { getCharactersIds } from '@/utils/characters';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const fontStyle = {
  color: '#3ee2e8',
  textShadow:
    '1px 0 #000, -1px 0 #000, 0 1px #000, 0 -1px #000,1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000, ' +
    '3px 0 4px #66b366, -3px 0 4px #66b366, 0 3px 4px #66b366, 0 -3px 4px #66b366, 2px 2px 4px #66b366, -2px -2px 4px #66b366, 2px -2px 4px #66b366, -2px 2px 4px #66b366',
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
    <>
      <Head>
        <title>Rick and Morty Poll</title>
      </Head>
      <nav className="absolute right-0 left-0 px-3 py-2 bg-gray-800">
        <div className="flex justify-between items-center mx-auto md:w-[85%] lg:w-[70%]">
          <div className="flex items-center">
            <div className="relative my-1 mx-4 w-8 h-8 ">
              <Image alt="logo" sizes="50vw" src="/pickle-rick.png" layout="fill" />
            </div>
            <Link href="/results">
              <a className="text-2xl hover:text-gray-400">Results</a>
            </Link>
          </div>
          <div className="flex items-center">
            <span className="text-sm">by Erik Blanca</span>
            <a
              className="ml-4"
              title="Link to LinkedIn profile"
              href="https://www.linkedin.com/in/erik-blanca-gomez-32455a162/"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              className="ml-4"
              title="Link to GitHub profile"
              href="https://www.github.com/erikbg7"
            >
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      </nav>

      <main>
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <div className="font-rick text-4xl sm:text-7xl" style={fontStyle}>
            Rick <span className="font-rick text-2xl sm:text-4xl">And</span> Morty
          </div>
          <h1 className="text-2xl sm:text-5xl text-center p-5">
            Which is your favorite character?
          </h1>
          <div className="flex flex-col sm:flex-row justify-center max-w-2xl p-6">
            <div className="w-60 h-40 sm:h-60">
              {firstId && <CharacterCard id={firstId} onClick={handleCharacterVoting} />}
            </div>
            <div className="hidden sm:visible mx-4 my-auto">
              <span className="font-rick text-5xl" style={fontStyle}>
                VS
              </span>
            </div>
            <div className="w-60 h-40 sm:h-60">
              {secondId && <CharacterCard id={secondId} onClick={handleCharacterVoting} />}
            </div>
          </div>
        </div>
      </main>
    </>
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
        className="relative w-28 h-28 sm:w-40 sm:h-40 border-2 rounded-md overflow-hidden cursor-pointer"
        onClick={() => onClick(id)}
      >
        <Image
          priority
          alt={data!.character!.name}
          src={data!.character!.imageUrl}
          layout="fill"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjQwMCIgaGVpZ2h0PSIxNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImciPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMzMzIiBvZmZzZXQ9IjIwJSIgLz4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzIyMiIgb2Zmc2V0PSI1MCUiIC8+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMzMzMiIG9mZnNldD0iNzAlIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiMzMzMiIC8+CiAgPHJlY3QgaWQ9InIiIHdpZHRoPSI0MDAiIGhlaWdodD0iMTQwIiBmaWxsPSJ1cmwoI2cpIiAvPgogIDxhbmltYXRlIHhsaW5rOmhyZWY9IiNyIiBhdHRyaWJ1dGVOYW1lPSJ4IiBmcm9tPSItNDAwIiB0bz0iNDAwIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgIC8+Cjwvc3ZnPg=="
        />
      </div>
      <h2 className="text-xl text-center mt-3">{data!.character!.name}</h2>
    </div>
  );
};

export default Home;
