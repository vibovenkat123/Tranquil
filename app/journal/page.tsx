"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import JournalEntry from "@/app/components/Journal/Entry";
import { ADJECTIVE, Entry } from "../lib/journal/types";
import {
  getEntries,
  validateEntry,
  newEntry,
} from "../lib/journal/helpers";
import PreviewCard from "../components/Journal/PreviewCard";

export default function Journal(): React.ReactElement {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Entry | null>(null);
  useEffect(() => {
    setEntries(getEntries());
  }, []);
  const cards: React.ReactElement[] = entries.map((entry) => {
    return (
      <PreviewCard key={entry.date.getTime()} entry={entry} setCurrentEntry={setCurrentEntry} />
    );
  });
  return (
    <main className="flex flex-col overflow-hidden w-full fixed">
      <Header />
      <div className="w-full flex h-auto overflow-auto">
        <div className="w-1/5 border-r-2 border-border h-screen p-4">
          {cards}
        </div>
        <div className="w-4/5 h-screen p-4">
          <Button
            className={`${currentEntry ? "hidden" : "block"}`}
            onClick={() => {
              const entry = validateEntry(
                ADJECTIVE.NEUTRAL,
                "Talk about your day"
              );
              if (entry) {
                newEntry(entry);
                setEntries(getEntries());
              }
            }}
          >
            add
          </Button>
          <JournalEntry entry={currentEntry} setEntries={setEntries}/>
        </div>
      </div>
    </main>
  );
}
