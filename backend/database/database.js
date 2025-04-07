const mongoose = require('mongoose');
const dbConfig = require('../configs/db.config');

const connection = async () => {
    const dbState = [
        { value: 0, label: "Disconnected" },
        { value: 1, label: "Connected" },
        { value: 2, label: "Connecting" },
        { value: 3, label: "Disconnecting" }
    ];

    try {
        await mongoose.connect(dbConfig.uri /*, dbConfig.options*/);
        const state = Number(mongoose.connection.readyState);
        console.log(dbState.find(f => f.value === state).label, "to database");
    } catch (error) {
        console.log(">>> Error connection DB: ", error);
    }
};

module.exports = connection;
