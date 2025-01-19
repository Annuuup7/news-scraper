const mysql = require('mysql2/promise');
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = require('../config');

async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  });
  return connection;
}

async function storeStories(connection, stories) {
  const sql = 'INSERT IGNORE INTO stories (title, url) VALUES ?';
  await connection.query(sql, [stories.map(story => [story.title, story.url])]);
}

async function getRecentStoriesCount(connection) {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const sql = 'SELECT COUNT(*) FROM stories WHERE created_at > ?';
  const [rows] = await connection.query(sql, [fiveMinutesAgo]);
  return rows[0]['COUNT(*)'];
}

module.exports = { connectToDatabase, storeStories, getRecentStoriesCount };