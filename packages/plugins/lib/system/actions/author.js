import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'

export function getEnterprisesDetails(userId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_ENTERPRISERS_DETAILS',
        url: ApiTable.getEnterprisesDetails.replace('{userId}', userId),
        msg: {
            error: '获取企业信息失败'
        },
        reducer: {
            name: 'enterprises'
        }
    });
}

export function getStructureResources(orgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_STRUCTURE_RESOURCES_RANGE',
        url: ApiTable.getStructsList.replace('{id}', orgId),
        msg: {
            error: '数据范围结构物列表获取失败'
        },
        reducer: {
            name: 'structures'
        }
    });
}

export function getDepartmentResources(orgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_DEPARTMENT_RESOURCES',
        url: ApiTable.getDepartmentResources.replace('{orgId}', orgId),
        msg: {
            error: '数据范围列表获取失败'
        },
        reducer: {
            name: 'departmentResources'
        }
    });
}

export function modifyDepartmentResources(departmentId, roleId, userId, data) {
    return dispatch => basicAction({
        type: 'post',
        dispatch: dispatch,
        data,
        actionType: 'MODIFY_DEPARTMENT_RESOURCES',
        url: ApiTable.modifyDepartmentResources.replace('{departmentId}', departmentId)
            + "?platform=true"
            + (roleId ? `&roleId=${roleId}` : '')
            + (userId ? `&userId=${userId}` : ''),
        msg: {
            option: '修改数据范围'
        }
    });
}

export function getAuthorList(orgId, user) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_AUTHOR',
        url: ApiTable.getEnterprisesMembers.replace('{enterpriseId}', orgId),
        msg: {
            error: '获取部门用户信息失败'
        },
        reducer: {
            name: 'authorData',
            params: {
                noClear: true
            }
        },
        callback: (res => {
            if (user && user.departmentName && user.departmentName != '默认') {
                return res.filter(m => m.departmentName == user.departmentName);
            } else {
                if (res.length && res[0].departmentName != '默认') {
                    let defaultIndex = res.findIndex(r => r.departmentName == '默认');
                    if (defaultIndex > 0) {
                        let defaultDep = res[defaultIndex]
                        res.splice(defaultIndex, 1)
                        res.unshift(defaultDep)
                    }
                }
                return res
            }
        })
    });
}

export function getAuthors(orgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_AUTHORLIST',
        url: ApiTable.getAuthorList.replace('{orgId}', orgId),
        msg: {
            error: '获取权限信息失败'
        },
        reducer: {
            name: 'authors'
        }
    });
}

export function getAuthorByRole(roleId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_AUTHOR_BY_ROLEID',
        url: ApiTable.getAuthorByRoleId.replace('{roleId}', roleId),
        msg: {
            error: '获取权限信息失败'
        },
        reducer: {
            name: 'roleAuthor'
        }
    });
}







export function getRoles(orgId) {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_ENTERPRISES_ROLES',
        url: ApiTable.getEnterprisesRoles.replace('{enterpriseId}', orgId),
        msg: {
            error: '获取角色信息失败'
        },
        reducer: {
            name: 'roles',
            params: {
                noClear: true
            }
        }
    });
}

export function getPosts() {
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        actionType: 'GET_POSTS',
        url: ApiTable.getPostsUrl,
        msg: {
            error: '获取职位信息失败'
        },
        reducer: {
            name: 'posts'
        }
    });
}

export function getRoleStructList(organizationId, params = {}) {
   
    return dispatch => basicAction({
        type: 'get',
        dispatch: dispatch,
        query: params,
        actionType: 'GET_ROLE_STRUCT_LIST',
        url: ApiTable.getStructsListWithoutIOTA.replace('{organizationId}', organizationId),
        msg: {
            error: '获取结构物列表失败'
        },
        reducer: {
            name: 'roleStructList'
        }
    });
}

export default {
    getEnterprisesDetails,
    getAuthorList,
    getAuthors,
    getAuthorByRole,
    getStructureResources,
    getDepartmentResources,
    getRoles,
    getPosts,
    getRoleStructList
}