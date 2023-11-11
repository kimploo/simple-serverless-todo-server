
import serverless from 'serverless-http';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { todoRouter } from './todo/todo.router';
const app = express();

const isDev = process.env.IS_OFFLINE;
console.log('isDev?', isDev)

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/todo', todoRouter);

app.get('/health', (_, res) => {
  return res.status(200).json({
    message: 'health check',
  });
});

app.use((err, res) => {
  // console.log(`[UNCAUGHT ERROR]`, err)
  return res.status(500).send('INTERNAL SERVER ERROR')
});

export const handler = serverless(app);