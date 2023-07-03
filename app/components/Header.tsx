"use client";

import Link from "next/link";
import ModeToggle from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Header(): React.ReactElement {
  return (
    <header className="flex p-4 justify-between items-center px-8 border-b-2 border-border">
      <nav className="flex items-center space-x-4 font-medium justify-between w-full">
        <Link href="/">
          <h1 className="font-semibold text-xl">Tranquil</h1>
        </Link>
        <nav className="hidden md:flex items-center space-x-10">
          <Link href="/journal">Journal</Link>
          <Link href="/breathe">Breathe</Link>
          <Link href="/export">Export</Link>
        </nav>
        <nav className="flex items-center space-x-10">
          <ModeToggle mobile={false} />
          <HamburgerMenu />
        </nav>
      </nav>
    </header>
  );
}

function HamburgerMenu(): React.ReactElement {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="md:hidden" asChild>
          <Button variant="outline" className="md:hidden">
            <p>Menu</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-8 flex flex-col gap-3">
          <DropdownMenuItem>
            <Link href="/journal" className="w-full">
              Journal
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/breathe" className="w-full">
              Breathe
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/export" className="w-full">
              Export 
            </Link>
          </DropdownMenuItem>

          <ModeToggle mobile={true} />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
