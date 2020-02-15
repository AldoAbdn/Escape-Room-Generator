const ObjectID = require('mongodb').ObjectID;

/**
 * ConvertID converts string id to MongoDB Object ID
 * @function
 * @param {Object} options
 * @returns {Object} context
 */
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
