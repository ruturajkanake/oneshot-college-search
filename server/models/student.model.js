import pkg from 'mongoose';
const { Schema, model } = pkg;

const studentSchema = new Schema(
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
        collegeId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'College'
        },
        skills: [
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

studentSchema.methods.toJSON = function () {
    const student = this;
    const studentObj = student.toObject();

    delete studentObj._id;
    return studentObj;
};

const Student = model('Student', studentSchema);
export default Student;
