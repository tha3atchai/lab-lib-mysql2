require("dotenv").config();
const express = require("express");
const app = express();
const notFound = require("./middleware/notFound");
const errorMiddleWare = require("./middleware/errorMiddleWare");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

app.use(express.json());
// app.use(express.urlencoded({extended: false}));

app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

app.use(notFound);
app.use(errorMiddleWare);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("Server start on port", port));

