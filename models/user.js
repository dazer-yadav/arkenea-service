const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstname:{
		type: String,
		required: true,
	},
	lastname:{
		type: String,
		required: true,
	},
	email:{
		type: String,
		required: true,
		unique: true,
	},
	phoneNumber:{
		type: Number,
		required: true,
		validate(value){
			if(value.length<10){
				throw new Error('Not a valid phone number. Must have 10 digit')
			}
		}
	},
	// image:{
	// 	type: String,
	// 	required: true
	// }
},{timestamps: true});

module.exports = mongoose.model('User',userSchema);