exports.index = function(req, res){
    res.render('index', { title: 'Main' });
  };

exports.gallery = function(req, res){
    res.render('gallery', { title: 'Gallery' });
  };

exports.news = function(req, res){
    res.render('news', { title: 'News' });
  };

exports.login = function(req, res){
    res.render('login', { title: 'Login'});
  };

exports.registry = function(req, res){
    res.render('registry', { title: 'Registry' });
  };