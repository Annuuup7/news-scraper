const express = require('express');
const WebSocket = require('ws');
const { scrapeHackerNews } = require('./src/scraper');
const { connectToDatabase, storeStories, getRecentStoriesCount } = require('./src/database');
const { handleWebSocketConnections } = require('./src/websocket');

const app = express();
const server = app.listen(3000, () => console.log('Server listening on port 3000'));
const wss = new WebSocket.Server({ server });

async function main() {
  const connection = await connectToDatabase();

  handleWebSocketConnections(wss, connection);

  while (true) {
    const stories = await scrapeHackerNews();
    await storeStories(connection, stories); 

    await new Promise(resolve => setTimeout(resolve, 60 * 1000)); // Scrape every minute
  }
}

main();