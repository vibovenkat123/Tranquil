"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Entry } from "@/app/lib/journal/types";
import { getEntries, updateEntry } from "@/app/lib/journal/helpers";
import { Dispatch, SetStateAction } from "react";
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
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  if (!props.entry) {
    return <></>
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
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}