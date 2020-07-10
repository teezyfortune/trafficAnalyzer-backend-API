import express from 'express';
import { addTrafficWarder} from '../controller/admin';
import { forgotPassword, resetPassword } from '../controller/password';
import { authenticationSchema} from '../middleware/auth';
import { validateInput, emailPhoneValidator } from '../middleware/validation';

import {verifyAdminToken} from '../utils/security'




export const adminRoute = express.Router()

const BASE_URL = '/admin'

adminRoute.post(`${BASE_URL}/add-TrafficWarder`, verifyAdminToken, validateInput(authenticationSchema), emailPhoneValidator, addTrafficWarder);
