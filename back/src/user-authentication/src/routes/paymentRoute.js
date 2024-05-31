const express = require("express")
const router = express.Router();
const { initializePayment, verifyPayment } = require('../controllers/paymentController')

router.post('/payment/initialize', initializePayment);
router.get('/payment/verify/:tx_ref',verifyPayment)

module.exports = router;