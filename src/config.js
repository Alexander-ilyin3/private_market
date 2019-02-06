

export const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

export const ROOT_DOMAIN = process.env.REACT_APP_ROOT_DOMAIN || '/';

const apiCustomer = '/customer';
export const apiLoginPath = `${apiCustomer}/login`;
export const apiSignupPath = `${apiCustomer}/register`;
export const apiRegisterSuccessPath = '/register/success';
export const apiRecoveryPasswordPath = '/recovery';
export const apiRecoverySuccessPath = `${apiRecoveryPasswordPath}/success`;
export const apiLogoutPath = `${apiCustomer}/logout`;
export const apiProfilePath = `${apiCustomer}/details`;
export const apiprofileUpdatePath = `${apiCustomer}/update`;
export const apiNewOrderPath = '/neworder/';
export const apiStatistic = '/statistic/';
export const apiProducts = '/products/';
export const apiOrders = '/orders/';
export const apiPaymentLog = '/paymentlog/';
