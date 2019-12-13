const carRouter = require("./carRouter");
const express = require("express");
const app = express();

// app.use(authMiddleware)
app.use("/cars", carRouter);

app.listen(3000, () => {});
