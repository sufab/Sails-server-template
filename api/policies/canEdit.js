/**
 * Created by sufa bitton on 18/10/2015.
 */
module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    var userid = req.session.passport.user;
    User.findOne(userid).exec(function(error, user){
      if(error){
        return res.forbidden(error);
      }
      if(!user){
        return res.forbidden('user not exist');
      }
      if(user.isAdmin == true){
        return next();
      }
      else{
        if(req.param('id') == userid || req.param('user') == userid){
          return next();
        }
        return res.forbidden('Access denied');
      }
    });
  }
  else{
    return res.forbidden('Access denied');
  }
};

