//first.js
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const app = express();
const routes = require("./routes");
const path = require("path");
// const { version } = require("react");

console.log(routes);

app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi : "3.0.0",
        info: {
            title: "To-Do API",
            version: "1.0.0",
            description: "A simple CRUD API for managing a to-do list"
        },
        servers: [{ url: "http://localhost:3000"}]
    },
    apis: [path.join(__dirname, "routes.js")]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/", routes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
    console.log("Swagger docs at http://localhost:3000/api-docs");

});


