exports.index = function(req, res){
    res.render('index', { title: 'Main' });
  };

exports.gallery = function(req, res){
    res.render('gallery', { title: 'Gallery' });
  };

exports.news = function(req, res){
    res.render('news', { title: 'News' });
  };