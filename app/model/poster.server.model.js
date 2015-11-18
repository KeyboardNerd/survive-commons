var mongoose = requrie('mongoose'), Schema = mongoose.Schema;

var PosterSchema = new Schema({
	name: String,
	cookie: {
		type: String,
		required: 'cookie is required'
	}
});

mongoose.model('Poster', PosterSchema);