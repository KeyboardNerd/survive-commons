var mongoose = requrie('mongoose'),
	Schema = mongoose.Schema,
	constants = require('../../config/constant.js');

var PostSchema = new Schema({
	time_create: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'You gotta want a title'
	}, 
	description: {
		type: String,
		default: '',
		trim: true,
		required: 'You wanna say something to folks' 
	},
	original_poster: {
		type: Schema.ObjectId,
		ref: 'Poster'
	},
	likeness: {
		type: Number, 
		default: 0
	},
	likeness_level: {
		type: Number,
		default: 0
	},
	like: {
		type: NUmber,
		default: 0
	},
	pic: {
		type: Schema.ObjectId,
		ref: 'Picture'
	},
	hate: {
		type: Number,
		default: 0
	}
});

PostSchema.post('save', function(document){
	if (constants.debug == 1){
		console.log('post ' + document._id + ' is created');
	}
})
mongoose.model('Post', PostSchema);