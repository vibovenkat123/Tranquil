"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ADJECTIVE, ALLOWED_ADJECTIVE, Entry } from "@/app/lib/journal/types";
import { getEntries, updateEntry } from "@/app/lib/journal/helpers";
import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Angry, Frown, Laugh, Meh, Smile } from "lucide-react";
type Props = {
  entry: Entry | null;
  setEntries: Dispatch<SetStateAction<Entry[]>>;
};
export default function JournalEntry(props: Props): React.ReactElement {
  const form = useForm<Entry>({
    resolver: zodResolver(Entry),
    values: props.entry!,
  });

  function onSubmit(data: Entry) {
    updateEntry(data);
    props.setEntries(getEntries());
    toast({
      title: "Saved",
      description: "Your entry has been saved",
    });
  }
  if (!props.entry) {
    return <></>;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Talk about your day"
                  className="resize-none h-96"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adjective"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mood</FormLabel>
              <Select
                onValueChange={(value) => {
                  const adj = ALLOWED_ADJECTIVE.safeParse(value);
                  if (adj.success) {
                    field.onChange(adj.data);
                  }
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue>{field.value}</SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={ADJECTIVE.VERY_PLEASANT}>
                    <div className="flex w-full gap-3 items-center">
                      <Laugh size={16}/>
                      {ADJECTIVE.VERY_PLEASANT}
                    </div>
                  </SelectItem>
                  <SelectItem value={ADJECTIVE.PLEASANT}>
                    <div className="flex w-full gap-3 items-center">
                      <Smile size={16}/>
                      {ADJECTIVE.PLEASANT}
                    </div>
                  </SelectItem>
                  <SelectItem value={ADJECTIVE.NEUTRAL}>
                    <div className="flex w-full gap-3 items-center">
                      <Meh size={16}/>
                      {ADJECTIVE.NEUTRAL}
                    </div>
                  </SelectItem>
                  <SelectItem value={ADJECTIVE.UNPLEASANT}>
                    <div className="flex w-full gap-3 items-center">
                      <Frown size={16}/>
                      {ADJECTIVE.UNPLEASANT}
                    </div>
                  </SelectItem>
                  <SelectItem value={ADJECTIVE.VERY_UNPLEASANT}>
                    <div className="flex w-full gap-3 items-center">
                      <Angry size={16}/>
                      {ADJECTIVE.VERY_UNPLEASANT}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>How are you feeling today?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
