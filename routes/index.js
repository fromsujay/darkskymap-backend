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

//-----Cherche utilisateur existant-----//
router.post('/signin', function(req, res, next) {

  UserModel.find({
      email: req.body.email,
      password: req.body.password,
      },

    function (err, users) {
        console.log(users);
        res.json(users);
    }
)

});

//-----Save new user-----//
router.post('/signup', function(req, res, next) {
console.log('body', req.body);
  var newUser = new UserModel ({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  newUser.save(
    function (error, user) {
      console.log(user);
        res.render('map');
    }
);


});


//------------------------------LOCATIONS-----------------------------------------//

// Locations schema

var locationsSchema = mongoose.Schema({
observationDate: Date,
latitude: Number,
longtitude: Number,
horizonSudDegage: String,
echelleDeBortle: String,
explicationEchelledeBortle: String,
pictogrammeMeteo: String,
descriptionConditionsMeteo: String,
temperature: String,
conditionsVent: String,
specificiteObseration: String,
compromisUrbain: String,
detailsPresent: String,
valideparSuperutilisateur: String,
transparency: String,
pollutionLumineuse: String,
seeing: String,
skyQualityMeter: String,
accesFacileenVoiture: String,
possibiliteDeStationnement: String,
accesInternet: String,
informationsComplementaires: String
});

// Locations model
var LocationsModel = mongoose.model('locations', locationsSchema);

//-----Add locations-----//
router.post('/addlocation', function(req, res, next) {
  var newULocation = new LocationModel ({

    observationDate: req.body.observationDate,
    latitude: req.body.latitude,
    longtitude: req.body.longtitude,
    horizonSudDegage: req.body.horizonSudDegage,
    echelleDeBortle: req.body.echelleDeBortle,
    explicationEchelledeBortle: req.body.explicationEchelledeBortle,
    pictogrammeMeteo: req.body.pictogrammeMeteo,
    descriptionConditionsMeteo: req.body.descriptionConditionsMeteo,
    temperature: req.body.temperature,
    conditionsVent: req.body.conditionsVent,
    specificiteObseration: req.body.specificiteObseration,
    compromisUrbain: req.body.compromisUrbain,
    detailsPresent: req.body.detailsPresent,
    valideparSuperutilisateur: req.body.valideparSuperutilisateur,
    transparency: req.body.transparency,
    pollutionLumineuse: req.body.pollutionLumineuse,
    seeing: req.body.seeeing,
    skyQualityMeter: req.body.skyQualityMeter,
    accesFacileenVoiture: req.body.accesFacileenVoiture,
    possibiliteDeStationnement: req.body.possibiliteDeStationnement,
    accesInternet: req.body.accesInternet,
    informationsComplementaires: req.body.informationsComplementaires
  });

  newLocation.save(
    function (error, user) {
      console.log(user);
    }
);

});



module.exports = router;
