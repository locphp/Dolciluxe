require('dotenv').config()
const express = require('express');
const cors = require('cors')
const apiRoutes = require('./routes');

const connection = require("./database/database")

const app = express()
const port = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(cors());

app.use('/api', apiRoutes);

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
