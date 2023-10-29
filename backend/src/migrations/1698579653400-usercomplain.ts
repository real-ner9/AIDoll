// UserComplaint Migration
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class Usercomplain1698579653400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_complaint_entity',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'reported_user_id',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'reason',
            type: 'text',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'user_complaint_entity',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['userId'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'user_complaint_entity',
      new TableIndex({ name: 'IDX_USER_COMPLAINT', columnNames: ['user_id'] }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('user_complaint_entity', 'IDX_USER_COMPLAINT');
    await queryRunner.dropTable('user_complaint_entity');
  }
}
