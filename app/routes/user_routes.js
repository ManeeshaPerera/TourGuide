var ObjectID = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function (app, db) {

app.post('/user/signup', (req, res) => {
     reqJSON = req.body;
    //var jsonObj = JSON.parse(reqJSON);
    console.log(reqJSON);

    bcrypt.hash(reqJSON.email, saltRounds).then(function(hash) {
        console.log(hash);
        reqJSON['uId'] = hash;
    }).then(bcrypt.hash(reqJSON.password, saltRounds).then(function(hash1) {
        reqJSON['password'] = hash1;
    })).then(function(){
        db.collection('users').insert(reqJSON, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    })
    })}
)};

