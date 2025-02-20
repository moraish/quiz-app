import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const categoryRouter = Router();
const prisma = new PrismaClient();

categoryRouter.get('/', async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

export default categoryRouter;