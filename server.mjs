import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import express from 'express'
import userRouter from './server/routes/users.js';
import commonRouter from './server/routes/common.js';
import reviewRouter from './server/routes/review.js';
import { errorHandler } from './server/middleware/error.middleware.js';
import mongoose from 'mongoose';
import cors from 'cors'
import { initCronJobs } from './server/corn/index.js';

import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import courseRouter from './server/routes/course.js';
import referalRouter from './server/routes/referal.js';
import PurchaseRouter from './server/routes/purchases.js';
import progressRouter from './server/routes/userProgress.js';
import mcqRouter from './server/routes/mcq.js';
import plannerRouter from './server/routes/planner.js';
dotenv.config({
  path: "./.env.local",
}); // 👈 

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = app.getRequestHandler()
const expressApp = express();

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connectMongoDB();
expressApp.use(cors({ origin: process.env.NEXT_PUBLIC_API_URL, credentials: true }))
expressApp.use(express.json());
expressApp.use(cookieParser());

initCronJobs();

app.prepare().then(() => {

  //routes start from here
  expressApp.use("/api/v1/users", userRouter);
  expressApp.use("/api/v1/common", commonRouter);
  expressApp.use("/api/v1/review", reviewRouter);
  expressApp.use("/api/v1/course", courseRouter);
  expressApp.use("/api/v1/referral", referalRouter);
  expressApp.use("/api/v1/purchase", PurchaseRouter);
  expressApp.use("/api/v1/progress", progressRouter);
  expressApp.use("/api/v1/mcq", mcqRouter);
  expressApp.use("/api/v1/planner", plannerRouter);


  // for next front-end requests
  expressApp.use((req, res) => {
    const parsedUrl = parse(req.url, true)
    handler(req, res, parsedUrl)
  });

  // error handler middleware
  expressApp.use(errorHandler);

  const httpServer = createServer(expressApp);
  // setupSocket(httpServer);


  httpServer.listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV
      }`
    )
  })
})
