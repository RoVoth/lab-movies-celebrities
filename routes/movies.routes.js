const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((allCele) => {
      res.render("movies/new-movie.hbs", { allCele });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      res.render("movies/new-movie.hbs");
    });
});

router.get("/", (req, res, next) => {
  Movie.find()
    .then((allMov) => {
      res.render("movies/movies.hbs", { allMov });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((aMov) => {
      res.render("movies/movie-details.hbs", { aMov });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id).then((aMov) => {
    Celebrity.find()
      .then((allCele) => {
        res.render("movies/edit-movie.hbs", { aMov, allCele });
      })
      .catch((err) => {
        next(err);
      });
  });
});

router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => {
      res.redirect(`/movies/${id}`);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Movie.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
