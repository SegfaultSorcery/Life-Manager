import express from 'express' 
import session from 'express-session' 
import rateLimit from 'express-rate-limit'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken'; 
import cors from 'cors';
import morgan from 'morgan';
import DB from './src/db/db.cjs'
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
    max: 3, // limit each IP to 3 requests per 'windowMs'
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
        const username = req.body.username;
        const password = req.body.password;
        const user = await DB.checkCredentials(username, password);
        if(user){
            req.session.user_id = user.id;
            req.session.user = user.password;
            res.json({ success: true});
        }else{
            res.status(401).json({success: false});
        }
    }
    catch(err){
            res.status(500).json({message: "Server Error"});
            console.error(err);
    }
});

app.get('/api/wishlist',isAuthenticated, async (req,res) => {
    try{
        const items = await DB.fetchWishlist(req.session.user_id);
        if(items){
            res.json(items);
        }else{
            res.status(401).json({success: false});
        }
    }
    catch(err){
        res.status(500).json({message: "Server Error"});
        console.error(err);
    }
});
app.patch('/api/wishlist', isAuthenticated, async (req,res) => {
    const action = req.body.action;
    if(action === 'add'){
        const item_name = req.body.item.name;
        const item_price = req.body.item.price;
        const user_id = req.session.user_id;
        const success = await jDB.addItemToWish(user_id, item_name, item_price);
        if(success){
            res.status(200).json({status: 'success', item_id: item_id});
        }else{
            res.status(500).json({message: "Server Error"});
        }

    }else if(action === 'remove'){
        const item_id = req.body.item_id;
        const success = await DB.removeItemFromWishlist(item_id);
        if(success){
            res.status(200).json({status: 'success', item_id: item_id});
        }else{
            res.status(500).json({message: "Server Error"});
        }

    }
})

// Handle all routes by serving the 'index.html' file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
