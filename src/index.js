/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db';
import route from './router';
import viewRouter from '../frontend/routes';
import path from 'path';


dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use("/api", route);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(
    express.static("views", {
        extensions: ["html"],
    })
);
app.use(
  cors({
    origin: '*',
  }),
);

app.use("/", viewRouter);
// app.get('/', (req, res) => {
//   res.status(200).json({
//     code: 200,
//     status: 'Success',
//     message: 'Welcome to Scheduler',
//   });
// });

app.use(route);

// ERROR HANDLING
app.use((req, res) => {
  res.status(404).json({
    status: 'Not Found',
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).json({
    status: 'Failed',
    message: err.message,

  });
});

db.connect()
  .then((obj) => {
    app.listen(process.env.PORT , () => {
      obj.done();
      console.log(`Starting on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

export default app;
