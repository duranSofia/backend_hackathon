const express = require("express");
const app = express();
const client = require("./config/db");
const mainRouter = require("./routes");
const errorMiddleware = require("./middleware/error-handling.middleware");
const error = require("http-errors");
const cors = require("cors");

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(mainRouter);

app.use("*", (req, res, next) => {
  next(error(404, "Page not found"));
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});

module.exports = app;
