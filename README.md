# Hacker News Real-time Story Scraper

This Node.js service scrapes real-time stories from Hacker News, stores them in a MySQL database, and broadcasts updates to connected clients via WebSockets.

**Features:**

- **Real-time Updates:** Receives and broadcasts new stories from Hacker News in real-time using WebSockets.
- **Data Persistence:** Stores scraped stories in a MySQL database for future reference.
- **Initial Connection Count:** Sends the number of stories published in the last 5 minutes to clients upon initial connection.

**Installation:**

1. **Clone the repository:**
   ```bash
   git clone <repository_url>

2. **Install dependencies:**

   **express:**
   Description: A minimalist and flexible Node.js web application framework.
   Purpose: Used to create the HTTP server that will host the WebSocket server.

   **ws:**
   Description: A simple to use WebSocket library for Node.js.
   Purpose: Facilitates real-time, bidirectional communication between the server and clients over a single TCP connection. Enables the server to broadcast new stories to connected clients.
   
   **mysql2:**
   Description: A modern and efficient MySQL driver for Node.js with Promise support.
   Purpose: Enables interaction with the MySQL database for storing scraped stories.

   **request:**
   Description: A simple HTTP request library for Node.js.
   Purpose: Used to fetch the HTML content of the Hacker News website. (Note: You can also use node-fetch as an alternative to request.)

   **cheerio:**
   Description: A fast, flexible, and implementation-agnostic jQuery-like library for traversing and manipulating DOM-like structures.
   Purpose: Used to parse the HTML content of the Hacker News page and extract the relevant information (story titles and URLs).

   
3.**Create MySQL Database:** Create a MySQL database named hacker_news.
Create Stories Table: Create a table named stories in the database with the following schema:
CREATE TABLE stories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

4.**Running the Server:**
Start the server: node index.js
Once the server is up and running you will see this in the console : Server listening on port : 3000

5.**Connecting to the WebSocket Server:**
Use a WebSocket client (e.g., browser console, a dedicated WebSocket client tool) to connect to ws://localhost:3000.
Upon successful connection, the client will receive the number of stories published in the last 5 minutes.
The client will then receive real-time updates for new stories.
