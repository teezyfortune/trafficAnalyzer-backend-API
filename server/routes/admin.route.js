import express from 'express';
import { addTrafficWarder, fetchAllReportsFromWarden, fetchOneReports, getOneTrafficWarden, getTrafficWardens} from '../controller/admin';
import { authenticationSchema} from '../middleware/auth';
import { validateInput, emailPhoneValidator } from '../middleware/validation';
import { mapSchema} from '../middleware/admin';


import { verifyAdminToken, } from '../utils/security';




export const adminRoute = express.Router()

const BASE_URL = '/admin'

adminRoute.post(`${BASE_URL}/add-TrafficWarden`, verifyAdminToken, validateInput(authenticationSchema), emailPhoneValidator, addTrafficWarder);

adminRoute.get(`${BASE_URL}/:id/find-report`, verifyAdminToken, fetchOneReports);


adminRoute.get(`${BASE_URL}/find-allReports`, verifyAdminToken, fetchAllReportsFromWarden);


adminRoute.get(`${BASE_URL}/find-allWardens`, verifyAdminToken, getTrafficWardens);


adminRoute.get(`${BASE_URL}/:wardenId/find-warden`, verifyAdminToken, getOneTrafficWarden);


// adminRoute.post(`${BASE_URL}/create-map`, verifyAdminToken, validateInput(mapSchema), createMap)