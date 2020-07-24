import Joi from '@hapi/joi';
import {  list } from '../middleware/index';
                                                                                                    

export const reportSchema = Joi.object({
	location: Joi.string().required(),
	trafficType: list(['road block', 'road accident', 'road maintenance', 'vip movement']),
	congestionDetails: Joi.string().required(),
	congestionTime: Joi.string().required()

})


export const updateReportSchema = Joi.object({
	trafficType: list(['road block', 'road accident', 'road maintenance', 'vip movement']),
	congestionDetails: Joi.string(),
	congestionTime: Joi.string()

})
