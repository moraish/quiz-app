import express, { Request, Response } from 'express';
import categoryRouter from './routes/categoryRoutes';
import cors from 'cors';
import questionRouter from './routes/questionRoutes';
import authRouter from './routes/authRoutes';


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});


app.use('/api/categories', categoryRouter);
app.use('/api/question', questionRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


export default app;