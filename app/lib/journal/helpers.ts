import { z } from "zod";
import { Entry } from "./types";

export function validateEntry(adjective: string, content: string): Entry | undefined {
  try {
    const entry = Entry.parse({ adjective, content, date: new Date() });
    return entry;
  } catch (e) {
    return undefined;
  }
}

export function updateEntry(entry: Entry): void {
  const entries = getEntries();
  const index = entries.findIndex(
    (e) =>
      e.date.getDate === entry.date.getDate &&
      e.date.getMonth === entry.date.getMonth &&
      e.date.getFullYear === entry.date.getFullYear
  );
  if (index === -1) {
    return;
  }
  entries[index] = entry;
  localStorage.setItem("entries", JSON.stringify(entries));
}

export function newEntry(entry: Entry): void {
  const entries = getEntries();

  if (
    entries.find(
      (e) =>
        e.date.getDate === entry.date.getDate &&
        e.date.getMonth === entry.date.getMonth &&
        e.date.getFullYear === entry.date.getFullYear
    )
  ) {
    return;
  }
  localStorage.setItem("entries", JSON.stringify([...entries, entry]));
}

export function getEntries(): Entry[] {
  let entriesStorage = localStorage.getItem("entries");
  if (entriesStorage) {
    const entries = z.array(Entry).safeParse(JSON.parse(entriesStorage));
    if (entries.success) {
      return entries.data;
    }
    console.log(entries.error);
    localStorage.setItem("entries", JSON.stringify([]));
    return [];
  }
  return [];
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

export function spliceContent(content: string): string {
  if (content.length > 30) {
    return `${content.slice(0, 30)}...`;
  }
  return content;
}