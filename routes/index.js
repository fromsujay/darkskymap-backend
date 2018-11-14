var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var options = { server: { socketOptions: {connectTimeoutMS: 5000 } }};
mongoose.connect('mongodb://admin:paris02@ds163103.mlab.com:63103/darkskymap',
    options,
    function(err) {
     console.log(err);
    }
);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
