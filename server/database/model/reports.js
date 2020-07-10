const mongoose = require('mongoose');

const Schema = mongoose.Schema
const dataType = Schema.Types;
const ReportSchema = new mongoose.Schema({
		userId: {
			type: dataType.ObjectId,
			required: true
		},
		longitude: {
			type: Number,
			required: true,
		},
		latitude: {
			type: Number,
		},
		location: {
			type: String,
			required:true
		},
		placeId: {
			type: String,
			required: true,
		},
	congestionDetails:{
		type: String,
		required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now
		},
		updatedAt: {
			type: Date,
			default: Date.now
	}
})

const Reports = mongoose.model('reports', ReportSchema)

module.exports = Reports
