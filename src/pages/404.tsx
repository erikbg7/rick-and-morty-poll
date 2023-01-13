import { NextPage } from 'next';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const ErrorPage: NextPage = () => {
  return (
    <main>
      <div className="h-screen w-screen flex flex-col justify-center items-center pb-16">
        <h2 className="flex flex-col items-center px-6 md:px-12 pb-20 text-center">
          <span className="font-rick text-6xl md:text-8xl">💰 404 💰</span>
          <span className="font-rick text-4xl md:text-5xl py-2">Money not found!</span>
        </h2>
        <p className="text-xl md:text-2xl font-extralight text-center">
          My database free tier is over till next month.
        </p>
        <p className="text-2xl font-extralight py-2">Try again in a few days!</p>
      </div>
      <section className="fixed bottom-8 w-full">
        <div className="w-full flex items-center justify-center">
          <span className="text-sm">by Erik Blanca</span>
          <a
            className="ml-4"
            title="Link to LinkedIn profile"
            href="https://www.linkedin.com/in/erik-blanca-gomez-32455a162/"
          >
            <FaLinkedin size={24} />
          </a>
          <a className="ml-4" title="Link to GitHub profile" href="https://www.github.com/erikbg7">
            <FaGithub size={24} />
          </a>
        </div>
      </section>
    </main>
  );
};

export default ErrorPage;
