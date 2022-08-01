const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send(    {
      titulo: "Hakki - API",
      versao: "1.22474487139",
      site: "hakki.vercel.app",
      message: "Extensão já disponível para download 😀"
    });
});

module.exports = router;