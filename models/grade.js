'use strict';

var db = require('../config/db');
var uuid = require('uuid');

db.run('CREATE TABLE IF NOT EXISTS grades (name TEXT, score INTEGER, total INTEGER, letter TEXT, id TEXT)');


exports.findAll = function(cb) {
  db.all('SELECT * FROM grades', function(err, grades) {
    cb(err, grades);
  });
};

exports.create = function(grade, cb) {
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO grades VALUES (?, ?, ?, ?, ?)");
    stmt.run(grade.name, grade.score, grade.total, grade.letter, uuid());
    stmt.finalize(cb);
  });
};

exports.delete = function(id, cb) {
  db.run(`DELETE FROM grades WHERE id = '${id}'`, function(err, grades) {
    cb(err, grades);
  });
};

exports.put = function(update, cb) {
  console.log(update);
  db.run(`UPDATE grades SET name = '${update.name}', score = '${update.score}', total = '${update.total}', letter = '${update.letter}' WHERE id = '${update.id}'`, function(err, grade) {
    cb(err, grade);
  });
};
