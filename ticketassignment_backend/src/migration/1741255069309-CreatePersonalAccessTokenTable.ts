import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePersonalAccessTokenTable1741255069309
  implements MigrationInterface
{
  tableName = 'personal_access_token';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      // Extra columns to use add to the table.
      columns: [
        {
          name: 'id',
          type: 'VARCHAR',
          length: '255',
          isPrimary: true,
          primaryKeyConstraintName:
            'CREATE_PERSONAL_ACCESS_TOKEN_TABLE_PRIMARY_KEY',
        },
        {
          name: 'user_id',
          type: 'INTEGER',
        },
        {
          name: 'token',
          type: 'TEXT',
        },
        {
          name: 'remember_token',
          type: 'BOOLEAN',
          default: false,
        },
        {
          name: 'token_change_count',
          type: 'INTEGER',
          default: 3,
        },
        {
          name: 'created_at',
          type: 'TIMESTAMPTZ',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updated_at',
          type: 'TIMESTAMPTZ',
          default: 'CURRENT_TIMESTAMP',
        },
      ],
      foreignKeys: [
        {
          name: 'FK_USER_PERSONAL_ACCESS_TOKEN',
          columnNames: ['user_id'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ],
    });
    await queryRunner.createTable(table, true, true, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
