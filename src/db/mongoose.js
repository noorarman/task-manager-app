const mongoose = require("mongoose");

mongoose // this mongoose returns a promise..
    .connect("mongodb://localhost/Task-Manager-API", {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log("Connected to mongo DB..."))
    .catch(err => console.error("Could not connect to mongoDB...", err));