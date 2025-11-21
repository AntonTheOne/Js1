var express = require('express');
var router = express.Router();

// /admin
router.get('/', function(req, res) {
  res.render('admin'); // renderar views/admin.ejs
});

module.exports = router;
