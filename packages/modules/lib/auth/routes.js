'use strict';
import { Login, ForgetPwd, DomainError } from './containers';

export default [
    { type: 'outer', route: { key: 'domainSign', path: '/:domain/signin', component: Login } },
    { type: 'outer', route: { key: 'domainErr', path: '/:domain/error', component: DomainError } },
    { type: 'outer', route: { key: 'domainForget', path: '/:domain/forget', component: ForgetPwd } },
    { type: 'outer', route: { key: 'domain', path: '/:domain', onEnter: ({ params }, replace) => replace(`/${params.domain}/signin`) } },
];