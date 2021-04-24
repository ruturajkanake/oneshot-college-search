import { Router } from 'express';
import * as controllers from '../controllers/college.controller.js';
import * as responseCode from '../helpers/response.helper.js';
const { BAD_REQUEST, CREATE, SUCCESS, INTERNAL_ERROR } = responseCode;

const router = Router();

router.post('/create', async (req, res) => {
    try {
        const response = await controllers.create(
            req.body.name,
            req.body.year,
            req.body.city,
            req.body.state,
            req.body.country,
            req.body.courses
        );
        return CREATE(res, response, 'College created successfully');
    } catch (err) {
        return BAD_REQUEST(res, err.message);
    }
});

router.get('/list', async (req, res) => {
    try {
        const response = await controllers.list();
        return SUCCESS(res, response, 'All college list sent');
    } catch (err) {
        return INTERNAL_ERROR(res, err.message);
    }
});

router.get('/details/:collegeId', async (req, res) => {
    try {
        const response = await controllers.details(req.params.collegeId);
        return SUCCESS(res, response, 'College details sent');
    } catch (err) {
        return INTERNAL_ERROR(res, err.message);
    }
});

router.get('/state', async (req, res) => {
    try {
        const response = await controllers.collegeByState(req.query.state);
        return SUCCESS(res, response, 'College by state list sent');
    } catch (err) {
        return INTERNAL_ERROR(res, err.message);
    }
});

router.get('/course', async (req, res) => {
    try {
        const response = await controllers.collegeByCourse(req.query.course);
        return SUCCESS(res, response, 'College by course list sent');
    } catch (err) {
        return INTERNAL_ERROR(res, err.message);
    }
});

router.get('/similar/:collegeId', async (req, res) => {
    try {
        const response = await controllers.similarColleges(
            req.params.collegeId
        );
        return SUCCESS(res, response, 'Similar colleges list sent');
    } catch (err) {
        return INTERNAL_ERROR(res, err.message);
    }
});

export default router;
