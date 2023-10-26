import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveImageUrls1698326881009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE "user" SET "photoUrl" = null
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Это обратная миграция, но мы не можем вернуть удаленные фотографии
    // Поэтому оставляем ее пустой
  }
}
