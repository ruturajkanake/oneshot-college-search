import pkg from 'mongoose';
const { connect, disconnect } = pkg;

// Database URL Picker
const DB_PARA = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
};

/**
 * Connect to MonngoDB via mongoose
 * @param {boolean} production_env - Param if production environment is to be used
 */
export const connectFunc = async (production_env) => {
    const DB_URI = production_env
        ? process.env.MONGODB_URL
        : process.env.TESTDB_URL || 'mongodb://127.0.0.1:27017/eduspark';
    try {
        const mongooseInstance = await connect(DB_URI, DB_PARA);
        console.log('Connected to Database');
        return mongooseInstance;
    } catch (error) {
        console.error.bind('Connection Error: ', error);
    }
};

/**
 * Disconnects from MongoDB via mongoose
 */
export const closeFunc = () => {
    console.log('Connection close');
    return disconnect();
};
