'use strict';

import { Login, ForgetPwd } from './containers';

export default [{
    type: 'outer',
    route: {
        key:'signin',
        path: "/signin",
        component: Login
    }
},{ 
    type: 'outer', 
    route: { 
        path: '/forget',
        key:'forget',
        component: ForgetPwd 
    } 
}];
