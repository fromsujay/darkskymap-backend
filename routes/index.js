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
    superUser: false
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
observationDate: String,
latitude: Number,
longtitude: Number,
isSouthernHorizonClear: String,
bortleScale: String,
explanationOfBortleScale: String,
observationCategory: String,
urbanCompromise: Boolean,
existenceOfDetails: String,
approuvedBySuperuser: Boolean,
transparency: String,
lightPollution: String,
seeing: String,
skyQualityMeter: String,
easeOfAccessibilityByCar: Boolean,
parkingAvailability: Boolean,
powerSupplyAvailability: Boolean,
additionalInformation: String
});

// Locations model
var LocationsModel = mongoose.model('locations', locationsSchema);

//-----Add locations-----//
router.post('/addlocation', function(req, res, next) {
  console.log('addlocation route activée');
  console.log('body: ', req.body);
  var newLocations = new LocationsModel ({
    observationDate: req.body.observationDate,
    latitude: req.body.latitude,
    longtitude: req.body.longtitude,
    isSouthernHorizonClear: req.body.isSouthernHorizonClear,
    bortleScale: req.body.bortleScale,
    explanationOfBortleScale: req.body.explanationOfBortleScale,
    observationCategory: req.body.observationCategory,
    urbanCompromise: req.body.urbanCompromise,
    existenceOfDetails: req.body.existenceOfDetails,
    approuvedBySuperuser: req.body.approuvedBySuperuser,
    transparency: req.body.transparency,
    lightPollution: req.body.lightPollution,
    seeing: req.body.seeing,
    skyQualityMeter: req.body.skyQualityMeter,
    easeOfAccessibilityByCar: req.body.easeOfAccessibilityByCar,
    parkingAvailability: req.body.parkingAvailability,
    powerSupplyAvailability: req.body.powerSupplyAvailability,
    additionalInformation: req.body.additionalInformation,
  });

console.log('newLocation :', newLocations);

newLocations.save(
  function (error, locations) {
    console.log(error);
      res.json('locations');
  }
);

});



module.exports = router;
