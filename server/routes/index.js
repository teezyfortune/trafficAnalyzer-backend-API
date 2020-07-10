import express from 'express';
import {authRoute} from '../routes/auth.route'
import { adminRoute } from '../routes/admin.route';
import {reportRoute } from '../routes/report.route';
 const Routes = express.Router();

Routes.use(authRoute);
Routes.use(adminRoute);
Routes.use(reportRoute);

export default Routes