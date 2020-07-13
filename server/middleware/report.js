import Joi from '@hapi/joi';
import { password, phone, email, list, name } from '../middleware/index';
import {adm} from '../utils/security'
                                                                                                    

export const reportSchema = Joi.object({
	location: Joi.string().required(),
	trafficStatus: list(['road blockage', 'road accident', 'official trips']),
	congestionDetails: Joi.string(),
	congestionTime: Joi.string()

})
