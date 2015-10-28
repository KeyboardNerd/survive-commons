exports.render = function(req, res){
	if (req.session.lastVisit){
		console.log(req.session.lastVisit);
	}
	req.session.lastVisit = new Date();
	res.render('index',{
		title: "Survive Commons",
		userFullName: req.user ? req.user.fullName: '', // what this line means?
		body: "Survive Commons is a food reddit under VA♂N Licence"
	});
};
