import express from 'express' 
import session from 'express-session' 
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import db from './src/knex.cjs'
import knex from 'knex'
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken'; 
import cors from 'cors';
import morgan from 'morgan';
const knex_config ={
    client: 'sqlite3',
    connection: {
        filename: './db/life-manager-database.db',
    },
    migrations: {
        directory: './db/migrations', 
        tableName: 'knex_migrations',
    },
    seeds: {
        directory: './db/seeds',
    },
    useNullAsDefault: true,
}
const db = knex(knex_config);
const port = process.env.PORT || 3000;
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.post('/login',async (req, res) =>{
    try{
        const user = await db('users')
            .select('*')
            .where('user_name', req.body.username)
            .where('password', req.body.password)
            .first();
        if(user){
            req.session.user = user.user_name;
            res.json({ success: true});
        }else{
            res.status(401).json({ success: false});
        }
    }
    catch(err){
            res.status(500).json({message: "Server Error"});
    }
})
// Handle all routes by serving the 'index.html' file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

