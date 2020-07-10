import express from 'express';
import { sendReport } from '../controller/report.controller';

export const reportRoute = express.Router();
const BASE_URL = '/report'

reportRoute.post(`${BASE_URL}/report-traffic`, sendReport )