import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InvitationLink1698766705862 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Создаем таблицу InvitationLink
    await queryRunner.createTable(
      new Table({
        name: 'invitation_link',
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
            type: 'text',
            isNullable: false,
          },
          {
            name: 'invitedUserId',
            type: 'text',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'isProfileCompleted',
            type: 'boolean',
            default: false,
          },
          {
            name: 'isUserBlocked',
            type: 'boolean',
            default: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('invitation_link');
  }
}
