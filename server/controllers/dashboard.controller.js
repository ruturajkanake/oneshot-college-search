import College from '../models/college.model.js';
import Student from '../models/student.model.js';

export const dashboard = async () => {
    const stateColleges = await College.aggregate([
        {
            $group: {
                _id: '$state',
                count: { $sum: 1 }
            }
        }
    ]);
    const collegesByCourses = await College.aggregate([
        {
            $unwind: '$courses'
        },
        {
            $group: {
                _id: '$courses',
                count: { $sum: 1 }
            }
        }
    ]);
    let numberOfColleges = 0;
    stateColleges.forEach((college) => (numberOfColleges += college.count));
    const numberOfStudents = await Student.countDocuments({});
    const cities = await College.distinct('city');
    const citiesServing = cities.length;
    const coursesOffered = collegesByCourses.length;
    const statesServing = stateColleges.length;
    const responseData = {
        stateColleges,
        collegesByCourses,
        numberOfColleges,
        numberOfStudents,
        coursesOffered,
        citiesServing,
        statesServing
    };
    return responseData;
};
