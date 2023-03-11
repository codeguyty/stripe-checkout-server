const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_KEY);
var cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const YOUR_DOMAIN = "https://bricksite-stripe-checkout.codeguyty.repl.co";

app.post("/create-checkout-session", async (req, res) => {
  console.log("REQUEST", req.body);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        name: req.body.name,
        images: req.body.images,
        description: req.body.desc,
        amount: req.body.price,
        currency: "usd",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });
  res.json({ id: session.id });
});

app.listen(4242, () => console.log("Running on port 4242"));