/*
* 用来定义访问后端的url
* */
const axios = require('axios');

export const client = axios.create({
    baseURI: 'http://39.96.171.189'
});

export const uri = {
    detail: 'http://39.96.171.189/api/detail/',
    sdk: 'http://39.96.171.189/api/js_sdk'
};

export const ak = 'hHlftViSAp02u0ZsNuRQyI0wyBuvzulP';