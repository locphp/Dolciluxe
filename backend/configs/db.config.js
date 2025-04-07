require('dotenv').config();

const dbConfig = {
    uri: process.env.DB_URI,
    // option tùy chọn nếu có
    // options: {
    //     user: process.env.DB_USER,
    //     pass: process.env.DB_PASSWORD,
    //     dbName: process.env.DB_NAME,
    // }
};

module.exports = dbConfig;
