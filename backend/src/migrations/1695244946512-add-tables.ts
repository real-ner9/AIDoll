import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTables1695244946512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "like" (
                "id" SERIAL NOT NULL,
                "user_id" text NOT NULL,
                "likedUserId" text NOT NULL,
                CONSTRAINT "PK_like_id" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "dislike" (
                "id" SERIAL NOT NULL,
                "user_id" text NOT NULL,
                "dislikedUserId" text NOT NULL,
                CONSTRAINT "PK_dislike_id" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user_liked" (
                "id" SERIAL NOT NULL,
                "user_id" text NOT NULL,
                "likedByUserId" text NOT NULL,
                CONSTRAINT "PK_user_liked_id" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "match" (
                "id" SERIAL NOT NULL,
                "user_id" text NOT NULL,
                "matchedUserId" text NOT NULL,
                CONSTRAINT "PK_match_id" PRIMARY KEY ("id")
            )
        `);

    // Внешние ключи
    await queryRunner.query(`
            ALTER TABLE "like" ADD CONSTRAINT "FK_user_like" FOREIGN KEY ("user_id") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "dislike" ADD CONSTRAINT "FK_user_dislike" FOREIGN KEY ("user_id") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "user_liked" ADD CONSTRAINT "FK_user_liked" FOREIGN KEY ("user_id") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "match" ADD CONSTRAINT "FK_user_match" FOREIGN KEY ("user_id") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "like"`);
    await queryRunner.query(`DROP TABLE "dislike"`);
    await queryRunner.query(`DROP TABLE "user_liked"`);
    await queryRunner.query(`DROP TABLE "match"`);
  }
}
