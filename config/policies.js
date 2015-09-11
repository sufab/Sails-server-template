/**
 * Policy Mappings
 * (sails.config.policies)
 *
 */


module.exports.policies = {

   '*': true,

  'FileController': {
    '*': 'isAuthenticated'
  },
  
};