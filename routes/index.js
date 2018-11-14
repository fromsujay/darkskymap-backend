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

//------------------------------User-----------------------------------//


// User schema

var userSchema = mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    superUser: Boolean,
    favorite: Array
});

// User model
var UserModel = mongoose.model('users', userSchema);

//------------------------------PAGE HOME-----------------------------------//
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dark Sky Map Backend' });
});

//-----Redirige vers la page Sign in-----//
router.get('/', function(req, res, next) {
  res.render('signin');
});

//-----Redirige vers la page Sign up-----//
router.post('/signup', function(req, res, next) {
console.log('body', req.body);
  var newUser = new UserModel ({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    superUser: false
  });

  newUser.save(
    function (error, user) {
      console.log(user);
        res.render('map');
    }
);


});

//-----Redirige vers la page Carte-----//
router.get('/map', function(req, res, next) {


  res.render('Map');
});

module.exports = router;
