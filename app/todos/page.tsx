"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { addTodo, getTodos } from "../lib/todos/helpers";
import Header from "../components/Header";
import { Todo, TodoInput } from "../lib/todos/types";
import TodoItem from "../components/todos/TodoItem";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Todos(): React.ReactElement {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const allTodos = getTodos();
    setTodos(allTodos);
    if (allTodos.length == 0) {
      const todo: TodoInput = {
        name: "Example Todo",
        done_date: null,
      };
      addTodo(todo, allTodos);
      setTodos(getTodos());
    }
  }, []);
  const todoItems = todos.map((todo) => {
    return <TodoItem todo={todo} key={todo.id} setTodos={setTodos} />;
  });
  return (
    <main className="w-full h-screen">
      <Header />
      <div className="w-full mt-12 flex flex-col items-start px-20">
        <h1 className="font-bold text-5xl mb-5">Todos</h1>
        <p> Here are your daily todos! </p>
        <Table className="mt-5 w-2/3">
          <TableCaption>Daily todos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Done</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Delete Todo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{todoItems}</TableBody>
        </Table>
        <TodoForm setTodos={setTodos} />
      </div>
    </main>
  );
}

function TodoForm(props: {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}): React.ReactElement {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: FormSchema) {
    const newVals: TodoInput = {
      name: values.name,
      done_date: null,
    };
    addTodo(newVals, getTodos());
    props.setTodos(getTodos());
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Example Todo" {...field} />
                </FormControl>
                <FormDescription>The name of the todo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add</Button>
        </form>
      </Form>
    </>
  );
}
