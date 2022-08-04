import React from 'react';
import prisma from '@/server/prisma';
import { GetStaticProps } from 'next';
import Image from 'next/image';
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

const Results: any = ({ characters }: any) => {
  const parentRef = React.useRef();

  const rowVirtualizer = useVirtualizer({
    overscan: 10,
    count: characters.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 86,
  });

  return (
    <>
      {/* The scrollable element for your list */}
      <div
        // @ts-ignore
        ref={parentRef}
        style={{
          height: `100vh`,
          overflow: 'auto', // Make it scroll!
        }}
      >
        {/* The large inner element to hold all of the items */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const item = characters[virtualItem.index];
            return (
              <div
                className="flex my-2"
                key={virtualItem.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <div className="relative w-20 h-20 border-2 rounded-md overflow-hidden cursor-pointer">
                  <Image src={item.imageUrl as string} alt={item.name} layout="fill" />
                </div>
                <div className="flex flex-col ml-3">
                  <h2 className="text-xl">{item.name}</h2>
                  <h3 className="text-md">
                    {item._count.VoteFor} votes for - {item._count.VoteAgainst} votes against
                  </h3>
                </div>
              </div>
            );
          })}
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
