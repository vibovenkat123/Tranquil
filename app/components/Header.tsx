"use client";

import Link from "next/link";
import ModeToggle from "./ModeToggle";

export default function Header(): React.ReactElement {
  return (
    <header className="flex justify-between items-center p-4 px-8 border-b-2 border-border">
      <nav className="flex items-center space-x-4 font-medium justify-between w-full">
        <nav className="flex items-center space-x-10">
          <Link href="/">
            <h1 className="font-semibold text-xl">Tranquil</h1>
          </Link>
          <Link href="/journal">Journal</Link>
          <Link href="/breathe">Breathe</Link>
        </nav>
        <nav className="flex items-center space-x-10">
          <ModeToggle />
        </nav>
      </nav>
    </header>
  );
}
