const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");




const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OPXvlJGSH5WiRcg5rJFoBcyN3G0ou9QDbe6VNQUQMq0iYqp48Hms0mCaqmyiGG64Ryq1ICsc3OQh9Xb0q4WEK6a004xqwyWnT"
);
const app = express();

// const corsOption = {
//   origin: ["http://localhost:3000"],
// };
// app.use(cors(corsOption));

// middlewares
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("Hello World"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("payment request recieved for this amount >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// Listen Command
// exports.api = functions.https.onRequest(app);
const port =5000
app.listen(port,()=>console.log('listening to',port));
















// const functions = require("firebase-functions");

// const express = require("express");
// const cors = require("cors");
// // const { request, response } = require("express");
// const stripe = require("stripe")(
//   ""
// );

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (request, response) => response.status(200).send("hello world"));
// // app.get("/payments/create", (request, response) =>
// //   response.status(200).send("hello ")
// // );

// app.post("/payments/create", async (request, response) => {
//   const total = request.query.total;
//   console.log("payment Request Recieved for this acunt >>>", total);
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: total,
//     currency: "usd",
//   });
//   response.status(201).send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

// exports.api = functions.https.onRequest(app);
