import Header from "./components/Header";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <Header />
      <div className="w-full h-screen flex flex-col items-center justify-center overflow-hidden fixed">
        <h1 className="text-7xl font-bold"> Tranquil </h1>
        <p className="mt-5 text-2xl"> A wellness app </p>
        <p> Journal, Breathe, and write down your thoughts </p>
        <Link
          href="https://github.com/vibovenkat123/tranquil"
          className="mt-5 underline"
          target="_blank"
          rel="noreferrer noopener"
        >
          <p> Github </p>
        </Link>
      </div>
    </main>
  );
}
