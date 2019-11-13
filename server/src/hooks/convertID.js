const ObjectID = require('mongodb').ObjectID;

module.exports = function (options = {}) { 
    return async context => {
      let { id } = context;
      
      if(id){
        id = new ObjectID(id); 
        context.id = id;
      }
      // Best practice: hooks should always return the context
      return context;
    };
  };
