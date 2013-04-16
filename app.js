
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , weibo = require('./routes/weibo')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// added begin for weibo by zetsin 2013/4/10
app.use(express.cookieParser());
app.use(express.session({ secret: 'TaikongPL' }));
app.use(weibo.oauth());
app.get('/search_topics', weibo.search_topics);
app.get('/statuses_update', weibo.statuses_update);
app.get('/statuses_repost', weibo.statuses_repost);
app.get('/comments_create', weibo.comments_create);
app.get('/comments_show', weibo.comments_show);
// added end

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
