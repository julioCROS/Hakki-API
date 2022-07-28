const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send(    {
      titulo: "Hakki - API",
      versao: "1.0.0",
      message: "Baixe já a extensão para o Chrome."
    });
});

module.exports = router;