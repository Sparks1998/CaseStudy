import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { dynamicColumns } from './DynamicColumns';

export class CreateUserTable1741252007592 implements MigrationInterface {
  tableName = 'users';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      // Extra columns to use add to the table.
      columns: dynamicColumns(
        [
          {
            name: 'first_name',
            type: 'VARCHAR',
            length: '255',
          },
          {
            name: 'last_name',
            type: 'VARCHAR',
            length: '255',
          },
          {
            name: 'email',
            type: 'VARCHAR',
            length: '255',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'VARCHAR',
            length: '255',
          },
        ],
        'USERS_PRIMARY_KEY',
      ),
    });
    await queryRunner.createTable(table, true, true, true);

    await queryRunner.query(
      `INSERT INTO users (first_name, last_name, email, password)
       VALUES ('Test', 'User', 'test@example.com', 'test123')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
