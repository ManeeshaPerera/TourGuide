var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
  app.get('/request/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('requests').findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(item);
      }
    });
  });

  app.get('/request/location/:id/:userId', (req, res) => {
    const id = req.params.id;
    const userId = req.params.userId;
    console.log(id + ' ' + userId);
    const details = { '_id': new ObjectID(id) };
    
    var findJSON = {
      accepted: {
        $elemMatch: {uid: userId}
      }
    };
    
    db.collection('requests').findOne(details, findJSON, (err, item) => {
      if (err) {
        res.send({ 'error': err });
      } else {
        console.log(item);
        res.send(item);
      }
    });
  });

  app.post('/request', (req, res) => {
    //const request = { location: req.body.location };
    var reqJSON = req.body;
    db.collection('requests').insert(reqJSON, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete('/request/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('requests').remove(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send('Request ' + id + ' deleted!');
      }
    });
  });
  //this method udpates the accepted list in request document
  app.put('/request/accept/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.params.id);
    const details = { '_id': new ObjectID(id) };
    //const request = { location: req.body.location };
    var acceptedListElement = req.body;
    var updateJSON = {

      $push: {
        accepted: {
          $each: [acceptedListElement]
        }
      }

    };

    db.collection('requests').update(details, updateJSON, (err, result) => {
      if (err) {
        res.send({ 'error': err });
      } else {
        res.send({ 'status': 'updated ' + id });
      }
    });
  });

  //this method udpates the rejected list in request document
  app.put('/request/reject/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.params.id);
    const details = { '_id': new ObjectID(id) };
    //const request = { location: req.body.location };
    var rejectedListElement = req.body;
    var updateJSON = {

      $push: {
        rejected: {
          $each: [rejectedListElement]
        }
      }

    };

    db.collection('requests').update(details, updateJSON, (err, result) => {
      if (err) {
        res.send({ 'error': err });
      } else {
        res.send({ 'status': 'updated ' + id });
      }
    });
  });

  //this method udpates the confirm list in request document
  app.put('/request/approve/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.params.id);
    const details = { '_id': new ObjectID(id) };
    //const request = { location: req.body.location };
    var confirmListElement = req.body;
    var updateJSON = {

      $push: {
        approved: {
          $each: [confirmListElement]
        }
      }

    };

    db.collection('requests').update(details, updateJSON, (err, result) => {
      if (err) {
        res.send({ 'error': err });
      } else {
        res.send({ 'status': 'updated ' + id });
      }
    });
  });

};