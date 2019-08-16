const pg = require('pg');

const Pool = pg.Pool; 


const pool = new Pool({
    database: 'todolist',
    host: 'localhost', 
    port: 5432, 
    max: 10, 
    idleTimeoutMillis: 10000 
});

module.exports = pool;