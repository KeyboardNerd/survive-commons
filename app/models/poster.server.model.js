var mongoose = requrie('mongoose'), Schema = mongoose.Schema;

var PosterSchema = new Schema({
	post_num: Number,
	post_id: {
		type: Schema.ObjectId,
		ref: 'Post'
	}
	name: String,
});

mongoose.model('Poster', PosterSchema);