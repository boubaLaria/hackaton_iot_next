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
import bcrypt from "bcrypt";
import {createSession} from "../../../lib/session";
import prisma from "../../../lib/prisma";



export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Email non trouvé' },
                { status: 404 }
            );
        }
        if (user.email.replace(/\s+/g, "") == "") {
            return NextResponse.json(
                { error: 'vous devez saisir l\'email' },
                { status: 31 }
            );
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return NextResponse.json(
                { error: 'Mot de passe incorrect' },
                { status: 401 }
            );
        }
        await createSession(user.id, user.email, user.role)

        return NextResponse.json({
            message: 'Connexion réussie',
            user: { id: user.id, email: user.email }
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Une erreur est survenue' },
            { status: 500 }
        );
    }
}
