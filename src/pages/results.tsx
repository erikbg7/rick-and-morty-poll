import React from 'react';
import prisma from '@/server/prisma';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { AsyncReturnType } from 'type-fest';
import { useVirtualizer } from '@tanstack/react-virtual';

const getSortedCharacters = async () => {
  return await prisma.character.findMany({
    orderBy: {
      VoteFor: { _count: 'desc' },
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      _count: {
        select: {
          VoteFor: true,
          VoteAgainst: true,
        },
      },
    },
  });
};

type CharacterQueryResult = AsyncReturnType<typeof getSortedCharacters>;

const Results = ({ characters }: { characters: CharacterQueryResult }) => {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    overscan: 10,
    count: characters.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 114,
  });

  return (
    <>
      <Head>
        <title>Poll Results</title>
      </Head>
      <div className="flex flex-col items-center p-6">
        <div className="py-10">
          <h1 className="text-5xl">Voting Results</h1>
        </div>
        <div ref={parentRef} className="w-screen h-[75vh] overflow-auto">
          <div
            className={`relative w-screen`}
            style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
              const item = characters[virtualItem.index];
              return (
                <div
                  className="absolute top-0 left-0 w-screen"
                  key={virtualItem.key}
                  style={{
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <div className="flex justify-center p-4 border-b-2 border-b-gray-700">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden cursor-pointer">
                      <span className="absolute top-0 left-0 bg-blue-400 z-10 px-1 rounded-br-md shadow-black shadow-md">
                        {virtualItem.index + 1}
                      </span>
                      <Image src={item.imageUrl} alt={item.name} layout="fill" />
                    </div>
                    <div className="flex flex-col ml-3 w-[300px]">
                      <h2 className="text-xl">{item.name}</h2>
                      <h3 className="text-md">
                        {item._count.VoteFor} votes for - {item._count.VoteAgainst} votes against
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const DAY_IN_SECONDS = 60 * 60 * 24;
  const sortedCharacters = await getSortedCharacters();

  return { props: { characters: sortedCharacters }, revalidate: DAY_IN_SECONDS };
};

export default Results;
