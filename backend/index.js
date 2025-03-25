require('dotenv').config()
const express = require('express');
const cors = require('cors')
const productRouter = require('./routes/product.router');

const connection = require("./database/database")

const app = express()
const port = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(cors());

app.use('/api/products', productRouter);

(async () => {
    try {
        await connection();
        app.listen(port, () => {
            console.log(`Backend listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>> Error connect to DB:", error)
    }

})()
