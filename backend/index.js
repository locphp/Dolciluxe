require('dotenv').config()
const express = require('express');
const cors = require('cors')
const apiRoutes = require('./routes');
const connection = require("./database/database")
const cookieParser = require("cookie-parser")

const app = express()
const port = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config cookie-parser
app.use(cookieParser())

app.use(cors());

app.use('/api', apiRoutes);

// Handle 404
app.use((req, res, next) => {
    res.status(404).json({ message: "API not found" });
});

// Global Error Handling
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection:", reason);
});

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
