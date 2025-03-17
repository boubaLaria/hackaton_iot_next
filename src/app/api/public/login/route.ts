/**
 * @swagger
 * /api/public/login:
 *   post:
 *     summary: Authentification utilisateur
 *     description: Permet à un utilisateur de se connecter en fournissant un email et un mot de passe.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'email de l'utilisateur.
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Connexion réussie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Connexion réussie"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID de l'utilisateur.
 *                     email:
 *                       type: string
 *                       description: Email de l'utilisateur.
 *       401:
 *         description: Mot de passe incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Mot de passe incorrect"
 *       404:
 *         description: Email non trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email non trouvé"
 *       500:
 *         description: Une erreur est survenue.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Une erreur est survenue"
 */

import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { createSession } from '@/lib/session';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Validate input fields
        if (!email?.trim() || !password?.trim()) {
            return NextResponse.json(
                { error: 'Email et mot de passe sont obligatoires' },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim() },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Utilisateur non trouvé' },
                { status: 404 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Mot de passe incorrect' },
                { status: 401 }
            );
        }
        await createSession(user.id, user.email,user.first_name,user.last_name);

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
        });
    } catch (error) {
        console.error('Login error:', error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: 'Une erreur est survenue lors de la connexion' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
