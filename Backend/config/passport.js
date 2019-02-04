// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const mysql=require('mysql');
// //const mongoose = require('mongoose');
// //const User = mongoose.model('users');
// const keys = require('../config/keys');

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

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = keys.secretOrKey;

// module.exports = passport => {
//   passport.use(
//     new JwtStrategy(opts, (jwt_payload, done) => {
//         const jwtpid=jwt_payload.ID;
//         console.log(jwt_payload);
//         let sql='SELECT * FROM userdetails where ID='+ mysql.escape(jwtpid);
//         connection.query(sql,(err,result) => {
//             console.log(result[0]);
//             if(result){
//                 console.log(result[0]);
//                 return done(null, result);
//             }else{
//                 return done(null, false);
//             }
//     })
//     })
//   );
// };

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};


