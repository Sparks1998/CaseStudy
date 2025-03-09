import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { dynamicColumns } from './DynamicColumns';

export class CreateEventsTable1741254149486 implements MigrationInterface {
  tableName = 'events';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      // Extra columns to use add to the table.
      columns: dynamicColumns(
        [
          {
            name: 'event_name',
            type: 'VARCHAR',
            length: '255',
          },
          {
            name: 'event_date',
            type: 'TIMESTAMPTZ',
          },
        ],
        'CREATE_EVENTS_TABLE_PRIMARY_KEY',
      ),
    });
    await queryRunner.createTable(table, true, true, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
