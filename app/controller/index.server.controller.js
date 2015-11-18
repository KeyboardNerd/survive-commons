// render the index page
exports.index_render = function(req, res){
	res.render('index',{
		title: "Survive Commons",
		poster_cookie: res.cookie
	});
};
