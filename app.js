// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();


//session config
//require('./config/session.config') (app);


// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "new-app";

app.locals.appTitle = `${capitalized(projectName)} created with Sina`;

const myCustomMiddleware = (req, res, next) => {
    console.log(" --> this function will be executed for all requests....");
    next();
    };

    const doSomethingAmazing = (req, res, next) => {
        console.log(" --> I can do this too......");
        next();
    }

    app.use("/", myCustomMiddleware, doSomethingAmazing);


// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);
const recipes = require("./routes/recipes.routes");
app.use("/recipes", recipes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

app.listen(3000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 3000);
})

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
