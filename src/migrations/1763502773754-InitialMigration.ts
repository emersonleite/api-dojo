import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1763502773754 implements MigrationInterface {
    name = 'InitialMigration1763502773754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_resident" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "email" varchar NOT NULL, "apartment" varchar NOT NULL, "building" varchar NOT NULL, "passwordHash" varchar NOT NULL, "phone" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "active" boolean NOT NULL DEFAULT (0), CONSTRAINT "UQ_593499261b759111bdfbea7d998" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_resident"("id", "name", "email", "apartment", "building", "passwordHash", "phone", "createdAt", "updatedAt") SELECT "id", "name", "email", "apartment", "building", "passwordHash", "phone", "createdAt", "updatedAt" FROM "resident"`);
        await queryRunner.query(`DROP TABLE "resident"`);
        await queryRunner.query(`ALTER TABLE "temporary_resident" RENAME TO "resident"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resident" RENAME TO "temporary_resident"`);
        await queryRunner.query(`CREATE TABLE "resident" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "email" varchar NOT NULL, "apartment" varchar NOT NULL, "building" varchar NOT NULL, "passwordHash" varchar NOT NULL, "phone" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_593499261b759111bdfbea7d998" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "resident"("id", "name", "email", "apartment", "building", "passwordHash", "phone", "createdAt", "updatedAt") SELECT "id", "name", "email", "apartment", "building", "passwordHash", "phone", "createdAt", "updatedAt" FROM "temporary_resident"`);
        await queryRunner.query(`DROP TABLE "temporary_resident"`);
    }

}
