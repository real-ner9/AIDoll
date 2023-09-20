import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserState1695044042976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user" ADD COLUMN "state" text DEFAULT 'QUICK_SEARCH'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "state"`);
  }
}
