const { Service } = require('feathers-mongodb');

/**
 * Users
 * @class 
 * @extends Service
 * Class for users service
 */
exports.Users = class Users extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('users');
    });
  }
};
