const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: Number,
		unique: true,
		required: true,
	},
	city: {
		type: String,
		unique: true,
		required: true,
	},
	country: {
		type: String,
		unique: true,
		required: true,
	},
	Gender: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true
	},
	userType: {
		type: String,
		enum: Array['traffic-warden', 'admin'],
		default: 'admin',
		required:false
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model('users', UserSchema)


module.exports = User;



