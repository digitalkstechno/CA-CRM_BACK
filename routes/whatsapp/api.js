const express = require('express');
const router = express.Router();
const {
    getContactByDataFetch,
    getContactByFamilyDataFetch,
    getDocByDataFetch
} = require('../../controllers/whatsappapi/apiController');

router.get('/doclist/:phone/:person', getDocByDataFetch);
router.get('/family/:phone', getContactByFamilyDataFetch);
router.get('/:phone/:person/:doc', getContactByDataFetch);
module.exports = router;