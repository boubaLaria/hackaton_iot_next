import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async  function  getDevices(id) {
    const prisma = new PrismaClient();
    try {
        const equipement = await prisma.equipement.findUnique({
            where: { id: id },
        });
        prisma.$disconnect();
        return equipements;
    } catch (error) {
        prisma.$disconnect();
        console.error("Error fetching equipment:", error);
       return []
    }
}