import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import '@/styles/globals.css';
import { AppRouter } from '@/server/router';

const MyApp = ({ Component, pageProps }: any) => {
  return <Component {...pageProps} />;
};

MyApp.getInitialProps = () => {
  return { title: 'title' };
};

export default MyApp;
