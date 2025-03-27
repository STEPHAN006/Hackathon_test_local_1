import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insertion de plusieurs élèves avec des valeurs pour mention, parcours et anneeScolaire
  await prisma.student.createMany({
    data: [
      {
        firstName: 'Alice',
        lastName: 'Dupont',
        email: 'alice.dupont@example.com',
        class: 'Terminale',
        enrollmentNo: '2025001',
        mention: 'HEST',
        parcours: 'informatique',
        anneeScolaire: 'L1',
        matricule: 1001,
      },
      {
        firstName: 'Bob',
        lastName: 'Martin',
        email: 'bob.martin@example.com',
        class: 'Première',
        enrollmentNo: '2025002',
        mention: 'HEP',
        parcours: 'genie civile',
        anneeScolaire: 'L2',
        matricule: 1002,
      },
      {
        firstName: 'Charlie',
        lastName: 'Durand',
        email: 'charlie.durand@example.com',
        class: 'Seconde',
        enrollmentNo: '2025003',
        mention: 'HECM',
        parcours: 'philisophie',
        anneeScolaire: 'L3',
        matricule: 1003,
      },
      {
        firstName: 'Diane',
        lastName: 'Lefevre',
        email: 'diane.lefevre@example.com',
        class: 'Terminale',
        enrollmentNo: '2025004',
        mention: 'HEST',
        parcours: 'informatique',
        anneeScolaire: 'M1',
        matricule: 1004,
      },
      {
        firstName: 'Eve',
        lastName: 'Moreau',
        email: 'eve.moreau@example.com',
        class: 'Première',
        enrollmentNo: '2025005',
        mention: 'HEP',
        parcours: 'genie civile',
        anneeScolaire: 'M2',
        matricule: 1005,
      },
      {
        firstName: 'Frank',
        lastName: 'Bernard',
        email: 'frank.bernard@example.com',
        class: 'Seconde',
        enrollmentNo: '2025006',
        mention: 'HECM',
        parcours: 'philisophie',
        anneeScolaire: 'L1',
        matricule: 1006,
      },
      {
        firstName: 'Grace',
        lastName: 'Petit',
        email: 'grace.petit@example.com',
        class: 'Terminale',
        enrollmentNo: '2025007',
        mention: 'HEST',
        parcours: 'informatique',
        anneeScolaire: 'L2',
        matricule: 1007,
      },
      {
        firstName: 'Henry',
        lastName: 'Roux',
        email: 'henry.roux@example.com',
        class: 'Première',
        enrollmentNo: '2025008',
        mention: 'HEP',
        parcours: 'genie civile',
        anneeScolaire: 'L3',
        matricule: 1008,
      },
      {
        firstName: 'Ivy',
        lastName: 'Blanc',
        email: 'ivy.blanc@example.com',
        class: 'Seconde',
        enrollmentNo: '2025009',
        mention: 'HECM',
        parcours: 'philisophie',
        anneeScolaire: 'M1',
        matricule: 1009,
      },
      {
        firstName: 'Jack',
        lastName: 'Garnier',
        email: 'jack.garnier@example.com',
        class: 'Terminale',
        enrollmentNo: '2025010',
        mention: 'HEST',
        parcours: 'informatique',
        anneeScolaire: 'M2',
        matricule: 1010,
      },
    ],
  });
  console.log('Élèves ajoutés avec succès');

  // Insertion d'un paiement par élève (attention : la contrainte @unique sur studentId limite à un paiement par élève)
  await prisma.payment.createMany({
    data: [
      { studentId: 1, amount: 500.0, status: 'payé', method: 'virement' },
      { studentId: 2, amount: 600.0, status: 'en attente', method: 'espèces' },
      { studentId: 3, amount: 550.0, status: 'payé', method: 'chèque' },
      { studentId: 4, amount: 500.0, status: 'payé', method: 'virement' },
      { studentId: 5, amount: 600.0, status: 'en attente', method: 'espèces' },
      { studentId: 6, amount: 550.0, status: 'payé', method: 'chèque' },
      { studentId: 7, amount: 500.0, status: 'payé', method: 'virement' },
      { studentId: 8, amount: 600.0, status: 'en attente', method: 'espèces' },
      { studentId: 9, amount: 550.0, status: 'payé', method: 'chèque' },
      { studentId: 10, amount: 500.0, status: 'payé', method: 'virement' },
    ],
  });
  console.log('Paiements ajoutés avec succès');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
