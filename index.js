require("dotenv").config();
const cors = require("cors");
const express = require("express");
const paginate = require("express-paginate");
const passport = require("passport");
const { connect } = require("mongoose");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(paginate.middleware(process.env.LIMIT, process.env.MAX_LIMIT));

const runApp = async () => {
    try {
        await connect(process.env.MONGO_DB);
        console.log(`Successfully connected to database MONGODB`);
        app.listen(process.env.PORT, () => {
            console.log(`Server started successfully on PORT ${process.env.PORT}`)
        });
    } catch (err) {
        console.log(err);
        runApp();
    }
};

runApp();