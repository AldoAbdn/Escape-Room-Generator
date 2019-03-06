module.exports = function (options = {}) { 
    return async context => {
      let email = context.data.email;
      let result = await context.service.find({
          query: {
              email
          }
      });
      if(result.data.length){
          throw new Error('Invalid Email');
      }
  
      // Best practice: hooks should always return the context
      return context;
    };
  };