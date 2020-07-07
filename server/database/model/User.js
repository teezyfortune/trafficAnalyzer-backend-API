const mongoose = require('mongoose');

module.exports = () => {
	const User = new mongoose.Schema({
		firstName:{
			type: String,
			required:True
		},
		lastName:{
			type: String,
			required:True
		},
		email: {
			type: String,
			required: True,
			unique: True,
		},
		phone: {
			type: Number,
			unique: True,
		},
		password: {
			type: String,
			required:True
		},
	userType: {
		type:String,
		enum: Array['user', 'warder', 'admin'],
			default: 'user'
		},
		createdAt: {
			type: Date,
			default: Date.now
	}
})

	return User
}


