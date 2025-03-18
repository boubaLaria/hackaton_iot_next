import * as logos from "@/assets/logos";
import { PrismaClient } from "@prisma/client";

export async function getTopProducts() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      image: "/images/product/product-01.png",
      name: "Apple Watch Series 7",
      category: "Electronics",
      price: 296,
      sold: 22,
      profit: 45,
    },
    {
      image: "/images/product/product-02.png",
      name: "Macbook Pro M1",
      category: "Electronics",
      price: 546,
      sold: 12,
      profit: 125,
    },
    {
      image: "/images/product/product-03.png",
      name: "Dell Inspiron 15",
      category: "Electronics",
      price: 443,
      sold: 64,
      profit: 247,
    },
    {
      image: "/images/product/product-04.png",
      name: "HP Probook 450",
      category: "Electronics",
      price: 499,
      sold: 72,
      profit: 103,
    },
  ];
}

export async function getInvoiceTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Free package",
      price: 0.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Business Package",
      price: 99.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Unpaid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Pending",
    },
  ];
}

export async function getTopChannels() {
  // Fake delay
  const prisma = new PrismaClient();
  const equipements = await prisma.equipement.findMany({
    include: {
      user: true, // Inclure les données de l'utilisateur associé
    },
  });
  prisma.$disconnect();
  console.log(equipements);
  return equipements;
  return [
    {
      name: "Lampe salon",
      type: "Lampe",
      état: true,
      créateur:  "John Doe",
    },
    {
      name: "Lampe cuisine",
      type: "Lampe",
      état: true,
      créateur: "Jane Doe",
    },
    {
      name: "Volet chambre 1",
      type: "Volet",
      état: true,
      créateur: "Michel Dupont",
    },
    {
      name: "Volet chambre 2",
      type: "Volet",
      état: false,
      créateur:  "John Doe",
    },
    {
      name: "Lampes extérieures",
      type: "Lampe",
      état: false,
      créateur: "John Doe",
    },
  ];
}
