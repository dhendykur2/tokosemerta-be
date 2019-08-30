const Database = require('./index');
const conf = require('./config');

class Db extends Database {
  constructor() {
    super(conf, 'Tokosermata');
    this._connect();
  }
}

module.exports = Db;
