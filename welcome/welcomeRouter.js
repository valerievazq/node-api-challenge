const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: `Welcome ${process.env.COHORT}`,
    quote: process.env.QUOTE_OF_THE_DAY || "Be good, or be good at it",
  });
});

module.exports = router;
