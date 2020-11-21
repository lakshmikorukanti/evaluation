const express = require('express');
const { registerUser, loginUser } = require('../controllers/UserControllers');
const { authMiddleWare } = require('../middleware/middleware');
const { addToData, getData } = require('../controllers/dataControllers');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/addToData', addToData);
router.post('/getData', getData);
router.use(authMiddleWare);

module.exports = router;
