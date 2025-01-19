const { getRecentStoriesCount } = require('./database');

function handleWebSocketConnections(wss, connection) {
  const clients = new Set();

  wss.on('connection', (ws, request) => {
    const protocols = request.headers['sec-websocket-protocol'];
    if (protocols && protocols.includes('your_protocol')) { 
      clients.add(ws);
      ws.send(JSON.stringify({ type: 'count', count: getRecentStoriesCount(connection) }));

      ws.on('close', () => {
        clients.delete(ws);
      });
    } else {
      ws.terminate(); // Reject connection if protocol doesn't match
    }
  });

  return {
    broadcastNewStories: async (stories) => {
      for (const ws of clients) {
        ws.send(JSON.stringify({ type: 'new_stories', stories }));
      }
    }
  };
}

module.exports = { handleWebSocketConnections };
