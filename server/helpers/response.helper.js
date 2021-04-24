export const SUCCESS = (res, data, message) => {
    return res.status(200).json({ status: 'success', data, message });
};

export const CREATE = (res, data, message) => {
    return res.status(201).json({ status: 'success', data, message });
};

export const BAD_REQUEST = (res, data) => {
    return res
        .status(400)
        .json({ status: 'fail', data, message: 'Bad Request' });
};

export const FORBIDDEN = (res, data) => {
    return res.status(403).json({ status: 'fail', data, message: 'Forbidden' });
};

export const NOT_FOUND = (res, data) => {
    return res.status(404).json({ status: 'fail', data, message: 'Not Found' });
};

export const INTERNAL_ERROR = (res, data) => {
    return res
        .status(500)
        .json({ status: 'fail', data, message: 'Internal Server Error' });
};
