import {
    CHAR_SET,
    COLLEGE_ID_LENGTH,
    STUDENT_ID_LENGTH
} from '../config/constants.js';

export const collegeIdGenerate = () => {
    let result = '';
    for (let i = COLLEGE_ID_LENGTH; i > 0; i--)
        result += CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
    return result;
};

export const studentIdGenerate = (collegeId) => {
    let result = collegeId;
    for (let i = STUDENT_ID_LENGTH; i > 0; i--)
        result += CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
    return result;
};
