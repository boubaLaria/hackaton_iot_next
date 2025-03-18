import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

/**
 * @swagger
 * /api/equipement/edit/{id}:
 *   put:
 *     description: Edit an equipment by ID. The `state` and date fields are not editable.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the equipment to edit.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               // Add other editable fields here
 *     responses:
 *       200:
 *         description: Equipment updated successfully.
 *       400:
 *         description: Invalid request.
 *       404:
 *         description: Equipment not found.
 *       500:
 *         description: Internal server error.
 */

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await req.json();
    const prisma = new PrismaClient();

    try {
        // Remove non-editable fields
        delete body.state;
        delete body.created_at;
        delete body.updated_at;

        const updatedEquipment = await prisma.equipment.update({
            where: { id },
            data: {
                ...body,
                updated_at: new Date(), 
            },
        });
        prisma.$disconnect();
        return NextResponse.json(updatedEquipment, { status: 200 });
    } catch (error) {
        prisma.$disconnect();
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 404 });
        }
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
