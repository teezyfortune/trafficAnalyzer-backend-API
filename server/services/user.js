import {db} from '../database/index';
import User from '../database/model/User';
import  mongoose  from 'mongoose';

const isObjectId = mongoose.isValidObjectId


export const saveUser = async (data) => {
	try {
		const user = new User(data);
	 return await user.save(user);
}catch (err) {
	return err
}
}

export const findUser = async (item) => {
	try {
		let where
		where = { email: item } || { phone: item }
		if (isObjectId(item)) {
			where = {_id: item}
		}
	return	await User.findOne(where)

	} catch (err) {
		return err
	}
}

export const updateUser = async (userId, password) => {
	try {
		const parameter = {
			$set: { password}
		}
		return await  User.updateOne({ _id: userId}, parameter );
	}catch(err){
		return err
}
}