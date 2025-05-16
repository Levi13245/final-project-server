const express = require('express');
const router = express.Router();  // This is the critical missing line
const { Student, Campus } = require('../database/models');
const ash = require('express-async-handler');

/* GET ALL STUDENTS */
router.get('/', ash(async(req, res) => {
  let students = await Student.findAll({include: [Campus]});
  res.status(200).json(students);
}));

/* GET STUDENT BY ID */
router.get('/:id', ash(async(req, res) => {
  let student = await Student.findByPk(req.params.id, {include: [Campus]});
  res.status(200).json(student);
}));

/* ADD NEW STUDENT */
router.post('/', function(req, res, next) {
  Student.create(req.body)
    .then(createdStudent => res.status(200).json(createdStudent))
    .catch(err => next(err));
});

/* DELETE STUDENT */
router.delete('/:id', function(req, res, next) {
  Student.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(200).json("Deleted a student!"))
    .catch(err => next(err));
});

/* EDIT STUDENT */
router.put('/:id', ash(async(req, res) => {
  await Student.update(req.body, {
    where: {id: req.params.id}
  });
  let student = await Student.findByPk(req.params.id, {include: [Campus]});
  res.status(200).json(student);
}));

module.exports = router;