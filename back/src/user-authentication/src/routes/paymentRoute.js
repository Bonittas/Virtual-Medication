const express = require("express")
const router = express.Router();
const { initializePayment, verifyPayment } = require('../controllers/paymentController')
const authController= require('../controllers/doctors/doctor_auth');
const upload = require('../middlewares/fileUpload')

router.post('/payment/initialize', initializePayment);
router.get('/payment/verify/:tx_ref',verifyPayment)
// router.post('/doctor/signup', upload.array('documents', 10), authController.signup);

module.exports = router;