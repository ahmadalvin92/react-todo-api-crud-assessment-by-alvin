import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

export const koneksiDatabase = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'todo_harian',
  waitForConnections: true,
  connectionLimit: 10,
});
