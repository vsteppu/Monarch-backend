// config/config.js
import dotenv from 'dotenv';
import mysql from 'mysql2'
dotenv.config();

export default {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'mysql',
    dialectModule: mysql,
  },
};