require("dotenv").config();


const request = require('request');
const Payment = require('../models/Payment');

const SECRET_KEY = process.env.CHASECK;

exports.initializePayment = async (req, res) => {
  const { amount, currency, tx_ref, ...patientData } = req.body;

  // Save the payment as pending
  const payment = new Payment({
    ...patientData,
    amount,
    currency,
    tx_ref,
    status: 'pending',
  });

  try {
    await payment.save();
  } catch (error) {
    console.error("Error saving payment:", error);
    return res.status(500).send("Internal Server Error");
  }

  const options = {
    method: "POST",
    url: "https://api.chapa.co/v1/transaction/initialize",
    headers: {
      Authorization: `Bearer ${SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  };

  request(options, async (error, response, body) => {
    if (error) {
      console.error("Error initializing payment:", error);
      return res.status(500).send("Internal Server Error");
    }

    if (response.statusCode !== 200) {
      console.error("Unexpected response status:", response.statusCode, body);
      return res.status(response.statusCode).send(body);
    }

    const responseBody = JSON.parse(body);

    if (responseBody.status === "success") {
      // Update payment status to successful when the payment is done
      try {
        await Payment.updateOne(
          { tx_ref },
          { status: 'successful' }
        );
      } catch (updateError) {
        console.error("Error updating payment status:", updateError);
      }
    }
    res.status(200).send(body);
  });
};

exports.verifyPayment = (req, res) => {
  const { tx_ref } = req.params;
  const options = {
    method: "GET",
    url: `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
    headers: {
      Authorization: `Bearer ${SECRET_KEY}`,
    },
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error('Error in verifyPayment:', error);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).send(body);
  });
};
