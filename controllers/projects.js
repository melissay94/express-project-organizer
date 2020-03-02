let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', (req, res) => {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then((project) => {
    db.category.findOrCreate({
      where: { name: req.body.category }
    }).then(([category, created]) => {
      project.addCategory(category).then(category => {
        res.redirect('/')
      }).catch(err => {
        res.send(`Could not add category ${req.body.category} to project ${req.body.name}`, err);
      })
    }).catch(err => {
      res.send(`Could not create or find category ${req.body.category}`, err);
    });
  })
  .catch((error) => {
    console.log(error);
    res.status(400).render('main/404');
  })
})

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id }
  })
  .then((project) => {
    if (!project) throw Error();
    project.getCategories().then(categories => {
      res.render('projects/show', { project: project, categories: categories });
    }).catch(err => {
      console.log("Couldn't get categories");
    });
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

module.exports = router
