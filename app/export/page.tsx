"use client";
import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import { Clipboard, Share } from "lucide-react";
import { getEntries } from "../lib/journal/helpers";
import { useToast } from "@/components/ui/use-toast";
import { copyMobile } from "../lib/helpers";

export default function Export(): React.ReactElement {
  const { toast } = useToast();
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="text-4xl font-bold">Export</h1>
        <p className="text-xl mt-5">Export your data</p>
        <Button
          className="mt-5"
          onClick={() => {
            const text = JSON.stringify(getEntries());
            if (!navigator.clipboard) {
              copyMobile(text);
            } else {
              navigator.clipboard.writeText(JSON.stringify(getEntries()));
            }
            toast({
              title: "Copied to clipboard",
            });
          }}
        >
          <Share />
        </Button>
        <h1 className="text-4xl font-bold mt-12"> Import </h1>
        <p className="text-xl mt-5">Import your data</p>
        <Button
          className="mt-5"
          onClick={() => {
            navigator.clipboard.readText().then((text) => {
              if (
                !confirm(
                  "Are you sure you want to import from clipboard? This will overwrite all your entries."
                )
              )
                return;
              localStorage.setItem("entries", text);
              toast({
                title: "Imported from clipboard",
              });
            });
          }}
        >
          <Clipboard />
        </Button>
      </div>
    </>
  );
}
