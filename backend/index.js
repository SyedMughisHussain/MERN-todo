import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDb from "./config/connectDb.js";

import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import todoRoutes from "./routes/todo.routes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/user/", userRoutes);
app.use("/api/v1/category/", categoryRoutes);
app.use("/api/v1/todo/", todoRoutes);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error" + err);
  });
