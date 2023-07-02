"use client";

import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { Menu, X } from "lucide-react";

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
            <Menu
              className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0`}
            />
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
          <ModeToggle mobile={true} />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
