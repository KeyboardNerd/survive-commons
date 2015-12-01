var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PostSchema = new Schema({
	sorting: {
		type: Number,
	},
	time_create: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
	}, 
	description: {
		type: String,
		default: '',
		trim: true,
	},
	original_poster: {
		type: Schema.ObjectId,
		ref: 'Poster'
	},
	like: {
		type: Number,
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
}, {
    toObject: {
        virtuals: true
    },
    toJSON:{
        virtuals: true
    }
});

var theta = function(value){
    return (value)>0;
}

PostSchema.virtual('likeness').get(function(){ return this.like - this.hate;
});
PostSchema.virtual('likeness_level').get(function(){
   return theta(this.like - this.hate);
});
mongoose.model('Post', PostSchema);