var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var options = {
  server: {
    socketOptions: {
      connectTimeoutMS: 5000
    }
  }
};
mongoose.connect('mongodb://admin:paris02@ds163103.mlab.com:63103/darkskymap',
  options,
  function(err) {
    console.log(err);
  }
);

//------------------------------Mongoose schemas & models-----------------------------------//

//-----User  schema-----//

var userSchema = mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  superUser: Boolean,
  favorite: Array
});

//-----User model-----//

var UserModel = mongoose.model('users', userSchema);

//-----Location schema-----//

var locationsSchema = mongoose.Schema({
  observationDate: String,
  latitude: Number,
  longtitude: Number,
  isSouthernHorizonClear: String,
  bortleScale: String,
  explanationOfBortleScale: String,
  observationCategory: String,
  urbanCompromise: Boolean,
  existenceOfDetails: Boolean,
  approuvedBySuperuser: Boolean,
  transparency: String,
  lightPollution: String,
  seeing: String,
  skyQualityMeter: Number,
  easeOfAccessibilityByCar: Boolean,
  parkingAvailability: Boolean,
  powerSupplyAvailability: Boolean,
  additionalInformation: String
});

//-----Location model-----//
var LocationsModel = mongoose.model('locations', locationsSchema);

//------------------------------Routes-----------------------------------//

//-----Finds existing user-----//
router.post('/signin', function(req, res, next) {

  UserModel.find({
      email: req.body.email,
      password: req.body.password,
    },

    function(err, users) {
      res.json(users);
    }
  )

});

//-----Add new user-----//
router.post('/signup', function(req, res, next) {

  var newUser = new UserModel({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    superUser: false
  });

  newUser.save(
    function(error, user) {
      console.log(user);
      res.render('map');
    }
  );

});

//-----Add new location-----//
router.post('/addlocation', function(req, res, next) {

  var newLocation = new LocationModel({
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

  console.log('newLocation :', newLocation);

  newLocation.save(
    function(error, location) {
      res.json('location');
    }
  );

});

//-----Get all location-----//

router.get('/map', function(req, res, next) {

  LocationsModel.find(
    function(err, locations) {
      res.json(locations);
    }
  )

});

module.exports = router;
