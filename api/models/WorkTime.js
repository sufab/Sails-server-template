/**
* WorkTime.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    user: {
      model: 'User'
    },
    date: {
      type: 'datetime'
    },
    hours: {
      type: 'float'
    },
    notes: {
      type: 'string',
      maxLength: 100
    }
  }
};

