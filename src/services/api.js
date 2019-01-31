import axios from 'axios';
import querystring from 'querystring';
import { store } from '../reducers';

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
    // headers: {
    //     Authorization: store.getState().loginData.user.token,
    // }
});
instance.defaults.headers.common['Authorization'] = store.getState().loginData.user.token;

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
            instance.defaults.headers.common['Authorization'] = `${token_type} ${access_token}`;
            store.dispatch({
                type: 'LOG_IN', payload: {
                    isLoggedIn: true,
                    user: {
                        token: `${token_type} ${access_token}`,
                    }
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

    }
}

export const getProfile = async () => {
    try {
        const res = await instance.get(apiProfilePath);

        if (res) {
            const { data = {} } = res || {};
            const { success = false, customer = {} } = data;
            if (success) {
                console.log(customer);
                return {
                    firstName: customer.customer_name,
                    lastName: customer.customer_lastname,
                    position: customer.info[0].customer_position,
                    address: customer.address,
                    phone: customer.info[0].customer_phone,
                    email: customer.customer_email,
                };
            }


        }
    } catch (err) {
        throw new Error(err);
    }
}
