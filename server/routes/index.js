import express from 'express';
import {authRoute} from '../routes/auth.route'
import { adminRoute } from '../routes/admin.route';
import {wardenRoute } from '../routes/warden.route';
 const Routes = express.Router();

Routes.use(authRoute);
Routes.use(adminRoute);
Routes.use(wardenRoute);

export default Routes