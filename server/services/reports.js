import axios from 'axios';
import Reports from '../database/model/reports';
import 'dotenv/config';


export const geLatLong = async (address) => {
	try {
		const apiKey = process.env.MAPBOX_API_KEY;
		const userAddress = address.split(' ').join('+')
		const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiKey}`;
		const {data} = await axios({ method: 'GET', url });
		return data
	} catch (err) {
		return err
	}
}

export const reportTraffic = async (item) => {
	try {
		const report = new Reports(item)
		return await report.save(report)
	} catch (err) {
		return
	}
}

export const findReport = async (reportId) => {
	try {
		return await Reports.findOne({_id: reportId})
	} catch (err) {
		return err
	}

}