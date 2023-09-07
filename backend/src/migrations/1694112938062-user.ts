import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1694112938062 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN "lastMessageTimestamp" BIGINT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "lastMessageTimestamp"`,
    );
  }
}
