import { Todo, TodoStatus } from '@prisma/client';
export interface DefaultDTO<ActualData> {
  data: ActualData;
}

export interface ErrorResDTO<E> {
  error: E;
}

export type CreateTodoReqDTO = DefaultDTO<{
  createdAt: Date;
  updatedAt: Date;
  finishedAt: Date | null;
  canceledAt: Date | null;
  status: TodoStatus;
  msg: string;
  userId: number | null;
}>
export type CreateTodoResDTO = DefaultDTO<Todo>

export type GetTodoResDTO = DefaultDTO<Todo>

export type GetTodosResDTO = DefaultDTO<Todo[]>

export type UpdateTodoReqDTO = DefaultDTO<Todo>
export type UpdateTodoResDTO = DefaultDTO<Todo>

export type DeleteTodoResDTO = {
  id: number
}

