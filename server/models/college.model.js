import pkg from 'mongoose';
const { Schema, model } = pkg;

const collegeSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        year: {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true,
            default: ''
        },
        state: {
            type: String,
            required: true,
            default: ''
        },
        country: {
            type: String,
            required: true,
            default: ''
        },
        no_of_students: {
            type: Number,
            required: true,
            default: 0
        },
        courses: [
            {
                type: String,
                trim: true
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

collegeSchema.methods.toJSON = function () {
    const college = this;
    const collegeObj = college.toObject();

    delete collegeObj._id;
    return collegeObj;
};

const College = model('College', collegeSchema);
export default College;
