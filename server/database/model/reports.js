const mongoose = require('mongoose');

module.exports = () => {
	const Reports = new mongoose.Schema({
		firstName:{
			type: String,
			required:True
		},
		lastName:{
			type: String,
			required:True
		},
		longitude: {
			type: Number,
			required: True,
		},
		latitude: {
			type: Number,
		},
		location: {
			type: String,
			required:True
		},
		placeId: {
			type: String,
			required: True,
		},
	description: {
		type: Text,
		required: True,
		},
		createdAt: {
			type: Date,
			default: Date.now
	}
})
	return Reports
}


