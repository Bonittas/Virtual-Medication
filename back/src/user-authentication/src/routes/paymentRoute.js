const express = require("express")
const router = express.Router();
const { initializePayment, verifyPayment } = require('../controllers/paymentController')
const authController= require('../controllers/doctors/doctor_auth');
const upload = require('../middlewares/fileUpload')
const { verifyToken } = require('../controllers/patient_auth');

router.post('/payment/initialize', initializePayment);
router.get('/payment/verify/:tx_ref', verifyPayment)

module.exports = router;