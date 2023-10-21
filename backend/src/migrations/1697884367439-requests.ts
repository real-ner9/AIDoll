import { MigrationInterface, QueryRunner } from 'typeorm';

export class Requests1697884367439 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Создание таблицы ChatRequest
    await queryRunner.query(`
      CREATE TABLE "chat_request" (
        "id" SERIAL PRIMARY KEY,
        "sender_id" text NOT NULL,
        "receiver_id" text NOT NULL,
        "requestedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "FK_sender_id" FOREIGN KEY ("sender_id") REFERENCES "user"("userId"),
        CONSTRAINT "FK_receiver_id" FOREIGN KEY ("receiver_id") REFERENCES "user"("userId")
      )
    `);

    // Дополнительно, если нужно удостовериться, что комбинация sender_id и receiver_id уникальна, можно добавить:
    await queryRunner.query(`
      ALTER TABLE "chat_request" ADD CONSTRAINT "UQ_sender_receiver" UNIQUE ("sender_id", "receiver_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удаление таблицы ChatRequest
    await queryRunner.query(`DROP TABLE "chat_request"`);
  }
}
