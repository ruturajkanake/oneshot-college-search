import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import path from 'path';

import { connectFunc } from './config/connect.js';
import dashboardRouter from './routes/dashboard.routes.js';
import collegeRouter from './routes/college.routes.js';
import studentRouter from './routes/student.routes.js';

config();
const app = express();

app.use(express.json());
app.use(morgan('dev'));

const allowedOrigins = ['http://localhost:3000', 'https://ruturaj-college-search.herokuapp.com', 'http://ruturaj-college-search.herokuapp.com'];

app.use(
    cors({
        origin(origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg =
                    'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
);

app.get('/', (req, res) => {
    res.status(200).json('Welcome to College Search!');
});

connectFunc(process.env.NODE_ENV === 'production');

app.use('', dashboardRouter);
app.use('/college', collegeRouter);
app.use('/student', studentRouter);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); //relative path
    });
}

const port = parseInt(process.env.PORT) || 3000;
const server = app.listen(port, () =>
    console.log(`Server started on port ${port}`)
);

export default server;
