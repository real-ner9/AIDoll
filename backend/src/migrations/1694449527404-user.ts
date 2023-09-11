import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1694449527404 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD COLUMN "likes" text[]`);
    await queryRunner.query(`ALTER TABLE "user" ADD COLUMN "dislikes" text[]`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "likes"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "dislikes"`);
  }
}
