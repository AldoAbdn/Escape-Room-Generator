const ObjectID = require('mongodb').ObjectID;

module.exports = function (options = {}) { 
    return async context => {
      const { query = {} } = context.params;
      
      if(query._id){
        query._id = new ObjectID(query._id); 
      }
  
      // Best practice: hooks should always return the context
      return context;
    };
  };
