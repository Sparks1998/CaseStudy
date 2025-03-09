import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { dynamicColumns } from './DynamicColumns';

export class CreateOrdersTable1741254182636 implements MigrationInterface {
  tableName = 'orders';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      // Extra columns to use add to the table.
      columns: dynamicColumns(
        [
          {
            name: 'user_id',
            type: 'INTEGER',
          },
          {
            name: 'ticket_id',
            type: 'INTEGER',
          },
          {
            name: 'purchased_amount',
            type: 'INTEGER',
          },
        ],
        'CREATE_ORDERS_TABLE_PRIMARY_KEY',
      ),
      foreignKeys: [
        {
          name: 'FK_ORDER_TICKETS',
          columnNames: ['ticket_id'],
          referencedTableName: 'tickets',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        {
          name: 'FK_ORDER_USER',
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
