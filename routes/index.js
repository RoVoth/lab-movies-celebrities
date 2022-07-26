const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const celebrityRoutes = require("./celebrities.routes");
router.use("/celebrities/", celebrityRoutes);

const movieRoutes = require("./movies.routes");
router.use("/movies/", movieRoutes);

module.exports = router;
