import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer";
import {role} from "../../../lib/roles";
import prisma from "../../../lib/prisma";

export async function POST(request: Request) {
    try {
        const { firstName, lastName, email, password, phone } = await request.json()

        if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !password?.trim() || !phone?.trim()) {
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

        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
        if (!phoneRegex.test(phone)) {
            return NextResponse.json(
                { error: 'Format de téléphone invalide' },
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


        if (password.length < 12) {
            return NextResponse.json(
                { error: 'Le mot de passe doit contenir au moins 12 caractères' },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                name: `${firstName.trim()} ${lastName.trim()}`,
                email: email.toLowerCase().trim(),
                password: hashedPassword,
                phone: phone.trim(),
                role: role.ADMIN,
                subscribe: new Date(),
                subscriptionEnds: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            }
        });
        
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        const fullName = `${firstName.trim()} ${lastName.trim()}`;
        
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Confirmation d'inscription chez Vision Link",
            html: `
                    <p>Bonjour <b>${fullName}</b>,</p> 
                    
                    <p>Nous sommes ravis de vous compter parmi nous ! Votre inscription chez <b>Vision Link</b> a bien été prise en compte.</p>
                    
                    <p>Vous pouvez dès à présent accéder à votre compte et profiter de tous nos services.</p>
                    <p>Pour acceder a nos service: <a href="http://localhost:3000/login">Vision Link</a></p>
                    <p>Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.</p>
                    
                    <br>
                    <p>Cordialement,</p>
                    <p>L'équipe Vision Link</p>
`
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
        console.error('Registration error:', error)
        return NextResponse.json(
            { error: 'Une erreur est survenue lors de l\'inscription' },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
