import { Request, Response, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import { parse } from 'csv-parse';
import fs from 'fs';
import { promisify } from 'util';
import { Router } from 'express';

// Define an interface for the CSV row structure
interface QuestionRow {
    text: string;
    answer: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    category_id: number;
}

const questionRouter = Router();
const prisma = new PrismaClient();
const upload = multer({ dest: 'uploads/' });

// Need  to understand this -> this was used to load all the questions to the DB
const uploadHandler: RequestHandler = async (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
    }

    try {
        const parseFile = async (filePath: string): Promise<QuestionRow[]> => {
            const results: QuestionRow[] = [];

            return new Promise((resolve, reject) => {
                fs.createReadStream(filePath)
                    .pipe(parse({ columns: true, delimiter: ',' }))
                    .on('data', (data: any) => {
                        // Parse category_id to integer
                        const parsedRow: QuestionRow = {
                            ...data,
                            category_id: parseInt(data.category_id, 10)
                        };

                        // Validate that category_id is a valid number
                        if (isNaN(parsedRow.category_id)) {
                            reject(new Error(`Invalid category_id: ${data.category_id}`));
                            return;
                        }

                        results.push(parsedRow);
                    })
                    .on('error', (error: Error) => reject(error))
                    .on('end', () => resolve(results));
            });
        };

        const results = await parseFile(req.file.path);

        await prisma.$transaction(
            results.map((row: QuestionRow) =>
                prisma.question.create({
                    data: {
                        text: row.text,
                        answer: row.answer,
                        option_a: row.option_a,
                        option_b: row.option_b,
                        option_c: row.option_c,
                        option_d: row.option_d,
                        category_id: row.category_id // Now guaranteed to be a number
                    }
                })
            )
        );

        await promisify(fs.unlink)(req.file.path);

        res.status(200).json({
            message: `Successfully imported ${results.length} questions`
        });
    } catch (error) {
        try {
            if (req.file) {
                await promisify(fs.unlink)(req.file.path);
            }
        } catch (unlinkError) {
            console.error('Error deleting file:', unlinkError);
        }

        res.status(500).json({
            error: 'Error processing or saving questions',
            details: error instanceof Error ? error.message : String(error)
        });
    }
};

questionRouter.post('/upload', upload.single('file'), uploadHandler);

// fix routes later
questionRouter.get('/:category_id', async (req: any, res: any) => {
    try {
        const category_id = parseInt(req.params.category_id as string, 10);

        if (isNaN(category_id)) {
            return res.status(400).json({ error: 'Invalid category_id' });
        }

        // Use raw SQL query to fetch random questions
        const questions = await prisma.$queryRaw`
            SELECT id, text, answer, option_a, option_b, option_c, option_d, category_id  FROM "Question"
            WHERE category_id = ${category_id}
            ORDER BY RANDOM() 
            LIMIT 10
        `;

        res.json(questions);
    } catch (error) {
        res.status(500).json({
            error: 'Error fetching questions',
            details: error instanceof Error ? error.message : String(error)
        });
    }
});

// Define interface for the request body
interface ScoreItem {
    questionId: number;
    status: string;
}

questionRouter.post('/score', async (req: Request<{}, {}, ScoreItem[]>, res: Response) => {
    try {
        const answers = req.body;
        let correctCount = 0;

        // Fetch all questions with all options in a single query
        const questions = await prisma.question.findMany({
            where: {
                id: {
                    in: answers.map(a => a.questionId)
                }
            },
            select: {
                id: true,
                answer: true,
                option_a: true,
                option_b: true,
                option_c: true,
                option_d: true
            }
        });

        // Create a map for quick lookup
        const questionMap = new Map(questions.map(q => [q.id, q]));

        // Count correct answers
        answers.forEach(answer => {
            const question = questionMap.get(answer.questionId);
            if (!question || answer.status === 'incomplete') return;

            const selectedOption = {
                'A': question.option_a,
                'B': question.option_b,
                'C': question.option_c,
                'D': question.option_d
            }[answer.status];

            if (selectedOption?.toLowerCase() === question.answer.toLowerCase()) {
                correctCount++;
            }
        });

        res.json({ score: correctCount });
    } catch (error) {
        res.status(500).json({
            error: 'Error calculating score',
            details: error instanceof Error ? error.message : String(error)
        });
    }
});

export default questionRouter;