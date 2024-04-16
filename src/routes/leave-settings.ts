import express from 'express';
import { addLeaveSettingsController } from '../controller/leaveSettings/addLeaveSettings.controller';

const leaveSettingsRoute = express.Router();

leaveSettingsRoute.post('/add', addLeaveSettingsController);

export default leaveSettingsRoute;
