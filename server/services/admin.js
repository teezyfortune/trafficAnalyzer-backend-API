import Reports from '../database/model/reports';
import Map from '../database/model/map';


export const getAllReport = async () => {
	try {
		return await Reports.find().sort({createdAt:-1});
	} catch (err) {
		return err
}
}

export const saveMap = async (items) => {
	try {
		const map = new Map(items);
		return await map.save(map)
	} catch (err) {
		return err;
	}
}


export const updateMap = async (mapId, items) => {
	try {
		const parameter = {
			$set: { items}
		}
		return await Map.updateOne({ _id: mapId }, parameter);
	} catch (err) {
		return err;
	}
}