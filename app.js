const morgan = require("morgan");
const cors = require("cors");
require("dotenv/config");

const express = require("express");
const app = express();

const routes = require("./routes");

// Disable HTTP header x-powered-by for security reasons
app.disable("x-powered-by");

app.use(morgan("tiny"));
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

const PORT = process.env.PORT;
app.listen(PORT, console.info(`       - Server in running on port ${PORT} -`));

module.exports = app;
