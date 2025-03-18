import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

/**
 * @swagger
 * /api/equipement/add:
 *   post:
 *     summary: Add a new equipment
 *     description: Create a new equipment entry in the database.
 *     tags:
 *       - Equipement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the equipment.
 *                 example: "Laptop"
 *               description:
 *                 type: string
 *                 description: A brief description of the equipment.
 *                 example: "A high-performance laptop."
 *               type:
 *                 type: string
 *                 description: The type/category of the equipment.
 *                 example: "Electronics"
 *     responses:
 *       201:
 *         description: Equipment created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the created equipment.
 *                 name:
 *                   type: string
 *                   description: The name of the equipment.
 *                 description:
 *                   type: string
 *                   description: A brief description of the equipment.
 *                 type:
 *                   type: string
 *                   description: The type/category of the equipment.
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Internal Server Error.
 */
export async function POST(request: Request) {
    try {
        const prisma = new PrismaClient();
        const body = await request.json();
        const { name, description, type } = body;

        if (!name || !description || !type) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newEquipement = await prisma.equipement.create({
            data: {
                name,
                description,
                type,
            },
        });
        prisma.$disconnect();
        return NextResponse.json(newEquipement, { status: 201 });
    } catch (error) {
        prisma.$disconnect();
        console.error("Error adding equipment:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
