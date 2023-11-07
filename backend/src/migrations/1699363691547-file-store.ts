import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class FileStore1699363691547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'file_store',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'varchar',
            length: '500',
            isNullable: false,
          },
          {
            name: 'fileHash',
            type: 'varchar',
            length: '500',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'status',
            type: 'varchar',
            length: '255',
            isNullable: false,
            default: "'initial'",
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('file_store');
  }
}
