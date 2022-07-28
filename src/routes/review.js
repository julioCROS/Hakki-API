const express = require('express');
const router = express.Router();
const controller = require('../controllers/review.js');

router.get('/:id', controller.getByProfessor);
router.post('/', controller.post);

module.exports = router;