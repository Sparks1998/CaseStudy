import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

/**
 * Generates a dynamic set of columns for TypeORM schema definitions.
 * Adds primary key, created_at, and updated_at columns automatically.
 * @param {TableColumnOptions[]} columns - Additional columns to include in the schema.
 * @param {string} [primaryKeyConstraintName] - Optional custom name for the primary key constraint.
 * @returns {TableColumnOptions[]} The complete array of table column definitions.
 */
export const dynamicColumns = (
  columns: TableColumnOptions[],
  primaryKeyConstraintName?: string,
): TableColumnOptions[] => [
  {
    name: 'id',
    type: 'SERIAL',
    isPrimary: true,
    primaryKeyConstraintName: primaryKeyConstraintName,
  },
  ...columns,
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
];
