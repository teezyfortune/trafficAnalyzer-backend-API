import { saveUser, findUser } from '../services/user';
import {SIGNUP_SUCCESS, SERVER_ERROR, LOGIN_SUCCESS, INVALID_USER } from '../utils/constant';
import { createPassword, comparePassword, createNewToken } from '../utils/security';
import {db} from '../database/index';


export const creatUser = async (req, res) => {
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
			message: SIGNUP_SUCCESS,
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
		console.log('err>>>>', error);
		return res.status(500).json({
			status: 500,
			message: SERVER_ERROR
		})	}
}


export const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body

		const user = await findUser(username);;
		if (user) {
			const compare = await comparePassword(password, user.email)
			if (compare) {
				const payload = {
					userId: user._id,
					email: user.email,
					userType: user.userType
				}
				const jwtToken = await createNewToken(payload)

				return res.status(200).json({
					status: 200,
					message: LOGIN_SUCCESS,
					data: {
						id:user._id,
						firstName: user.firstName,
						lastName:user.firstName,
						email: user.email,
						phone: user.phone,
						userType: user.userType,
						createdAt: user.createdAT
					},
					jwtToken
				})
			}
			return res.status(401).json({
				status: 401,
				message: INVALID_USER
			})
		}
		return res.status(401).json({
			status: 401,
			message: INVALID_USER
		})
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: SERVER_ERROR
		})
	}
}
