const zxcvbn = require('zxcvbn');

/**
 * CredentialsCheck checks if email is valid and if password is strong enough 
 * @function 
 * @param {Object} options
 * @returns {Object} context;
 */
module.exports = function (options = {}) { 
    return async context => {
      const { email, password } = context.arguments[0];
      const testResult = zxcvbn(password);
      // Check if account already exists 
      let result = await context.service.find({
          query: {
              email
          }
      });
      if(result.data.length)
        throw new Error('Invalid Email');
      // Check email valid
      if(email.includes(" ") || email.includes("$") || !email.includes("@"))
        throw new Error("Invalid Email");
      // Check password valid 
      if(testResult.score < 3)
        throw new Error("Password Not Strong Enough");
      if(password.length < 8)
        throw new Error("Password Too Short");
      // Best practice: hooks should always return the context
      return context;
    };
  };