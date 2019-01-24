import axios from 'axios';

import {
    apiBaseURL,
    apiLoginPath,
    apiSignupPath,
    apiForgotPassword,
    apiEmailVerify,
    apiProfilePath,
} from '../config';

const instance = axios.create({
    baseURL: apiBaseURL,
    paramsSerializer(params) {
        return querystring.stringify(params);
    },
});
