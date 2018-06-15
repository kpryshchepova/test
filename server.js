var express = require('express');
var path = require('path');
var app = express();
var routes = require('./routes');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var nano = require('nano')('https://3bc3a846-89b5-48c2-b962-b9c1d2339188-bluemix:12d50ac993c35ed8bda4dd22e088f34732774851558146ec4cda50c26c1bc42b@3bc3a846-89b5-48c2-b962-b9c1d2339188-bluemix.cloudant.com');
var db_name = 'users_db';
var db = nano.use(db_name);

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

app.post('/registr', jsonParser, function (req, res) {
    if(!req.body) 
        return res.sendStatus(400);
    console.log(req.body); 

    db.insert(req.body, function(err, body) {
        if (!err)
          console.log(body);
          else console.log("Такой e-mail уже используется!");
    });
})

app.post('/log', jsonParser, function (req, res) {
    
    if(!db.get(req.body.name, function(err, body) {
        if (!err) {
            var pass = body.password;
            if(pass == req.body.password){
                console.log(pass);
            }
            else {
                console.log("Проверьте пароль!");
                //res.sendStatus(404);
            }
        }
        else {
            console.log("Проверьте логин!");
            //res.sendStatus(404);
        }
    }));
})


app.get('/', routes.login);
app.get('/index', routes.index);
app.get('/gallery', routes.gallery);
app.get('/news', routes.news);
/*app.get('/login', function(req, res) {
    res.render('views/login', {
        warn: warn
    });
});*/
app.get('/login', routes.login);
app.get('/registry', routes.registry);

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log('To view your app, open this link in your browser: http://localhost:' + port);
});
