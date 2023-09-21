import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class AddTables1695245694575 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Внешние ключи уже были созданы в предыдущей миграции,
    // так что тут добавляем только индексы для обратных связей.
    await queryRunner.createIndex(
      'like',
      new TableIndex({ name: 'IDX_USER_LIKE', columnNames: ['user_id'] }),
    );
    await queryRunner.createIndex(
      'dislike',
      new TableIndex({ name: 'IDX_USER_DISLIKE', columnNames: ['user_id'] }),
    );
    await queryRunner.createIndex(
      'user_liked',
      new TableIndex({ name: 'IDX_USER_USERLIKED', columnNames: ['user_id'] }),
    );
    await queryRunner.createIndex(
      'match',
      new TableIndex({ name: 'IDX_USER_MATCH', columnNames: ['user_id'] }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('like', 'IDX_USER_LIKE');
    await queryRunner.dropIndex('dislike', 'IDX_USER_DISLIKE');
    await queryRunner.dropIndex('user_liked', 'IDX_USER_USERLIKED');
    await queryRunner.dropIndex('match', 'IDX_USER_MATCH');
  }
}
