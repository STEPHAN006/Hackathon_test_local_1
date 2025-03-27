// app/api/students/route.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: { payments: true },
    });
    return new Response(JSON.stringify(students), { status: 200 });
  } catch (error) {
    return new Response('Erreur lors de la récupération des étudiants.', { status: 500 });
  }
}
