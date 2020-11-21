const express = require('express');
const router = express.Router();
const { getPatientsDetails } = require('../controllers/patientsControllers');
const { PatientId } = require('../controllers/patientsControllers');

router.get('/patients', getPatientsDetails);
router.get('/patients/Id', PatientId);

module.exports = router;
