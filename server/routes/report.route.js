import express from 'express';
import { sendReport } from '../controller/report.controller';
import { validateInput } from '../middleware/validation';
import { reportSchema} from '../middleware/report';
import {WardenVerifyTokenMiddleware} from '../utils/security'


export const reportRoute = express.Router();
const BASE_URL = '/report'

reportRoute.post(`${BASE_URL}/report-traffic`, WardenVerifyTokenMiddleware, validateInput(reportSchema), sendReport )