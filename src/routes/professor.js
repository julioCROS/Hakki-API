const express = require('express');
const router = express.Router();
const controller = require('../controllers/professor.js');

router.get('/', controller.get);
router.get('/id/:id', controller.getById);
router.post('/', controller.post);

module.exports = router;