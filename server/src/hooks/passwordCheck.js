import zxcvbn from 'zxcvbn';

module.exports = function (options = {}) { 
    return async context => {
      let { password }= context.data;
      let errorMessages = [];
      
      if(zxcvbn(password).score < 4)
          errorMessages.push("Password Too Weak")
      
      if (password.length < 8)
          errorMessages.push("Password Too Short");

      if(errorMessages.join(", ").length != 0)
        throw new Error(errorMessages.join(", "));
      
      // Best practice: hooks should always return the context
      return context;
    };
  };