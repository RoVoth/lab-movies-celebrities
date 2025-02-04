// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});
router.post("/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      res.render("celebrities/new-celebrity.hbs");
    });
});
router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((allCele) => {
      res.render("celebrities/celebrities.hbs", { allCele });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
