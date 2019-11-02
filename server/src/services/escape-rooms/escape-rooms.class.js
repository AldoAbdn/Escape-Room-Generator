const { Service } = require('feathers-mongodb');

exports.EscapeRooms = class EscapeRooms extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('escape-rooms');
    });
  }
};
