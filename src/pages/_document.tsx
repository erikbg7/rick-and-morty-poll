import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Which is your favourite Rick and Morty character? Vote and see the results."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@nytimesbits" />
        <meta name="twitter:creator" content="@nickbilton" />
        <meta property="og:url" content="https://rick-and-morty-poll.vercel.app/" />
        <meta property="og:title" content="Rick and Morty Poll" />
        <meta
          property="og:description"
          content="Which is your favourite Rick and Morty character? Vote and see the results."
        />
        <meta
          property="og:image"
          content="https://media.cdn.adultswim.com/uploads/20211116/thumbnails/2_2111161113156-RickAndMorty_Extra_SamuraiAndShogunPart2_11W6W0.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
