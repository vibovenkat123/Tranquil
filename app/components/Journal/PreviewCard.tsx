import { formatDate, spliceContent } from "@/app/lib/journal/helpers";
import { Entry } from "@/app/lib/journal/types";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
type Props = {
  entry: Entry;
  setCurrentEntry: Dispatch<SetStateAction<Entry | null>>;
};
export default function PreviewCard(props: Props): React.ReactElement {
  return (
    <Button
      key={props.entry.date.getTime()}
      className="w-full mt-5 flex-col gap-2 p-8"
      variant="outline"
      onClick={() => {
        props.setCurrentEntry(props.entry);
      }}
    >
      <h2>{formatDate(props.entry.date)}</h2>
      <p>{spliceContent(props.entry.content)}</p>
    </Button>
  );
}
