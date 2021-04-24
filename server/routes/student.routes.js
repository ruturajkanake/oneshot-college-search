import { Router } from 'express';
import * as controllers from '../controllers/student.controller.js';
import * as responseCode from '../helpers/response.helper.js';
const { BAD_REQUEST, CREATE, SUCCESS, INTERNAL_ERROR } = responseCode;

const router = Router();

router.post('/create', async (req, res) => {
    try {
        const response = await controllers.create(
            req.body.name,
            req.body.year,
            req.body.collegeId,
            req.body.skills
        );
        return CREATE(res, response, 'Student created successfully');
    } catch (err) {
        return BAD_REQUEST(res, err.message);
    }
});

router.get('/list/:collegeId', async (req, res) => {
    try {
        const response = await controllers.list(req.params.collegeId);
        return SUCCESS(res, response, 'Students list sent');
    } catch (err) {
        return INTERNAL_ERROR(res, err.message);
    }
});

router.get('/details/:collegeId/:studentId', async (req, res) => {
    try {
        const response = await controllers.details(
            req.params.collegeId,
            req.params.studentId
        );
        return SUCCESS(res, response, 'Student details sent');
    } catch (err) {
        return INTERNAL_ERROR(res, err.message);
    }
});

export default router;
