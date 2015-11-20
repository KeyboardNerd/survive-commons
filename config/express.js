var config = require('./config'), 
session = require('express-session'),
express = require('express'), 
morgan = require('morgan'), 
compress = require('compression'), 
bodyParser = require('body-parser'), 
methodOverride = require('method-override'), 
cookieParser = require('cookie-parser')
;

module.exports = function(){
    var app = express();
    if (process.env.NODE_ENV === 'development'){
    	app.use(morgan('dev'));
    }else if (process.env.NODE_ENV === 'production'){
    	app.use(compress());
    }
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({ saveUninitialized: true, resave: true, secret: config.sessionSecret }));
    app.use(express.static('./public'));    
    app.use(cookieParser());
    app.set('views', './app/view');
    app.set('view engine', 'ejs');    
    require('../app/route/index.server.route.js')(app);
    require('../app/route/post.server.route.js')(app);
    require('../app/route/poster.server.route.js')(app);
    return app;
};
