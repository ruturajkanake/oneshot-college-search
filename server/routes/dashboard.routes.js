import { Router } from 'express';
import * as controllers from '../controllers/dashboard.controller.js';
import * as responseCode from '../helpers/response.helper.js';
const { SUCCESS, INTERNAL_ERROR } = responseCode;

const router = Router();

router.get('/dashboard', async (req, res) => {
    try {
        const response = await controllers.dashboard();
        return SUCCESS(res, response, 'Dashboard data sent');
    } catch (err) {
        return INTERNAL_ERROR(res, err.message);
    }
});

export default router;
