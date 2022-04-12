'use strict';

import { Request } from '@peace/utils'
import { ApiTable } from '$utils'

const SHA1 = require('crypto-js/sha1');
const Hex = require('crypto-js/enc-hex');

export function sendPhoneCode (phone) {
    const random = Math.floor(Math.random() * Math.pow(10, 4));
    const sig = Hex.stringify(SHA1(phone + random));
    const url = ApiTable.phoneVCode;
    return Request.get(url, {
        phone: phone,
        r: random,
        sig: sig
    });
}

export function checkPhoneCode (phone, code) {
    const url = ApiTable.phoneVCode;
    return Request.post(url, {
        phone: phone,
        code: code
    });
}

export function checkPhone (phone, domain) {
    const url = ApiTable.checkPhone;
    return Request.get(url, { phone, domain });
}