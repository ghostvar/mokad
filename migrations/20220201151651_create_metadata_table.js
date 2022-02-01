/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('metadata', function (table) {
    table.uuid('id', { useBinaryUuid: true }).primary();
    table.string('userid');
    table.string('funame');
    table.string('status');
    table.text('html').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('metadata');
};
