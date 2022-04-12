import * as actionTypes from "../actions/integrationInfo";
import * as actionTypesThings from "../actions/things";
import Immutable from "immutable";

const initialState = {
  isFetching: false,
  error: null,
  items: {},
  thingsList: {}
};

export function thingsData(state = initialState, action) {
  const { payload } = action;
    switch (action.type) {
      case actionTypesThings.THINGS_GET_WHOLEVIEW:
        return Object.assign({}, state, {
          isFetching: true,
          error: null,
          items: {}
        });
      case actionTypesThings.THINGS_GET_WHOLEVIEW_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          items: payload
        });
      case actionTypesThings.THINGS_GET_WHOLEVIEW_ERROR:
        return Object.assign({}, state, {
          isFetching: false,
          error: payload.error
        });

      case actionTypesThings.THINGS_LIST_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
          error: null,
        });
      case actionTypesThings.THINGS_LIST_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          thingsList: payload
        });
      case actionTypesThings.THINGS_LIST_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          error: payload.error
        });

      default:
        return state;
    }

}