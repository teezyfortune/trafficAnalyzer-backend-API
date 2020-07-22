import Joi from '@hapi/joi';
import { password, phone, email, list, name } from '../middleware/index';
import {adm} from '../utils/security'
                                                                                                    

export const reportSchema = Joi.object({
	location: Joi.string().required(),
	trafficType: list(['road block', 'road accident', 'road maintenance', 'vip movement']),
	congestionDetails: Joi.string(),
	congestionTime: Joi.string()

})
