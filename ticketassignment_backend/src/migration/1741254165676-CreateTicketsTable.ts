import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { dynamicColumns } from './DynamicColumns';

export class CreateTicketsTable1741254165676 implements MigrationInterface {
  tableName = 'tickets';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      // Extra columns to use add to the table.
      columns: dynamicColumns(
        [
          {
            name: 'event_id',
            type: 'INTEGER',
            isUnique: true,
          },
          {
            name: 'quantity',
            type: 'INTEGER',
          },
        ],
        'CREATE_TICKETS_TABLE_PRIMARY_KEY',
      ),
      foreignKeys: [
        {
          name: 'FK_TICKETS_EVENTS',
          columnNames: ['event_id'],
          referencedTableName: 'events',
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
