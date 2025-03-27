/*
  Warnings:

  - You are about to drop the column `class` on the `Student` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "enrollmentNo" TEXT,
    "mention" TEXT,
    "parcours" TEXT,
    "anneeScolaire" TEXT,
    "matricule" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Student" ("anneeScolaire", "createdAt", "email", "enrollmentNo", "firstName", "id", "lastName", "matricule", "mention", "parcours", "updatedAt") SELECT "anneeScolaire", "createdAt", "email", "enrollmentNo", "firstName", "id", "lastName", "matricule", "mention", "parcours", "updatedAt" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
CREATE UNIQUE INDEX "Student_enrollmentNo_key" ON "Student"("enrollmentNo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
