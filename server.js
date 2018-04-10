var express = require('express');
var path = require('path');
var app = express();
var routes = require('./routes');


app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('view engine', 'html');

app.use('/static', express.static(__dirname + '/public'));
app.use('/js/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.use('/css/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/css/fonts', express.static(path.join(__dirname, '/node_modules/bootstrap/fonts')));
app.use('/parts', express.static(path.join(__dirname, '/views/parts')));

app.get('/', routes.index);
app.get('/index', routes.index);
app.get('/gallery', routes.gallery);
app.get('/news', routes.news);
app.get('/login', routes.login);
app.get('/registry', routes.registry);

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log('To view your app, open this link in your browser: http://localhost:' + port);
});
