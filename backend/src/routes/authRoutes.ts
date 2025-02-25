import express, { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const authRouter = Router();
const prisma = new PrismaClient();

// Signup route (your existing code)
authRouter.post('/signup', async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, institution, email, password } = req.body;

        // Validation for required fields
        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({ error: 'First name, last name, email, and password are required' });
            return;
        }

        // Email validation (optional but recommended)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            res.status(400).json({ error: 'Email already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with institution as optional
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                // Only include institution if provided
                ...(institution ? { institution } : {})
            }
        });

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '1d' }
        );

        res.status(201).json({
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                institution: user.institution
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// New signin route
authRouter.post('/signin', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validate that required fields are present
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        // Find the user by email
        const user = await prisma.user.findUnique({
            where: { email }
        });

        // If no user found or password doesn't match
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Compare provided password with stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '1d' }
        );

        // Return token and basic user info (excluding password)
        res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                institution: user.institution
            }
        });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ error: 'Error during authentication' });
    }
});

export default authRouter;