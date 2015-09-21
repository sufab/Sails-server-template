/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
  index: function (req,res){

    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="/file/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="file" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    )
  },
  
    upload: function (req, res) {
    req.file('file').upload({
      adapter: require('skipper-s3'),
      bucket: 'eitancabs'
    }, function (err, filesUploaded) {
      if (err) return res.negotiate(err);
      return res.success('', {
        files: filesUploaded,
      });
    });
  }
	
};

