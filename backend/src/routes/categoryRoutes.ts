import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const categoryRouter = Router();
const prisma = new PrismaClient();

categoryRouter.get('/', async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true
            }
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});


categoryRouter.post('/', async (req, res) => {
    try {
        const { categories } = req.body;
        const createdCategories = await prisma.category.createMany({
            data: categories.map((name: string) => ({ name })),
            skipDuplicates: true
        });
        res.status(201).json({ created: createdCategories.count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create categories' });
    }
});


export default categoryRouter;