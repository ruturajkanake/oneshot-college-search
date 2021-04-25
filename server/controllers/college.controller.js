import College from '../models/college.model.js';
import { collegeIdGenerate } from '../helpers/idGenerator.helper.js';

export const create = async (name, year, city, state, country, courses) => {
    const id = collegeIdGenerate();
    const college = new College({
        id,
        name,
        year,
        city,
        state,
        country,
        courses
    });
    await college.save();
    return college;
};

export const list = async () => {
    const colleges = await College.find({});
    return colleges;
};

export const details = async (collegeId) => {
    const id = collegeId.toUpperCase();
    const college = await College.findOne({ id });
    if (!college) throw new Error('College not Found');
    return college;
};

export const collegeByState = async (state) => {
    const colleges = await College.find({ state });
    return colleges;
};

export const collegeByCourse = async (course) => {
    const courseName = course.replace(/\+/g, ' ');
    const colleges = await College.find({ courses: courseName });
    return colleges;
};

export const similarColleges = async (collegeId) => {
    const id = collegeId.toUpperCase();
    const college = await College.findOne({ id });
    if (!college) throw new Error('College not Found');
    const colleges = await College.find({
        id: { $ne: college.id },
        city: college.city,
        courses: { $in: college.courses }
    }).limit(6);

    if (colleges.length >= 6) {
        return colleges;
    }
    const collegesInState = await College.find({
        id: { $ne: college.id },
        state: college.state,
        city: { $ne: college.city },
        courses: { $in: college.courses }
    }).limit(6 - colleges.length);

    const stateColleges = [...colleges, ...collegesInState];
    if (stateColleges.length >= 6) {
        return stateColleges;
    }
    const collegesInCountry = await College.find({
        id: { $ne: college.id },
        country: college.country,
        state: { $ne: college.state },
        courses: { $in: college.courses }
    }).limit(6 - stateColleges.length);

    const countryColleges = [...stateColleges, ...collegesInCountry];
    if (countryColleges.length >= 6) {
        return countryColleges;
    }
    const allColleges = await College.find({
        id: { $ne: college.id }
    }).limit(6 - countryColleges.length);

    return [...countryColleges, ...allColleges];
};
