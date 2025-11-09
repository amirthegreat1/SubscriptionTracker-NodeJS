// imports
import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectDB from "./DATABASE/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import { arcjetMiddleware } from "./middlewares/arcjet.middleware.js";
// initialize express app
const app = express();
// middlewares
// parse json
app.use(express.json());
// parse urlencoded
app.use(express.urlencoded({ extended: true }));
// parse cookie
app.use(cookieParser());
// arcjet middleware
app.use(arcjetMiddleware);
// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
// error middleware
app.use(errorMiddleware);
// start server
app.listen(PORT, async () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  await connectDB();
});
