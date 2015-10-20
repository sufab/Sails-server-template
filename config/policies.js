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

  'UserController':{
    'find': 'isAdmin',
    'update': 'canEdit',
  },

  'WorkTimeController':{
    '*': 'canEdit',
    'find': 'isAdmin'
  },

  'ProjectsController':{
    '*': 'isAdmin'
  }
};
