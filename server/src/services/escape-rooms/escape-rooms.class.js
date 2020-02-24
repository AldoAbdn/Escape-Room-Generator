const { Service } = require('feathers-mongodb');

/**
 * EscapeRooms
 * @class
 * @extends Service
 * Handles storage of escape rooms 
 */
exports.EscapeRooms = class EscapeRooms extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('escape-rooms');
    });
  }
};
