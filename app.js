import express from "express";
import { config } from "dotenv";
import session from "express-session";
import cors from "cors";

import ErrorMiddleware from "./middlewares/Error.js";

// Importing & Using Routes
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";
import order from "./routes/orderRoutes.js";
import cart from "./routes/cartRoutes.js";

config({
  path: "./config/config.env",
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", cart);
app.use("/api/v1", order);

export default app;

app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);

app.use(ErrorMiddleware);
