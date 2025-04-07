const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const apiRoutes = require('../routes/api');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/api', apiRoutes);

// Handle 404
app.use((req, res, next) => {
    res.status(404).json({ message: "API not found" });
});

module.exports = app;
