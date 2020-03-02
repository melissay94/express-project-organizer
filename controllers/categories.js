let express = require("express");
let db = require("../models");

let router = express.Router();

router.get("/", (req, res) => {
    db.category.findAll()
        .then(categories => {
            res.render("", { categories: categories });
        }).catch(err => {
            res.status(400).render("main/404");
        });
});

router.get("/:id", (req, res) => {
    db.category.findOne({
        where: { id: req.params.id }
    })
    .then(category => {
        res.render("", { category: category });
    }).catch(err => {
        res.status(400).render("main/404");
    });
})

module.exports = router;