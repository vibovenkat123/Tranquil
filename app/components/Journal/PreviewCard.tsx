import {
  deleteEntry,
  formatDate,
  getEntries,
  spliceContent,
} from "@/app/lib/journal/helpers";
import { Entry } from "@/app/lib/journal/types";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Clipboard, Pencil, Share, Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
type Props = {
  entry: Entry;
  setCurrentEntry: Dispatch<SetStateAction<Entry | null>>;
  setEntries: Dispatch<SetStateAction<Entry[]>>;
};
export default function PreviewCard(props: Props): React.ReactElement {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Button
          key={props.entry.date.getTime()}
          className="w-full mt-5 flex-col gap-2 p-12"
          variant="outline"
          onClick={() => {
            props.setCurrentEntry(props.entry);
          }}
        >
          <h2>{formatDate(props.entry.date)}</h2>
          <p>
            <strong>{props.entry.adjective}</strong>
          </p>
          <p>{spliceContent(props.entry.content)}</p>
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <Button
            className="flex gap-3 items-center"
            variant="ghost"
            onClick={() => {
              // copy entries adjective
              navigator.clipboard.writeText(props.entry.adjective);
            }}
          >
            <Clipboard size={16} />
            Copy Mood
          </Button>
        </ContextMenuItem>
        <ContextMenuItem>
          <Button
            className="flex gap-3 items-center"
            variant="ghost"
            onClick={() => {
              props.setCurrentEntry(props.entry);
            }}
          >
            <Pencil size={16} />
            Edit
          </Button>
        </ContextMenuItem>
        <ContextMenuItem>
          <Button
            className="flex gap-3 items-center"
            variant="ghost"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(props.entry));
            }}
          >
            <Share size={16} />
            Export
          </Button>
        </ContextMenuItem>
        <ContextMenuItem>
          <Button
            variant={"destructive"}
            className="flex gap-3 items-center"
            onClick={() => {
              deleteEntry(props.entry.date);
              props.setEntries(getEntries());
            }}
          >
            <Trash size={16} />
            Delete
          </Button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
