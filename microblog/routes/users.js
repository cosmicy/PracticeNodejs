var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/one', function(req, res) {
  res.send('respond with a user one');
});


var users = {
  'byvoid': {
    name: 'carbo',
    website: 'wegweg'
  }
};

router.all('/:username', function(req, res, next) {
  //check if user existed
  if (users[req.params.username]) {
    next();
  } else {
    next(new Error(req.params.username + ' does not exist.'));
  }
});

router.get('/:username', function(req, res) {
  res.send('respond with a username: ' + req.params.username);
});

router.put('/:username', function(req, res) {
  //change user
  res.send('Done');
});

module.exports = router;
