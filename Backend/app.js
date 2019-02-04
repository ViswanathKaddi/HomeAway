const express=require('express');
const mysql=require('mysql');
const bodyParser=require("body-parser");
const methodOveride=require("method-override");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('./config/keys');
const passport = require('passport');
const cors = require('cors');
var mongoose = require('mongoose');
//const local_db = 'mongodb://localhost:27017/homeaway';
const mlab_db = 'mongodb://superuser2:superuser2@ds147723.mlab.com:47723/homeaway_lab2';

mongoose.connect(mlab_db)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Load User model
const User = require('./models/User');
// Load Profile Model
const Profile = require('./models/Profile');
// Load Home Model
const Home = require('./models/Home');
// Load BookedHome Model
const BookedHome = require('./models/BookedHome');

// Load Input Validation
const validateRegisterInput = require('./validation/register');
const validateLoginInput = require('./validation/login');
const validateProfileInput = require('./validation/profile');
const validateHomeInput = require('./validation/homes');



const app=express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOveride("_method"));
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'password',
//     database : 'homeawaydb'
//   });

// connection.connect((err) => {
//     if(err){
//         console.log(err);
//     } 
//     console.log("Mysql Connected");
// });

// Passport middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    // res.setHeader('Cache-Control', 'no-cache');
    next();
  });

//HOME ROUTE


app.post("/register", function(req, res) {

    console.log(req.body);
    const { errors, isValid } = validateRegisterInput(req.body);
  
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  
});

app.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    console.log(res.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;

     // Find user by email
    User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
  });





  app.post('/profile',passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    console.log(res.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    console.log("hitting");

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.phonenumber) profileFields.phonenumber = req.body.phonenumber;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.country) profileFields.country = req.body.country;
    if (req.body.languages) profileFields.languages = req.body.languages;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.about)profileFields.about = req.body.about;


    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        console.log("checking update");
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ user: req.user.id }).then(profile => {
          
          if (profile) {
            //errors.handle = 'That handle already exists';
            //res.status(400).json(errors);
            console.log(err);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  });



  

  app.post('/addhome',passport.authenticate('jwt', { session: false }),
    (req, res) => {
      console.log(res.body);
      const { errors, isValid } = validateHomeInput(req.body);
  
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }
  
      //Profile.findOne({ user: req.user.id }).then(profile => {
        
        const newhome = {
          
          houseName: req.body.houseName,
          houseLocation: req.body.houseLocation,
          houseAvailableFrom: req.body.houseAvailableFrom,
          houseAvailableTill: req.body.houseAvailableTill,
          guestCapacity: req.body.guestCapacity,
          houseArea: req.body.houseArea,
          houseImage: req.body.houseImage,
          houseDescription: req.body.houseDescription,
          housePrice: req.body.housePrice,
          houseOwnerName:  req.user.name,
          user: req.user.id
    
        };

        newhome.user = req.user.id;

        Home(newhome).save().then(home => res.json(home));

    }
  );

  app.post('/bookhome',passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(res.body);
    // var myJSON = JSON.stringify(req.body);
    // const { errors, isValid } = validateHomeInput(myJSON);
  
    //   // Check Validation
    //   if (!isValid) {
    //     // Return any errors with 400 status
    //     return res.status(400).json(errors);
    //   }
      console.log(req.body.houseName)
      console.log(req.body.houseLocation)
      console.log(req.body.houseAvailableFrom)
      console.log(req.body.houseAvailableTill)
      console.log(req.body.guestCapacity)
      console.log(req.body.houseArea)
      console.log(req.body.houseImage)
      console.log(req.body.houseDescription)
      console.log(req.body.housePrice)
      console.log(req.user.name)
      console.log(req.user.id)

    const bookhome = {
          
      houseName: req.body.houseName,
      houseLocation: req.body.houseLocation,
      houseAvailableFrom: req.body.houseAvailableFrom,
      houseAvailableTill: req.body.houseAvailableTill,
      guestCapacity: req.body.guestCapacity,
      houseArea: req.body.houseArea,
      houseImage: req.body.houseImage,
      houseDescription: req.body.houseDescription,
      housePrice: req.body.housePrice,
      houseOwnerName:  req.user.name,
      houseBookedDate: Date.now(),
      user: req.user.id

    };

    bookhome.user = req.user.id;
    console.log("bookhome")
    console.log(bookhome)

    BookedHome(bookhome).save().then(home => res.json(home));
  
    
  });

  app.get('/home/:_id', (req, res) => {
    console.log("hitting here");
    console.log(res.body);
    Home.findById(req.params._id)
      .then(home => {
        console.log(home);
        if (!home) {
          res.status(404).json('There is no profile for this user');
        }
  
        res.json(home);
      })
      .catch(err => res.status(404).json(err));
  });

  

app.get('/profile',passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(res.body);
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);


app.get('/allHomes', (req, res) => {
 // const errors = {};

  Home.find()
    .then(homes => {
      if (!homes) {
        //errors.noprofile = 'There are no profiles';
        return res.status(404).json('There are no profiles');
      }

      res.json(homes);
      console.log(homes);
    })
    //.catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

app.get('/OwnerHomes',passport.authenticate('jwt', { session: false }), (req, res) => {
  // const errors = {};
 
   Home.find({ user: req.user.id })
     .then(homes => {
       if (!homes) {
         //errors.noprofile = 'There are no profiles';
         return res.status(404).json('There are no homes');
       }
 
       res.json(homes);
     })
     .catch(err => res.status(404).json('There are no homes'));
 });


 app.get('/bookedHomes',passport.authenticate('jwt', { session: false }), (req, res) => {
  // const errors = {};
 
   BookedHome.find({ user: req.user.id })
     .then(homes => {
       if (!homes) {
         //errors.noprofile = 'There are no profiles';
         return res.status(404).json('There are no homes');
       }
 
       res.json(homes);
     })
     .catch(err => res.status(404).json('There are no homes'));
 });

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
app.get('/current',passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);


app.listen(3001, () => {
    console.log("Server started...")
})