import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'applications'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table
        .enum('loan_type', ['personal', 'holidays', 'automobile', 'real-state', 'weeding', 'consolidation', 'other'])
        .notNullable()
      table.decimal('loan_amount', 10, 2).notNullable()
      table.integer('loan_duration').notNullable()
      table.string('employer', 255).notNullable()
      table.string('occupation', 255).notNullable()
      table.decimal('income', 10, 2).notNullable()
      table.text('comments').nullable()
      table.boolean('accept_terms').notNullable()
      table.boolean('accept_conditions').notNullable()
      table.enum('status', ['pending', 'received', 'approved', 'rejected']).defaultTo('pending')
      table.enum('progress', [25, 50, 75, 100]).defaultTo(25)
      table.string('tracking_number', 10).notNullable()
      table.text('notes').nullable()
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
