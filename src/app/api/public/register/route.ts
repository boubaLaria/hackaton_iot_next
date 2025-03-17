import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function POST(request: Request) {
    try {
        const { first_name, last_name, email, password, phone } = await request.json()

        if (!first_name?.trim() || !last_name?.trim() || !email?.trim() || !password?.trim() || !phone?.trim()) {
            return NextResponse.json(
                { error: 'Tous les champs sont obligatoires' },
                { status: 400 }
            )
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Format d\'email invalide' },
                { status: 400 }
            )
        }

        const existingNumber = await prisma.user.findUnique({
            where: {
                phone: phone,}
        })
        if (existingNumber) {
            return NextResponse.json(
                { error: 'Cet numéro de téléphone est déjà utilisé' },
                { status: 313 }
            )
        }
        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase().trim(),
            }
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'Cet email est déjà utilisé' },
                { status: 409 }
            )
        }


        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                first_name: first_name.trim(),
                last_name: last_name.trim(),
                email: email.toLowerCase().trim(),
                password: hashedPassword,
                phone: phone.trim(),
            }
        });

        return NextResponse.json({
            success: true,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone
            }
        })

    } catch (error) {
        console.error('Registration error:', error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: 'Une erreur est survenue lors de l\'inscription' },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
