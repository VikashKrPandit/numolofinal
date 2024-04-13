const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Numolo@12345',
  database: 'numolo',
});

export default connection;
