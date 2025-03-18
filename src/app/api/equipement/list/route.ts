import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

/**
 * @swagger
 * /api/equipement/list:
 *   get:
 *     summary: Retrieve a list of equipment
 *     description: Fetches all equipment from the database.
 *     responses:
 *       200:
 *         description: A list of equipment.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: Internal server error.
 */
export async function GET() {
    const prisma = new PrismaClient();
    try {
        const equipements = await prisma.equipement.findMany();
        prisma.$disconnect();
        return NextResponse.json(equipements, { status: 200 });
    } catch (error) {
        prisma.$disconnect();
        console.error("Error fetching equipment:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
