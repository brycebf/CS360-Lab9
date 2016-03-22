var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

router.get('/comments', function(req, res, next) {
  Comment.find(function(err, comments){
    if(err){ return next(err); }
    res.json(comments);
  });
});

router.get('/comments/:comment', function(req, res) {
  res.json(req.comment);
});

router.post('/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment){
    if(err){ return next(err); }
    res.json(comment);
  });
});

router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error("can't find comment")); }
    req.comment = comment;
    return next();
  });
});


router.put('/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});

router.delete('/comments/:comment/remove', function(req, res, next) {
  console.log("DELETE comment route");
  console.log(req.comment);
  Comment.remove(req.comment, function(err, results) {
    if(err) {
      return console.error(err); //If there's an error, print it out
    }
    else {
      //console.log(results);
      res.sendStatus(200);
    }
  })
});

module.exports = router;

// I'm at step 19 of the tutorials! http://bioresearch.byu.edu/cs260/express/angularhints.html
