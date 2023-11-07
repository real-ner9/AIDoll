// AddDateOfBirthToUser migration
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Dateofbirth1699388605213 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user" ADD COLUMN "dateOfBirth" TIMESTAMP DEFAULT null
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "dateOfBirth"`);
  }
}
