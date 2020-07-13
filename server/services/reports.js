import axios from 'axios';
import Reports from '../database/model/reports';
import 'dotenv/config';


export const geLatLong = async (city) => {
	try {
		const apiKey = process.env.MAPBOX_API_KEY;
		const userAddress = city.split(' ').join('+')
		const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${userAddress}.json?access_token=${apiKey}`;
		const { data } = await axios({ method: 'GET', url });
		console.log('euserr>>>>', data);

		const { features } = data;
		console.log('euserr>>>>', features[0].geometry.coordinates);

		return {
			latitude: features[0].geometry.coordinates[0],
			longitude: features[0].geometry.coordinates[1]
	 }
	} catch (err) {
		return err
	}
}

export const reportTraffic = async (item) => {
	try {
		const report = new Reports({...item})
		return await report.save(report)
	} catch (err) {
		return err
	}
}

export const findReport = async (reportId) => {
	try {
		return await Reports.findOne({_id: reportId})
	} catch (err) {
		return err
	}

}