var express = require('express');
var router = express.Router();
var request = require('request');
var mongoose = require('mongoose');

/*options defined to wait for server response*/
var options = {
  server: {
    socketOptions: {
      connectTimeoutMS: 5000
    }
  }
};

/*mongoose.connect function defines calls to mlab database*/
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
  locationName: String,
  locationCategory: String,
  observationDate: String,
  latitude: Number,
  longitude: Number,
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

  UserModel.findOne({
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

//------ Save and Log User Sign Up -----/

  newUser.save(
    function(error, user) {

    UserModel.findOne(
      {
        email: req.body.email,
        password: req.body.password
      },
        function(err, user) {
          res.json(user);
        }
      )


    }
  );
});

//-----Add new location-----//
router.post('/addlocation', function(req, res, next) {
  console.log(req.body)

  if (req.body.transparency == 0){
    req.body.transparency = 'T1'
  } else if (req.body.transparency == 25){
    req.body.transparency = 'T2'
  } else if (req.body.transparency == 50){
    req.body.transparency = 'T3'
  } else if (req.body.transparency == 75){
    req.body.transparency = 'T4'
  } else if (req.body.transparency == 100){
    req.body.transparency = 'T5'
  }

  if (req.body.lightPollution == 0){
    req.body.lightPollution = 'P1'
  } else if (req.body.lightPollution == 25){
    req.body.lightPollution = 'P2'
  } else if (req.body.lightPollution == 50){
    req.body.lightPollution = 'P3'
  } else if (req.body.lightPollution == 75){
    req.body.lightPollution = 'P4'
  } else if (req.body.lightPollution == 100){
    req.body.lightPollution = 'P5'
  }

  if (req.body.seeing == 0){
    req.body.seeing = 'S1'
  } else if (req.body.seeing == 25){
    req.body.seeing = 'S2'
  } else if (req.body.seeing == 50){
    req.body.seeing = 'S3'
  } else if (req.body.seeing == 75){
    req.body.seeing = 'S4'
  } else if (req.body.seeing == 100){
    req.body.seeing = 'S5'
  }

  var newLocations = new LocationsModel({
    locationName: req.body.locationName,
    locationCategory: req.body.locationCategory,
    observationDate: req.body.observationDate,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
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

  console.log('newLocations :', newLocations);

  newLocations.save(
    function(error, location) {
      console.log(error);
      res.json('location');
    }
  );

});

//-----Get all location-----//

router.get('/map', function(req, res, next) {

  LocationsModel.find(
    function(err, locations) {
      res.json({locations});
      console.log(locations);
      console.log(err);
    }
  )

});

//-----Add location in favorites-----//

router.post('/addfavorite', function(req, res, next) {
console.log('addfavorite body: ', req.body);
  UserModel.findOne(
    { _id: req.body.userId },
    function(err, user) {
      res.json({user});
      console.log(err);

      var locationName = req.body.locationName;
      var latitude = req.body.latitude;
      var longitude = req.body.longitude;
      var favoriteCopy = [...user.favorite];
      var favoriteExist = false
for (var i = 0; i < favoriteCopy.length; i++) {
 if(favoriteCopy[i].locationName === req.body.locationName){
   favoriteExist = true
 }
}
if (!favoriteExist) {
  favoriteCopy.push({locationName: locationName, latitude: latitude, longitude:longitude})
  console.log('favoriteCopy: ', favoriteCopy);
  UserModel.update(
      { _id: req.body.userId},
      { favorite:favoriteCopy},
      function(error, raw) {

      }
  );
}
    }
  )
});

//-----delete location in favorites-----//

router.post('/deletefavorite', function(req, res, next) {

    UserModel.findOne(
        { _id: req.body.userId } ,

        function (err, user) {
            console.log(user);

            favoriteCopy = [...user.favorite];
            console.log('Favorite copy: ', favoriteCopy);
            favoriteCopy.splice(favoriteCopy.indexOf(req.body.locationName)-1, 1)
            console.log('After splice', favoriteCopy);

            UserModel.update(
                { _id: req.body.userId},
                { favorite:favoriteCopy},
                function(error, raw) {
                  console.log('raw: ', raw);
                  console.log('Res json user', {user} );
                  res.json({user})
                }
              )
        }


)
});

//-----Display user favorites locations-----//

router.post('/favorites', function(req, res, next){

  UserModel.findOne(
    { _id: req.body.userId },
    function(err, user) {
      var favorites = user.favorite;
      console.log('user favorite backend: ', user);
      res.json({favorites});
      console.log(favorites);
      console.log(err);


    }
  )

});

//-----Get location weather infos-----//

router.post('/getLocationWeatherInfos', function(req, res, next){
console.log(req.body.latitude);
console.log(req.body.longitude);
  request("http://api.openweathermap.org/data/2.5/weather?lat="+req.body.latitude+"&lon="+req.body.longitude+"&appid=6598e8e76e47ddd86b14ff324d146347&units=metric&lang=fr", function(error, reponse, body) {
    console.log('weather error: ', error);
    console.log('BO', body);
    body = JSON.parse(body)
    res.json(body)
  })

});

module.exports = router;
