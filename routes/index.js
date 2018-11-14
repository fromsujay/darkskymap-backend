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
  res.render('index', { title: 'Dark Sky Map Backend' });
});


//------------------------------PAGE HOME-----------------------------------//

//-----Redirige vers la page Sign in-----//
router.get('/', function(req, res, next) {
  res.render('signin');
});

//-----Redirige vers la page Sign up-----//
router.get('/', function(req, res, next) {
  res.render('signup');
});

//-----Redirige vers la page Carte-----//
router.get('/', function(req, res, next) {
  res.render('Map');
});


//------------------------------PAGE CARTE-----------------------------------//

//-----Redirige vers la page Home en cliquant sur Dark Sky Map-----//
router.get('/carte', function(req, res, next) {
  res.render('index');
});

//-----Redirige vers la page Home en cliquant sur bouton Home-----//
router.get('/carte', function(req, res, next) {
  res.render('index');
});

//-----Redirige vers la page Favoris-----//
router.get('/carte', function(req, res, next) {
  res.render('Favoris');
});


//------------------------------PAGE DESCRIPTION-----------------------------//

//-----Redirige vers la page Details-----//
router.get('/carte', function(req, res, next) {
  res.render('Details');
});

//-----Redirige vers la page Carte-----//
router.get('/carte', function(req, res, next) {
  res.render('Carte');
});

//-----Renvoie des informations sur la page Favoris-----//
router.get('/carte', function(req, res, next) {
  res.render('Details');
});

//------------------------------PAGE DETAILS---------------------------------//

//------------------------------PAGE SIGN IN---------------------------------//

//------------------------------PAGE SIGN UP---------------------------------//

//------------------------------PAGE FAVORIS---------------------------------//

module.exports = router;
