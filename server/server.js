require("dotenv").config();
const path = require("path");
const fs = require("fs");
const express = require("express");
const helmet = require("helmet");
const formidable = require("formidable");
const PORT = process.env.PORT || 3001;
const { initializeApp, applicationDefault, cert } = require("firebase-admin/app");
const { getFirestore, Timestamp, FieldValue } = require("firebase-admin/firestore");

// Firebase Firestore initialize
const serviceAccount = require("./GoogleServiceAccount");
const { exit } = require("process");

initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();

// stripe settings
const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const app = express();
app.use(
  helmet({
    hidePoweredBy: true,
  })
);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", async (req, res) => {
  res.json({ message: "Hello from Afif Dev! https://github.com/afif-dev" });
});

// Get stripe checkout sessions - (ex: id = cs_test_a1wOfPCC070C32lscshjEY5GcXajk0MkAoMBQXBa3Ug7FpyyikSbJbEi3X)
app.get("/stripe/sessions/:id", async (req, res) => {
  let id = req.params.id;
  const session = await stripe.checkout.sessions.retrieve(id);
  res.json(session);
});

// Set stripe checkout sessions to expire
app.get("/stripe/sessions/expire/:id", async (req, res) => {
  let id = req.params.id;
  const session = await stripe.checkout.sessions.expire(id);
  res.json(session);
});

// Stripe Create a Session - https://stripe.com/docs/api/checkout/sessions/create
app.post("/stripe/create-checkout-session", async (req, res, next) => {
  const form = formidable({});
  const expires_hours = process.env.STRIPE_EXPIRES_HOURS ?? 1;
  const expires_time = Math.floor(new Date().setHours(new Date().getHours() + parseInt(expires_hours)) / 1000);

  form.parse(req, async (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    // set payment mode
    let { mode, amount, interval } = fields;
    if (!mode || mode != "subscription") {
      mode = "payment";
    }
    // convert amount to stripe unit_amount
    if (amount) {
      if (amount.includes(".")) {
        amount = amount.replace(".", "");
      } else {
        amount = amount.concat("00");
      }
    }

    let recurring_data = {};
    let line_items_data = [
      {
        price_data: {
          currency: process.env.CURRENCY_ISO,
          product_data: {
            name: process.env.STRIPE_PRODUCT_NAME,
            description: process.env.STRIPE_PRODUCT_DESC,
          },
          unit_amount: amount,
          // set recurring payment
          // recurring: {
          //   interval: "month", // Either day, week, month or year.
          //   interval_count: 1,
          // },
        },
        quantity: 1,
      },
    ];

    // set recurring data
    if (mode == "subscription") {
      recurring_data.interval = interval;
      recurring_data.interval_count = 1;
      line_items_data[0].price_data.recurring = recurring_data;
    }
    // set image data
    if (process.env.STRIPE_PRODUCT_IMAGE) {
      line_items_data[0].price_data.product_data.images = [process.env.STRIPE_PRODUCT_IMAGE];
    }

    const session = await stripe.checkout.sessions.create({
      line_items: line_items_data,
      mode: mode, // mode: "subscription" or "payment"
      // client_reference_id: "cart_id-1234", // A unique string to reference the Checkout Session (customer ID, a cart ID, or similar)
      // customer_email: "stripe-test@gmail.com", // set default email
      // metadata: { order_id: "6735" }, // additional information of object
      expires_at: expires_time,
      success_url: `${process.env.STRIPE_SUCCESS_URL}`,
      cancel_url: `${process.env.STRIPE_CANCEL_URL}`,
    });

    // add to firestore
    const db_res = await db
      .collection("payments")
      .doc(session.id)
      .set({
        provider: "stripe",
        checkout_session: {
          id: session.id,
          currency: session.currency,
          amount_total: session.amount_total,
          mode: session.mode,
          payment_status: session.payment_status,
          expires_at: expires_time,
        },
        status: session.status,
        date_update: FieldValue.serverTimestamp(),
        timestamp: FieldValue.serverTimestamp(),
      });

    // res.redirect(303, session.url);
    res.send(session.url);
  });
});

// Webhook - https://stripe.com/docs/webhooks/quickstart
app.post("/stripe/webhook", express.raw({ type: "application/json" }), async (request, response) => {
  let payment_file = "payment_log.txt";
  let event = request.body;

  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(request.body, signature, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    case "charge.failed":
      const chargeFailed = event.data.object;
      // Then define and call a function to handle the event charge.failed
      fs.appendFile(payment_file, JSON.stringify(chargeFailed) + "\n\n", function (err) {
        if (err) throw err;
        console.log("charge.failed!");
      });
      break;
    case "charge.pending":
      const chargePending = event.data.object;
      // Then define and call a function to handle the event charge.pending
      fs.appendFile(payment_file, JSON.stringify(chargePending) + "\n\n", function (err) {
        if (err) throw err;
        console.log("charge.pending!");
      });
      break;
    case "payment_intent.processing":
      const paymentIntentProcess = event.data.object;
      // Then define and call a function to handle the event payment_intent.processing
      fs.appendFile(payment_file, JSON.stringify(paymentIntentProcess) + "\n\n", function (err) {
        if (err) throw err;
        console.log("payment_intent.processing!");
      });
      break;
    case "charge.succeeded":
      const chargeSucceeded = event.data.object;
      // Then define and call a function to handle the event charge.succeeded
      fs.appendFile(payment_file, JSON.stringify(chargeSucceeded) + "\n\n", function (err) {
        if (err) throw err;
        console.log("charge.succeeded!");
      });
      break;
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      fs.appendFile(payment_file, JSON.stringify(paymentIntent) + "\n\n", function (err) {
        if (err) throw err;
        console.log("payment_intent.succeeded!");
      });
      break;
    case "checkout.session.completed":
      const session = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      // Update into firestore
      const paymentsRef = db.collection("payments").doc(session.id);
      await paymentsRef.update({
        "checkout_session.payment_status": session.payment_status,
        status: session.status,
        date_update: FieldValue.serverTimestamp(),
        customer_details: {
          email: session.customer_details.email,
          name: session.customer_details.name,
        },
      });

      fs.appendFile(payment_file, JSON.stringify(session) + "\n\n", function (err) {
        if (err) throw err;
        console.log("checkout.session.completed!");
      });
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
