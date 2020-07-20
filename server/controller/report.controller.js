import { geLatLong, findReport, reportTraffic } from '../services/reports';
import { NOT_EXIST, SERVER_ERROR, REPORT_SUCCESS, NOT_WARDEN } from '../utils/constant';
import { findUser} from '../services/user';


export const sendReport = async (req, res) => {
	try {
		const { location } = req.body;
		const {userId} = req.token.payload;

		const data = await geLatLong(location);
		 console.log('>>>>>>>data', req.body)
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
		console.log('>>>reports', report);

		return res.status(201).json({status: 201, message: REPORT_SUCCESS, data:report})
	} catch (err) {
		console.log('>>>err', err)
		return res.status(500).json({ status: 500, message: SERVER_ERROR })
	}
}