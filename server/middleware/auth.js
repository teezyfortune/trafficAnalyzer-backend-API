import Joi from '@hapi/joi';
import { password, phone, email, list, name } from '../middleware/index';
                                                                                                               

export const authenticationSchema = Joi.object({
	fullName: Joi.string().required(),
	email: email.required(),
	city: Joi.string().required(),
	country: Joi.string().required(),
	phone: phone.required(),
	password,
	userType:list(['admin', 'traffic-warden'])
})


export const loginSchema = Joi.object({
	username: Joi.string()
	.min(3)
	.max(100)
	.required(),
password,
})


export const forgotPasswordSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(60)
    .required(),
});


export const userResetPasswordSchema = Joi.object({
	token: Joi.string().required(),
  password: Joi.string()
    .required()
    .messages({
      'string.pattern.base': 'Incorrect password',
      'string.empty': 'Password is not allowed to be empty.',
    }),
});
