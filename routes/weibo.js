
/*
 * GET weibo.
 */

// [模块]
var weibo = require('weibo');

// [变量]
var options = {
		loginPath: '/login',
		logoutPath: '/logout',
		callbackPath: '/index',
		blogtypeField: 'type',
		afterLogin: onAfterLogin,
		beforeLogout: onBeforeLogout};

var	defaultId = 0,
	defaultCount = 20,
	defaultPage = 1,
	defaultTopic = 'http://www.taikongpinglun.com',
	defaultPinglun = '来自 太空评论';

// [流程]
weibo.init('weibo', '1259597512', '6089686a296e80a65a661ff457da739f');
weibo.init('tqq', '801262472', 'cffbcaeea044be6f7b58bbb051a6c4ba');

// [接口]
exports.oauth = function() {
	return function (req, res, next) {
		weibo.oauth(options)(req, res, next);
	}
};

exports.search_topics = function (req, res) {
	// [变量]
	var user = req.session.oauthUser,
		query = req.body.q || req.query.q || defaultTopic,
		cursor = {
			count: req.body.count || req.query.count || defaultCount,
			page: req.body.page || req.query.page || defaultPage};

	// [流程]
	weibo.search(user, query, cursor, callback);

	// [函数]
	function callback (err, result) {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	}
}

exports.statuses_update = function (req, res) {
	// [变量]
	var user = req.session.oauthUser,
		status = req.body.status || req.query.status || defaultPinglun;

	// [流程]
	weibo.update(user, status, callback);

	// [函数]
	function callback (err, result) {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	}
}

exports.statuses_repost = function (req, res) {
	// [变量]
	var user = req.session.oauthUser,
		id = req.body.id || req.query.id || defaultId,
		status = req.body.status || req.query.status || defaultPinglun;

	// [流程]
	weibo.repost(user, id, status, callback);

	// [函数]
	function callback (err, result) {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	}
}

exports.comments_create = function (req, res) {
	// [变量]
	var user = req.session.oauthUser,
		id = req.body.id || req.query.id || defaultId,
		comment = {
			comment: req.body.comment || req.query.comment || defaultPinglun,
			comment_ori: 1};

	// [流程]
	weibo.comment_create(user, id, comment, callback);

	// [函数]
	function callback (err, result) {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	}
}

exports.comments_show = function (req, res) {
	// [变量]
	var user = req.session.oauthUser,
		id = req.body.id || req.query.id || defaultId,
		cursor = { // only weibo is available
			since_id: req.body.since_id || req.query.since_id || defaultId,
			max_id: req.body.max_id || req.query.max_id || defaultId,
			count: req.body.count || req.query.count || defaultCount,
			page: req.body.page || req.query.page || defaultPage};

	// [流程]
	weibo.comments(user, id, cursor, callback);

	// [函数]
	function callback (err, result) {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	}
}

// [函数]
function onAfterLogin (req, res, callback) {
	//console.log(req.session.oauthUser.screen_name, 'login success');
	process.nextTick(callback);
}

function onBeforeLogout (req, res, callback) {
	//console.log(req.session.oauthUser.screen_name, 'loging out');
	process.nextTick(callback);
}