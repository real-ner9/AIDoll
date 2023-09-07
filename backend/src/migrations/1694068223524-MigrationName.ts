import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationName1694068223524 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_entity" (
                "id" SERIAL NOT NULL,
                "activeRoom" TEXT,
                "pastPartners" TEXT ARRAY,
                "currentPartner" TEXT,
                "lastCleaned" BIGINT,
                "lastSearchTimestamp" BIGINT,
                "lastNotificationTimestamp" BIGINT,
                "userId" TEXT NOT NULL UNIQUE,
                "isBlocked" BOOLEAN NOT NULL DEFAULT false,
                "enableNotification" BOOLEAN NOT NULL DEFAULT true,
                PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_entity"`);
  }
};
