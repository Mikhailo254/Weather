import pkg from 'pg'; // Підключення PostgreSQL
import config from "./config.js"; // Підключаємо конфігурацію
const { Pool } = pkg;


const pool = new Pool({
    user: config.db.user,
    host: config.db.host,
    database: config.db.dataBaseName,
    password: config.db.password,
    port: config.db.port,
});

export { pool };