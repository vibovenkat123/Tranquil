import { TodoSchema, Todo, TodoInput } from "./types";

export function addTodo(todo: TodoInput, todos: Todo[]): void {
  let id = 0;
  if (todos.length > 0) {
    id = todos[todos.length - 1].id + 1;
  }
  const newTodo: Todo = {
    ...todo,
    id: id,
  };
  if (!TodoSchema.safeParse(newTodo).success) {
    return;
  }
  const newTodos = [...todos, newTodo];
  localStorage.setItem("todos", JSON.stringify(newTodos));
}

export function removeTodoById(id: number, todos: Todo[]): void {
  const newTodos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(newTodos));
}

export function getTodos(): Todo[] {
  const todos = localStorage.getItem("todos");
  if (todos) {
    return JSON.parse(todos);
  } else {
    localStorage.setItem("todos", JSON.stringify([]));
    return [];
  }
}

export function updateTodo(todo: Todo, todos: Todo[]): void {
  const updatedTodo = TodoSchema.safeParse(todo);
  if (!updatedTodo.success) {
    return;
  }
  removeTodoById(updatedTodo.data.id, todos);
  addTodo(updatedTodo.data, getTodos());
}
