var mongoose = require('mongoose'), Schema = mongoose.Schema;
var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	username: {
		type: String,
		trim: true
	},
	password: String,
	created:{
		type: Date,
		default: Date.now // it will update the created every time I query???
	}
});
mongoose.model('User', UserSchema);

