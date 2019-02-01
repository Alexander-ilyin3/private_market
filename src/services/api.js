import axios from 'axios';
import querystring from 'querystring';
import { store } from '../reducers';

import {
    apiBaseURL,
    apiLoginPath,
    apiSignupPath,
    apiForgotPassword,
    apiEmailVerify,
    apiLogoutPath,
    apiProfilePath,
    apiprofileUpdatePath,
} from '../config';

const instance = axios.create({
    baseURL: apiBaseURL,
    paramsSerializer(params) {
        return querystring.stringify(params);
    },
    headers: {
        "Content-Type": "application/json",
    },
});

export const signup = async (signUpData) => {
    const signUpDataSend = {
        customer_name: signUpData.name,
        customer_email: signUpData.email,
        customer_password: signUpData.password,
        c_password: signUpData.repeatPassword,
    };
    try {

        await instance.post(apiSignupPath, signUpDataSend);
        return 'Регистрация завершена. На вашу почту были отправлены дальнейшие инструкции';
    } catch (err) {
        const { response = {} } = err || {};
        const { data = {} } = response;
        const { error = {} } = data;
        if (typeof error === 'string') {
            throw new Error(error);
        }
        if (error.c_password) {
            throw new Error(error.c_password);
        }
        if (error.customer_password) {
            throw new Error(error.customer_password);
        }
        throw new Error('Signup Failed!');
    } finally {

    }
}

export const signin = async (loginData) => {
    const loginDataSend = {
        customer_email: loginData.email,
        customer_password: loginData.password,
    }
    try {
        const res = await instance.post(apiLoginPath, loginDataSend);
        const { data = {} } = res || {};
        const { token_type, access_token } = data;

        if (data.success) {
            store.dispatch({
                type: 'LOG_IN', payload: {
                    isLoggedIn: true,
                    token: `${token_type} ${access_token}`,
                }
            });
            return 'Авторизовано';
        }
    } catch (err) {
        const { response = {} } = err || {};
        const { data = {} } = response;
        const { error = {} } = data;
        console.log(error);
        if (typeof error === 'string') {
            throw new Error(error);
        }

    } finally {

    }
}

export const logout = async () => {
    try {
        const res = await instance.post(apiLogoutPath);
        if (res) {
            store.dispatch({
                type: 'LOG_OUT',
            })
            return (true);
        }

    } catch (err) {

    } finally {

    }
}

export const getProfile = async () => {
    try {
        const res = await instance.get(apiProfilePath);

        if (res) {
            const { data = {} } = res || {};
            const { success = false, customer = {} } = data;
            if (success) {
                return {
                    id_address: customer.address[0] ? customer.address[0].id_address : null,
                    url: customer.info[0] ? customer.info[0].customer_website || '' : '',
                    firstName: customer.customer_name,
                    lastName: customer.customer_lastname,
                    position: customer.info[0] ? customer.info[0].customer_position || '' : '',
                    address: customer.address[0] || {},
                    phone: customer.info[0] ? customer.info[0].customer_phone || '' : '',
                    id_contacts_info: customer.info[0] ? customer.info[0].id_contacts_info : null,
                    email: customer.customer_email,

                };
            }


        }
    } catch (err) {
        throw new Error(err);
    } finally {

    }
}

export const updateProfile = async (userData) => {
    try {
        console.log(userData)
        const res = await instance.put(apiprofileUpdatePath, userData);
        if (res) {
            return res;
        }
    } catch (err) {
        throw new Error(err);
    } finally {
    }
}

instance.interceptors.response.use(
    (res) => {
        store.dispatch({ type: 'LOADING_STOP' });
        console.log('resp use interceptors');
        return res;
    }
);

instance.interceptors.request.use(
    (config) => {
        console.log('req use interceptors');
        const token = store.getState().loginData.token;
        store.dispatch({ type: 'LOADING_START' });
        const updatedConfig = config;
        if (token) {
            updatedConfig.headers.Authorization = token;
        }
        
        return {
            ...updatedConfig,
        };

    },
);