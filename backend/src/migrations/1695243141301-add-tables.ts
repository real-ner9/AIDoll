import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTables1695243141301 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Удалить столбцы likes и dislikes из таблицы User
    await queryRunner.dropColumn('user', 'likes');
    await queryRunner.dropColumn('user', 'dislikes');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
