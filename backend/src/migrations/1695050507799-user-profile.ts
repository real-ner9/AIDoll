import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserProfile1695050507799 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user" ADD COLUMN "age" int NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "user" ADD COLUMN "description" text NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "user" ADD COLUMN "photoUrl" text NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "user" ADD COLUMN "role" text NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "user" ADD COLUMN "isVisibleToOthers" boolean DEFAULT false
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "isVisibleToOthers"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoUrl"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
  }
}
