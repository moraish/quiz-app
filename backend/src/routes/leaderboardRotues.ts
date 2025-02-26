import express, { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const leaderboardRouter = Router();
const prisma = new PrismaClient();

// GET route to fetch leaderboard data
leaderboardRouter.get('/', async (req: Request, res: Response) => {
    console.log("Leaderboard hit!")
    try {
        const leaderboardData = await prisma.$queryRaw`
            SELECT 
                l."userId",
                SUM(l.points) as points,
                u."firstName",
                u."lastName",
                u.institution
            FROM "Leaderboard" l
            JOIN "User" u ON l."userId" = u.id
            GROUP BY l."userId", u."firstName", u."lastName", u.institution
            ORDER BY points DESC
            LIMIT 10
        `;

        res.status(200).json(leaderboardData);
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard data' });
    }
});

// GET route to fetch leaderboard data by category
leaderboardRouter.get('/category', async (req: Request, res: Response): Promise<void> => {
    try {
        const { category_id } = req.body;

        if (!category_id) {
            res.status(400).json({ error: 'Category ID is required' });
            return;
        }

        const leaderboardData = await prisma.$queryRaw`
            SELECT 
                l."userId",
                l.points,
                u."firstName",
                u."lastName",
                u.institution
            FROM "Leaderboard" l
            JOIN "User" u ON l."userId" = u.id
            WHERE l.category_id = ${category_id}
            ORDER BY l.points DESC
            LIMIT 10
        `;

        res.status(200).json(leaderboardData);
    } catch (error) {
        console.error('Error fetching category leaderboard data:', error);
        res.status(500).json({ error: 'Failed to fetch category leaderboard data' });
    }
});

// GET route to fetch leaderboard data by institution
leaderboardRouter.get('/institution', async (req: Request, res: Response): Promise<void> => {
    try {
        const { institution } = req.body;

        if (!institution) {
            res.status(400).json({ error: 'Institution name is required in the request body' });
            return;
        }

        const leaderboardData = await prisma.$queryRaw`
            SELECT 
                l."userId",
                SUM(l.points) as points,
                u."firstName",
                u."lastName",
                u.institution
            FROM "Leaderboard" l
            JOIN "User" u ON l."userId" = u.id
            WHERE LOWER(u.institution) = LOWER(${institution})
            GROUP BY l."userId", u."firstName", u."lastName", u.institution
            ORDER BY points DESC
            LIMIT 10
        `;

        res.status(200).json(leaderboardData);
    } catch (error) {
        console.error('Error fetching institution leaderboard data:', error);
        res.status(500).json({ error: 'Failed to fetch institution leaderboard data' });
    }
});

// POST route to update or create leaderboard score
leaderboardRouter.post('/updateScore', async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, category_id, points } = req.body;

        if (!userId || !category_id || points === undefined) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        // Find existing record or create a new one
        const updatedScore = await prisma.leaderboard.upsert({
            where: {
                userId_category_id: {
                    userId,
                    category_id
                }
            },
            update: {
                points: {
                    increment: points
                }
            },
            create: {
                userId,
                category_id,
                points
            }
        });

        res.status(200).json(updatedScore);
    } catch (error) {
        console.error('Error updating leaderboard score:', error);
        res.status(500).json({ error: 'Failed to update score' });
    }
});

export default leaderboardRouter;
