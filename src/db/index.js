const { Pool } = require('pg');


class Database {
  constructor(config, service = '') {
    this.client = new Pool(config);
    this.service = service;
  }

  async _connect() {
    await this.client.connect();
    console.log(`Connected to Database ${this.service}...`);
    return;
  }

  async _beginTran() {
    await this.client.query('BEGIN');
  }

  async _commit() {
    await this.client.query('COMMIT');
  }

  async _rollback() {
    await this.client.query('ROLLBACK');
  }

  async _end() {
    await this.client.end();
    console.log(`Disconnect from Database ${this.service}...`);
  }
}

module.exports = Database;
