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
    }).then(bcrypt.hash(reqJSON.password, saltRounds).then(function(hash) {
        reqJSON['password'] = hash;
    })).then(function(){
        db.collection('users').insert(reqJSON, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    })
    })},

app.post('/user/login', (req, res)=> {
     var reqJSON = req.body;
     //console.log(user.email);
     db.collection('users').findOne({"email":reqJSON.email}, (err, result) => {
      if (err) {
        res.send({'status': false, 'error': 'An error occurred' });
      } else {
         if(result) {
            var user = result;
            //console.log(result.password);
            //res.send(result);
            bcrypt.compare(reqJSON.password, user.password).then(function(response) {
                console.log(response);
                if(response == true){
                    var userObject ={
                        status: true,
                        uId: user.uId,
                        email: user.email,
                        name: user.name,
                        contact: user.contact,
                        lastReqId: user.lastReqId
                    }
                    res.send(userObject);
                }
                else{
                    res.send({'status': false, 'error': 'Authentication Failed' });
                }        
            })
         } else {
             res.send({'status': false, 'error': 'ID not found' });
         }
      }
    })
})

)};

