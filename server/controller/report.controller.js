import {geLatLong, findReport, reportTraffic } from '../services/reports';

export const sendReport = async (req, res) => {
	try {
		const address = 'ayetobi lagos state';
		const data = await geLatLong(address)
		console.log('>>>>>>', data.features[1].geometry,  data.features[0].center, data)
	
	} catch (err) {
		return err
	}
}