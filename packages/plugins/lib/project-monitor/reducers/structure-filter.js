import Immutable from 'immutable';
import * as T from '../constants/struct';

const initState = {
    isRequesting: false,
    projects: [],
    structures: [],
    structureTypes: [],
    error: null
}
export function structureFilter(state = initState, action) {
    const { type, payload } = action;

    switch (type) {
        case T.StructureGetTypes.REQUESTING:
            return Immutable.fromJS(state).merge({
                isRequesting: true,
                error: null
            }).toJS();
        case T.StructureGetTypes.REQUEST_SUCCESS:
            const structures = payload.data.map(s => {
                return {
                    id: s.id,
                    name: s.name,
                    projects: s.projects,
                    type: s.type
                }
            });
            const projects = structures.reduce((prev, s) => {
                if (s.projects) {
                    s.projects.forEach(p => {
                        if (!prev.some(pr => pr.id == p.id)) {
                            prev.push(p);
                        }
                    });
                }
                return prev;
            }, []);
            const structureTypes = structures.reduce((pre, m) => {
                if (!pre.some(pr => pr.id == m.type.id)) {
                    pre.push(m.type);
                }
                return pre;
            }, []);

            return Immutable.fromJS(state).merge({
                isRequesting: false,
                projects: structures.length > 0 ? projects : state.projects,
                structures: structures,
                structureTypes: structures.length > 0 ? structureTypes : state.structureTypes
            }).toJS();
        case T.StructureGetTypes.REQUEST_ERROR:
            return Immutable.fromJS(state).merge({
                isRequesting: false,
                error: payload.error
            }).toJS();
        default:
            return state;
    }
}

const initStructureParamState = {
    keywords: null,
    projects: [],
    structures: [],
}
export function structureParams(state = initStructureParamState, action) {
    const { type, payload } = action;

    switch (type) {
        case T.StructFilterTypes.CHANGE:
            return Immutable.fromJS(state).merge(payload.params).toJS();
        default:
            return state;
    }
}
const initStructResState = {
    data: null,
    isRequesting: false,
    error: null
};
export function structureResources(state = initStructResState, action) {
    const payload = action.payload;
    switch (action.type) {
        case T.StructResGetTypes.REQUESTING:
            return Immutable.fromJS(state).merge({
                data: null,
                isRequesting: true,
                error: null
            }).toJS();
        case T.StructResGetTypes.REQUEST_SUCCESS:
            let data = Object.keys(payload.data).reduce((p, key) => {
                p[key] = payload.data[key].reduce((p1, item) => {
                    p1[item.id] = item;
                    return p1;
                }, {});
                return p;
            }, {});
            return Immutable.fromJS(state).merge({
                data: data,
                isRequesting: false,
                error: false
            }).toJS();
        case T.StructResGetTypes.REQUEST_ERROR:
            return Immutable.fromJS(state).merge({
                data: null,
                isRequesting: false,
                error: payload.error
            }).toJS();
        default:
            return state;
    }
}
