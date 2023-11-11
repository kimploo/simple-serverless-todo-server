import express from 'express';
import todoController from './todo.controller'
const todoRouter = express.Router();

todoRouter.get('/:id', todoController.findOne)
todoRouter.get('/', todoController.findMany)
todoRouter.post('/', todoController.createOne)
todoRouter.put('/:id', todoController.updateOne)
todoRouter.delete('/:id', todoController.deleteOne)

export { todoRouter }