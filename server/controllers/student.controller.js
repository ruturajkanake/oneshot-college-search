import Student from '../models/student.model.js';
import { studentIdGenerate } from '../helpers/idGenerator.helper.js';
import College from '../models/college.model.js';

export const create = async (name, year, collegeId, skills) => {
    const college = await College.findOne({ id: collegeId });
    if (!college) throw new Error('College not found');
    const id = studentIdGenerate(college.id);
    const student = new Student({
        id,
        name,
        year,
        collegeId: college._id,
        skills
    });
    await student.save();
    college.no_of_students += 1;
    await college.save();
    return student;
};

export const list = async (collegeId) => {
    const college = await College.findOne({ id: collegeId });
    if (!college) throw new Error('College not found');
    const students = await Student.find({ collegeId: college._id });
    return students;
};

export const details = async (collegeId, studentId) => {
    const college = await College.findOne({ id: collegeId });
    if (!college) throw new Error('College not found');
    const id = studentId.toUpperCase();
    const student = await Student.findOne({ id });
    if (!student) throw new Error('Student not found');
    return student;
};
