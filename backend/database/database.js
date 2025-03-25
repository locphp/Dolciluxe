require('dotenv').config();
const mongoose = require('mongoose')

const connection = async () => {
    const dbState = [{
        value: 0,
        label: "Disconnected"
    },
    {
        value: 1,
        label: "Connected"
    },
    {
        value: 2,
        label: "Connecting"
    },
    {
        value: 3,
        label: "Disconnecting"
    }];

    try {
        // const options = {
        //     user: process.env.DB_USER,
        //     pass: process.env.DB_PASSWORD,
        //     dbName: process.env.DB_NAME,
        // }

        await mongoose.connect(process.env.DB_URI /*, options*/);
        const state = Number(mongoose.connection.readyState);
        console.log(dbState.find(f => f.value === state).label, "to database"); // connected to db
    } catch (error) {
        // handleError(error);
        console.log(">>> Error connection DB: ", error)
    }
}

module.exports = connection;