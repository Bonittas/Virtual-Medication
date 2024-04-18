const express = require('express');
const router = express.Router();
const authController= require('../controllers/admin_auth');
const { verifyToken } = require('../controllers/admin_auth');


router.post('/admin/signin', authController.signin);
router.post('/admin/signout', authController.logout);
router.post('/admin/signup', authController.signup);

router.get('/currentUser',  authController.getCurrentUser);
module.exports = router;

