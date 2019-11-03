module.exports = function (options = {}) { 
    return async context => {
      let email = context.data.email;
      // Check if account already exists 
      let result = await context.service.find({
          query: {
              email
          }
      });
      if(result.data.length)
        throw new Error('Invalid Email');
      // Check for spaces
      if(this.state.email.contains(" ") || this.state.email.contains("$"))
        throw new Error("Invalid Email");
  
      // Best practice: hooks should always return the context
      return context;
    };
  };