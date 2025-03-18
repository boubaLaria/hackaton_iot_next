import { NextResponse } from "next/server";
import { getSession } from "@/lib/session"; 

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }

  return NextResponse.json({
    first_name: session.first_name,
    last_name: session.last_name,
    email: session.email,
  });
}
