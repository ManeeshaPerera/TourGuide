var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.get('/notification/:id', (req, res) => {
        const id = req.params.id;
        var findJSON = {
            accepted: {
                $elemMatch: { uid: { $not: id } }
            }
        };
        var notificaitonsArr = [];
        //get requestDocuments only reqdate>=todayDate
        var cursor = db.collection('requests').find({ reqDate: { $gt: 1508087793086 } }).forEach(function (myDoc){
            console.log("reqestDate: " + myDoc.reqDate);
            var found = false;
            //search the id in accepted list
            myDoc.accepted.forEach(function (element) {
                console.log("accept: " + element.uid);
                if (element.uid === id) {
                    found = true;
                    return;
                }
            });
            console.log("came1 " + found);
            if (!found) {
                //search the rejected list
                myDoc.rejected.forEach(function (element) {
                    console.log("rej: " + element.uid);
                    if (element.uid === id) {
                        found = true;
                        return;
                    }
                });
            }
            console.log("came2 " + found);
            //var userDoc = db.collection('users').findOne({'uId': id}).then(console.log(userDoc));
            
            
            // if found == true in here then dont send this document as notification
            if (!found) {
                //send the notification\
                console.log('ready to search user collection');
                var docId = myDoc._id;
                var userId = myDoc.uid;
                var requestedDate = myDoc.reqDate;
                var city = myDoc.location.city;
                var userName;
                //get userName from users collection
                db.collection('users').findOne({'uId': id}, function(err, result){
                    if(err) throw err;
                    console.log(result.name);
                    userName = result.name;
                    var jsonObj = {
                        documentId: docId,
                        uname: userName,
                        reqDate: requestedDate,
                        cityName: city
                    };
                    //push to an array
                    //res.send(jsonObj);
                    notificaitonsArr.push(jsonObj);
                });
                
            }else{
                //res.send("{}");
            }
            
        });
        console.log('end');
        res.send("a " + notificaitonsArr.length);
        
    });
};