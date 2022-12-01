const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/contact-us", (req, res, next) => {
  /* a */
  res.json("All good in here");
})

module.exports = router;
