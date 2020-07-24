import { geLatLong, findReportByUserId, reportTraffic, allReportByUserId, updateReportsByWardenId } from '../services/reports';
import { NOT_EXIST, SERVER_ERROR, REPORT_SUCCESS, NOT_WARDEN, REPORTS, REPORT_UPDATE, NO_REPORT} from '../utils/constant';
import { findUser} from '../services/user';


export const sendReport = async (req, res) => {
	try {
		const { location } = req.body;
		const {userId} = req.token.payload;

		const data = await geLatLong(location);
		const { longitude, latitude } = data;
		const id = userId;

		const user = await findUser(userId);

		if (!user || user == null) {
			return res.status(404).json({status: 404, message: NOT_EXIST})
		};

		if(!user && user.userType !== 'traffic-warden') {
			return res.status(401).json({status: 401, message: NOT_WARDEN})
		}
		const report = await reportTraffic({ ...req.body, userId: user._id, longitude, latitude, reportedBy: user.fullName });
		// console.log('>>>reports', report);

		return res.status(201).json({status: 201, message: REPORT_SUCCESS, data:report})
	} catch (err) {
		// console.log('>>>err', err)
		return res.status(500).json({ status: 500, message: SERVER_ERROR })
	}
}

export const fetchOneReportWardenId = async (req, res) => {
	try {
		const {userId} = req.token.payload;
		const report = await findReportByUserId(userId)
		return res.status(200).json({
			status: 200,
			message: REPORTS,
			data: report
		})
	} catch (err) {
		return res.status(500).json({ status: 500, message: SERVER_ERROR })	}
}

export const fetchAllReportByWardenId = async (req, res) => {
	try {
		const {userId} = req.token.payload;
		const report = await allReportByUserId(userId);
		if (report.length === 0) {
			return res.status(404).json({
				status: 404,
				message: NO_REPORT,
			})
		}
		return res.status(200).json({
			status: 200,
			message: REPORTS,
			data: report
		})
	
	} catch (err) {
		return res.status(500).json({ status: 500, message: SERVER_ERROR })	}
}

export const editReportsByWardenId = async (req, res) => {
	try {
		const { userId } = req.token.payload;
		const find = await findReportByUserId(userId);
		// console.log('>>>.reports', find)
		if (!find || find === null) {
			return res.status(404).json({
				status: 404,
				message: INVALID_REPORT_OWNER,
			})
		}
		const update = await updateReportsByWardenId(userId, req.body)
		// console.log('>>>.reports', update)

		return res.status(200).json({
			status: 200,
			message: REPORT_UPDATE,
			data: update
		})
	} catch (err) {
		return res.status(500).json({ status: 500, message: SERVER_ERROR })	}
}

``