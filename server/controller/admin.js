import { saveUser, findUser } from '../services/user';
import {SERVER_ERROR, TRAFFIC_WARDER_SUCCESS, NOT_REPORT, REPORTS, NOT_EXIST, UNDEFINED, MAP_SUCCESS } from '../utils/constant';
import { createPassword, createNewToken } from '../utils/security';
import { getAllReport, saveMap } from '../services/admin';
import { findReport } from '../services/reports';





export const addTrafficWarder = async (req, res) => {
	const {  password } = req.body;
	try {
		const hash = await createPassword(password)
		const user = await saveUser({...req.body, password: hash});

		const payload = {
			userId: user._id,
			email: user.email,
			userType: user.userType
		}

		const jwtToken = await createNewToken(payload);
		return res.status(201).json({
			status: 201,
			message: TRAFFIC_WARDER_SUCCESS,
			data: {
				id:user._id,
				fullName: user.fullName,
				email: user.email,
				phone: user.phone,
				userType: user.userType,
				city: user.city,
				country:user.country,
				createdAt: user.createdAT
			}, jwtToken
		})

	} catch (err) {
		console.log('>>>>>>>', err)
		return res.status(500).json({
			status: 500,
			message: SERVER_ERROR
		})	}
}

export const fetchAllReportsFromWarden = async (req,res) => {
	try {
		const reports = await getAllReport();
		if (reports.length === 0) {
			return res.status(400).json({
				status: 400,
				message: NOT_REPORT
			})
		}
		return res.status(200).json({
			status: 200,
			message: REPORTS,
			data: reports
		})
	
	} catch (err) {
			return res.status
			(500).json({
				status: 500,
				message: SERVER_ERROR
			})	}
}

export const fetchOneReports = async (req, res) => {
	try {
		const id = req.params.id;
		const report = await findReport(id);
		if (!report || report == null) {
			return res.status(404).json({
				status: 404,
				message: NOT_REPORT
			})
		}
		return res.status(200).json({
			status: 200,
			message: REPORTS,
			data: report
		})
	} catch (err) {
			return res.status(500).json({
				status: 500,
				message: SERVER_ERROR
			})	}
}

// export const createMap = async (req, res) => {
// 	try {
// 		// console.log('>>>>', req.token.payload)
 
// 		const data = await getAllReport();
		
		
			
// 		const reportInfo = {
// 			longitude: info.longitude,
// 			latitude: info.latitude,
// 			congestionType: info.trafficType,
// 			trafficDetails: info.congestionDetails,
// 			startedTime: info.congestionTime,
// 			location: info.location
// 		};
		
// 			const map = await createMap({...req.bod, reportInfo})
// 			return res.status(201).json({
// 				status: 201,
// 				message: MAP_SUCCESS,
// 				data: map
// 			})
		
// 	} catch (err) {
// 		console.log('>>>>err', err)
// 		return res.status(500).json({
// 			status: 500,
// 			message: SERVER_ERROR
// 		});
// 	}
// }