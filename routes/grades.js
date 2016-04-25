'use strict';

var express = require('express');
var router = express.Router();

var Grades = require('../models/grade');

router.get('/', (req, res) => {
  // get grades
  Grades.findAll(function(err, grades) {
    if(err) return res.status(400).send(err);
    res.send(grades);
  });
});

router.post('/', (req, res) => {
  Grades.create(req.body, (err, grades) => {
    if(err) return res.status(400).send(err);
    res.send(grades);
  });
});

router.delete('/', (req, res) => {
  Grades.delete(req.body.id, (err, grades) => {
    if(err) return res.status(400).send(err);
    res.send(grades);
  });
});

router.put('/', (req, res) => {
  Grades.put(req.body, (err, grades) => {
    if(err) return res.status(400).send(err);
    res.send(grades);
  });
});


module.exports = router;
