require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./router/auth-router");
const productRouter = require("./router/product-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  Credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/data", productRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;

connectDb().then(()=>{
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
})


