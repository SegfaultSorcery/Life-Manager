import express from 'express' 
import session from 'express-session' 
import rateLimit from 'express-rate-limit'
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
        directory: './db/seeds'
    },
    useNullAsDefault: true,
}
const db = knex(knex_config);
const port = process.env.PORT || 3000;
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(morgan('combined'));
app.use(bodyParser.json())
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // limit each IP to 3 requests per windowMs
    message: 'Too many login attempts, please try again later',
});
app.use(bodyParser.urlencoded({ extended: true }));

function isAuthenticated(req, res, next) {
    if (req.session && req.session.user_id) {
        next();
    } else {
        res.status(401);
    }
}

app.post('/login', async (req, res) =>{
    try{
        const user = await db('users')
            .select('*')
            .where('username', req.body.username)
            .where('password', req.body.password)
            .first();
        if(user){
            req.session.user_id = user.id;
            req.session.user = user.username;
            res.json({ success: true});
        }else{
            res.status(401).json({success: false});
        }
    }
    catch(err){
            res.status(500).json({message: "Server Error"});
    }
});

app.get('/api/wishlist',isAuthenticated, async (req,res) => {
    try{
        const items = await db('items')
            .select('*')
            .from('wishlist')
            .join('items', 'wishlist.item_id', 'items.id')
            .where('user_id', req.session.user_id)
        if(items){
            res.json(items);
        }else{
            res.status(401).json({success: false});
        }
    }
    catch(err){
            res.status(500).json({message: "Server Error"});
    }
});
app.patch('/api/wishlist', isAuthenticated, async (req,res) => {
    const action = req.body.action;
    if(action === 'add'){
        try{
            db('items').insert(req.new_item);
            db('wishlist').insert(req.new_item.id);
            res.status(200).send();
        }
        catch(err){
            console.error(err);
            res.status(500).json({message: "Server Error"});
        }
    }else if(action === 'remove'){
        const item_id = req.body.item_id;
        try{
            db('wishlist')
            .where('id', item_id)
            .del()
            .then(numDeletedRows =>
                res.status(200).json({status: "success"})
            );
        }
        catch(err){
            console.error(err);
        }

    }else{
        res.status(500).json({status: "error"});
    }

})

// Handle all routes by serving the 'index.html' file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

