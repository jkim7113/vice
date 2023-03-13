const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'vice',
    charset: 'utf8mb4',
    dateStrings: 'TIMESTAMP',
});
 
const itemImgStorage = multer.diskStorage({
    destination: "./public/images/items/",
    filename: (req, file, cb) => {
        const randomString = Math.random().toString(36).slice(2);
        cb(null, `${Date.now()}--${randomString}`);
    }
});
const itemImgUpload = multer({
    storage: itemImgStorage,
    limits: { fileSize: 1000*1000 }, //1MB
    fileFilter: (req, file, cb) => {
        const validTypes = /jpeg|jpg|png|gif|svg|webp/;
        const extName = validTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = validTypes.test(file.mimetype);

        if (extName && mimeType) return cb(null, true);
        cb("Unsupported file format");
    }   
});

app.use(rateLimit({
    windowMs: 1*30*1000, //30s
    max: 30,
}));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send('HI');
});

app.get('/api/categories/all', (req, res) => {
    db.query("SELECT id, name, price, GROUP_CONCAT(DISTINCT dir ORDER BY image_order ASC SEPARATOR ', ') AS image FROM items LEFT JOIN images ON id = item_id GROUP BY id", 
    (error, result) => {
         if (error) return res.status(500).json({ msg : "Error" });
         const placeholder = [
             {"id":1,"name":"VICE™ Classic Graphic Sweatshirt", "price":4500,"image":"/images/stussy-white.jpg /images/stussy.jpg /images/stussy-white.jpg /images/stussy.jpg"},
             {"id":1,"name":"VICE™ Classic Graphic Sweatshirt", "price":4500,"image":"/images/stussy-white.jpg /images/stussy.jpg"},
             {"id":1,"name":"VICE™ Classic Graphic Sweatshirt", "price":4500,"image":"/images/stussy-white.jpg /images/stussy.jpg"},
             {"id":2,"name":"VICE™ Classic Graphic Hoodie", "price":5500,"image":"/images/stussy-white.jpg"},
             {"id":2,"name":"VICE™ Classic Graphic Hoodie", "price":5500,"image":"/images/stussy-white.jpg"},
             {"id":2,"name":"VICE™ Classic Graphic Hoodie", "price":5500,"image":"/images/stussy-white.jpg"},
         ]
         res.status(200).json(result);
    });
 });

app.get('/api/categories/new-in', (req, res) => {
    db.query("SELECT id, name, price, GROUP_CONCAT(DISTINCT dir ORDER BY image_order ASC SEPARATOR ', ') AS image FROM items LEFT JOIN images ON id = item_id GROUP BY id ORDER BY date DESC LIMIT 0, 10", 
    (error, result) => {
         if (error) return res.status(500).json({ msg : "Error" });
         res.status(200).json(result);
    });
 });

app.get('/api/categories/:category', (req, res) => {
   const { category } = req.params;
   db.query("SELECT id, name, price, GROUP_CONCAT(DISTINCT dir ORDER BY image_order ASC SEPARATOR ', ') AS image FROM items LEFT JOIN images ON id = images.item_id LEFT JOIN categories ON id = categories.item_id WHERE category = ? GROUP BY id", 
   [category],
   (error, result) => {
        if (error) return res.status(500).json({ msg : "Error" });
        if (!result) return res.status(404).json({ msg : "Not Found" });
        res.status(200).json(result);
   });
});

app.get('/api/items/:id', (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(500).json({ msg : "Invalid Param" });

    db.query("SELECT id, name, items.description AS description, price, GROUP_CONCAT(DISTINCT sizes.description ORDER BY size ASC SEPARATOR ', ') AS size_description, GROUP_CONCAT(DISTINCT size_letter ORDER BY size ASC SEPARATOR ', ') AS size, GROUP_CONCAT(DISTINCT category SEPARATOR ', ') AS category, GROUP_CONCAT(DISTINCT dir ORDER BY image_order ASC SEPARATOR ', ') AS image FROM items LEFT JOIN images ON id = images.item_id LEFT JOIN categories ON id = categories.item_id LEFT JOIN sizes ON id = sizes.item_id LEFT JOIN size_letters ON size = size_number WHERE id = ? GROUP BY id",
    [id], 
    (error, result) => {
        if (error) return res.status(500).json({ msg : "Error" });
        if (result.length == 0) return res.status(404).json({ msg : "Not Found" });
        res.status(200).json(result[0]);
    });
});

app.post('/api/items', itemImgUpload.array("image", 10), (req, res) => {
    const { name, description, price, categories, sizes, } = req.body;
    const image = req.files;
    console.log(req.body);
    res.status(200).json({ msg : "hey" });
 });
 

app.listen(4000);