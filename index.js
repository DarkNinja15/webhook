const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
}
);

// stripe webhook
app.post('/webhook', (req, res) => {
    let event;

    console.log(req.body);
    
    try {
        event = req.body;
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent was successful!');
        break;
        case 'payment_method.attached':
        const paymentMethod = event.data.object;
        console.log('PaymentMethod was attached to a Customer!');
        break;
        // ... handle other event types
        default:
        console.log(`Unhandled event type ${event.type}`);
    }
    
    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
    });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
