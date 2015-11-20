// render the index page
exports.renderIndex = function(req, res){
	res.render('index',{
		title: "Survive Commons",
	});
};
