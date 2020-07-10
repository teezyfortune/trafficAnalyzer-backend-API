import { saveUser } from '../services/user';
import {SERVER_ERROR, TRAFFIC_WARDER_SUCCESS } from '../utils/constant';
import { createPassword, createNewToken } from '../utils/security';




export const addTrafficWarder = async (req, res) => {
	const { firstName, lastName, email, password, phone, userType } = req.body;
	try {
		const hash = await createPassword(password)
		const user = await saveUser({ firstName, lastName, email, phone, password: hash, userType });

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
				firstName: user.firstName,
				lastName:user.firstName,
				email: user.email,
				phone: user.phone,
				userType: user.userType,
				createdAt: user.createdAT
			}, jwtToken
		})

	} catch (err) {
		return res.status(500).json({
			status: 500,
			message: SERVER_ERROR
		})	}
}
