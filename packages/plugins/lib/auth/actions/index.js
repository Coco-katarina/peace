/**
 * Created by liu.xinyi
 * on 2016/4/1.
 */
'use strict';
import auth from './auth';
import resetPwd from './reset-pwd';
import validatePhone from './validate-phone';
import project from './project';

export default {
    ...auth,
    ...resetPwd,
    ...validatePhone,
    ...project
};