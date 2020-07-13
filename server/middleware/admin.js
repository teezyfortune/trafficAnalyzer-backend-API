import Joi from '@hapi/joi';
import { password, phone, email, list, name } from '../middleware/index';
                                                                                                               

export const mapSchema = Joi.object({
	alternativeRoute: Joi.string().required()
})