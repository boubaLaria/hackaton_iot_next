import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

/**
 * @swagger
 * /api/equipement/get/{id}:
 *   get:
 *     summary: Get an equipment by ID
 *     description: Fetches a single equipment by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the equipment to retrieve.
 *     responses:
 *       200:
 *         description: The equipment details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Equipment not found.
 *       500:
 *         description: Internal server error.
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const prisma = new PrismaClient();
    try {
        const equipement = await prisma.equipement.findUnique({
            where: { id: id },
        });
        prisma.$disconnect();
        if (!equipement) {
            return NextResponse.json({ error: "Equipement not found" }, { status: 404 });
        }

        return NextResponse.json(equipement);
    } catch (error) {
        prisma.$disconnect();
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
