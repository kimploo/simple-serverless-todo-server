import { Todo, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  CreateTodoReqDTO,
  CreateTodoResDTO,
  DeleteTodoResDTO,
  ErrorResDTO,
  GetTodoResDTO,
  GetTodosResDTO,
  UpdateTodoReqDTO,
  UpdateTodoResDTO,
} from "./todo.types";
const prisma = new PrismaClient();

const getPageStartEnd = (limit: number, page: number) => {
  const pageStart = (page - 1) * limit;
  const pageEnd = pageStart + limit;
  return { pageStart, pageEnd };
};

export default {
  findMany: async (
    req: Request,
    res: Response<GetTodosResDTO | ErrorResDTO<string>>
  ) => {
    const { limit, page } = req.query;
    console.log(limit, page);

    if (!limit || !page) return res.status(400).json({ error: "Bad Request" });

    const { pageStart, pageEnd } = getPageStartEnd(Number(limit), Number(page));

    const todos = await prisma.todo.findMany({
      skip: pageStart,
      take: pageEnd,
    });

    return res.json({ data: todos });
  },

  findOne: async (
    req: Request,
    res: Response<GetTodoResDTO | ErrorResDTO<string>>
  ) => {
    const id = Number(req.params.id);
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) return res.status(404).json({ error: "Not Found" });
    return res.json({ data: todo });
  },

  createOne: async (
    req: Request<{}, CreateTodoResDTO, CreateTodoReqDTO>,
    res: Response<CreateTodoResDTO | ErrorResDTO<string>>
  ) => {
    const { data } = req.body;

    let todo: Todo | null;
    try {
      if (data.userId) {
        todo = await prisma.todo.create({
          data: {
            User: {
              connect: {
                id: data.userId,
              },
            },
            ...data,
            userId: undefined
          },
        });
      } else {
        console.error('no user Id');
        return res.status(400).json({ error: "Bad Request" });
      }
    } catch (e) {
      console.error(e);
      return res.status(400).json({ error: "Bad Request" });
    }

    return res.status(201).json({ data: todo });
  },

  updateOne: async (
    req: Request<{ id: string }, UpdateTodoReqDTO, UpdateTodoResDTO>,
    res: Response<UpdateTodoResDTO | ErrorResDTO<string>>
  ) => {
    const { data } = req.body;
    const todoId = Number(req.params.id);

    let todo: Todo | null;
    try {
      todo = await prisma.todo.update({
        where: { id: todoId },
        data: {
          ...data,
        },
      });
    } catch (e) {
      return res.status(400).json(e);
    }

    return res.json({
      data: todo,
    });
  },

  deleteOne: async (
    req: Request,
    res: Response<DeleteTodoResDTO | ErrorResDTO<string>>
  ) => {
    const id = Number(req.params.id);

    let todo: Todo | null;
    try {
      todo = await prisma.todo.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      return res.status(400).json(e);
    }

    if (!todo) {
      res.status(400).json({ error: "Bar Request" });
    }

    return res.status(204).json({
      id: todo.id,
    });
  },
};
