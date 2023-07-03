"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";

import { Todo } from "@/app/lib/todos/types";
import { Dispatch, SetStateAction, useState } from "react";
import { getTodos, removeTodoById, updateTodo } from "@/app/lib/todos/helpers";
import { Trash } from "lucide-react";

type Props = {
  todo: Todo;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};
export default function TodoItem(props: Props): React.ReactElement {
  let isToday = false;
  if (props.todo.done_date) {
    isToday =
      new Date(props.todo.done_date).toDateString() ==
      new Date().toDateString();
  }
  const [checked, setChecked] = useState(isToday);
  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={checked}
          onCheckedChange={(checked) => {
            if (typeof checked.valueOf() === "boolean") {
              updateTodo(
                {
                  ...props.todo,
                  done_date: checked.valueOf() ? new Date() : null,
                },
                getTodos()
              );
              setChecked(checked.valueOf() as boolean);
            }
          }}
        />
      </TableCell>
      <TableCell className="font-medium">{props.todo.name}</TableCell>
      <TableCell className="text-right">
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete your todo
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  removeTodoById(props.todo.id, getTodos());
                  props.setTodos(getTodos());
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
