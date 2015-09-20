/** 
 * api/responses/error.js
 *
 * This will be available in controllers as res.error('foo');
 */

module.exports = function(msg, data) {

  var req = this.req;
  var res = this.res;

   // default params
   msg = typeof msg !== 'undefined' ? msg : '';
   data = typeof data !== 'undefined' ? data : [];
   
  // Set status code
  res.status(200);

  var answer = {
      status: -1,
      msg: msg,
      data: data
  }
  // If appropriate, serve data as JSON(P)
  if (req.wantsJSON) {
    return res.jsonx(answer);
  }
  
    return res.send(answer);
};