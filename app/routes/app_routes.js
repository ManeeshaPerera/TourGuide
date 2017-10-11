var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/request/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('requests').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(item);
          }
        });
    });

    app.post('/request', (req, res) => {
      const request = { location: req.body.location };
      db.collection('requests').insert(request, (err, result) => {
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
            res.send({'error':'An error has occurred'});
          } else {
            res.send('Request ' + id + ' deleted!');
          } 
        });
      });

      app.put('/request/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const request = { location: req.body.location };
        db.collection('requests').update(details, request, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(request);
          } 
        });
      });
  };