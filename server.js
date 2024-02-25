import express from 'express' 
import path from 'path';
import knex from './src/knex.cjs'
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken'; 
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());
// app.use(bodyParser);

// Serve static files from the Vue.js build
const distDir = path.join(new URL(import.meta.url).pathname, 'dist');
app.use(express.static(distDir));

// Handle all routes and serve the main index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

// app.post('/login', async (req, res) => {
//     const {username, password} = req.body;
//     const raw = "SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1"
//     try{
//         const user = await knex.raw(raw, [username, password]);
//             if (user) {
//                 } else {
//                 }
//     }
//     catch (error) {
//         console.error('Error during authentication:', error);
//     };
// })

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

