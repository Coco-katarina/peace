import { basicAction } from '@peace/utils'
import { ApiTable } from '$utils'


export const GET_STRATEGY_REQUEST = "GET_STRATEGY_REQUEST";
export const GET_STRATEGY_SUCCESS = "GET_STRATEGY_SUCCESS";
export const GET_STRATEGY_ERROR = "GET_STRATEGY_ERROR";

const apiUrl = {
  getStrategy: "organizations/{id}/alarms/push-strategies",
  editStrategy: "alarms/push-strategies/{id}",
  deleteStrategy: "alarms/push-strategies/{id}"
};

export function getStrategy(id) {
  return dispatch => basicAction({
      type: 'get',
      dispatch: dispatch,
      actionType: 'GET_STRATEGY',
      url: apiUrl.getStrategy.replace('{id}',id),
      msg: {
          error: '获取告警策略失败'
      },
      reducer: {
          name: 'strategy'
      }
  });
}

export const ADD_STRATEGY_REQUEST = "ADD_STRATEGY_REQUEST";
export const ADD_STRATEGY_SUCCESS = "ADD_STRATEGY_SUCCESS";
export const ADD_STRATEGY_ERROR = "ADD_STRATEGY_ERROR";


export function addStrategy(id, strategyData) {
        return dispatch => basicAction({
            type: 'post',
            data: strategyData,
            dispatch,
            actionType: 'ADD_STRATEGY',
            url: apiUrl.getStrategy.replace("{id}", id),
            msg: {
                option: '新增告警策略'
            }
        });
        //  return dispatch => {
        //    dispatch({ type: ADD_STRATEGY_REQUEST });
           
        //    const url = apiUrl.getStrategy.replace("{id}", id);
        //    return Request.post(url, strategyData).then(res => {
        //        dispatch({
        //          type: ADD_STRATEGY_SUCCESS,
        //          payload: { data: res },
        //          done: "新增告警策略成功"
        //        });
        //      }, err => {
        //        return dispatch({
        //          type: ADD_STRATEGY_ERROR,
        //          error: "新增告警策略失败"
        //        });
        //      });

        //  };
       }

export const EDIT_STRATEGY_REQUEST = "EDIT_STRATEGY_REQUEST";
export const EDIT_STRATEGY_SUCCESS = "EDIT_STRATEGY_SUCCESS";
export const EDIT_STRATEGY_ERROR = "EDIT_STRATEGY_ERROR";


export function editStrategy(id, strategyData) {
  return dispatch => basicAction({
      type: 'put',
      data: strategyData,
      dispatch,
      actionType: 'EDIT_STRATEGY',
      url: apiUrl.editStrategy.replace("{id}", id),
      msg: {
          option: '修改告警策略'
      }
  });
        //  return dispatch => {
        //    dispatch({ type: EDIT_STRATEGY_REQUEST });
        //    const url = apiUrl.editStrategy.replace("{id}", id);
        //    return Request.put(url, strategyData).then(res => {
        //        dispatch({
        //          type: EDIT_STRATEGY_SUCCESS,
        //          payload: { data: res },
        //          done: "修改告警策略成功"
        //        });
        //      }, err => {
        //        return dispatch({
        //          type: EDIT_STRATEGY_ERROR,
        //          error: "修改告警策略失败"
        //        });
        //      });
        //  };
}

export const DELETE_STRATEGY_REQUEST = "DELETE_STRATEGY_REQUEST";
export const DELETE_STRATEGY_SUCCESS = "DELETE_STRATEGY_SUCCESS";
export const DELETE_STRATEGY_ERROR = "DELETE_STRATEGY_ERROR";


export function deleteStrategy(id) {
  return dispatch => basicAction({
      type: 'del',
      dispatch: dispatch,
      actionType: 'DELETE_STRATEGY',
      url: apiUrl.deleteStrategy.replace("{id}", id),
      msg: {
          option: '删除告警策略'
      },
  });
    // return dispatch => {

    //     dispatch({ type: DELETE_STRATEGY_REQUEST });
    //     const url = apiUrl.deleteStrategy.replace("{id}", id);
    //     return Request.delete(url).then(res => {
    //         dispatch({
    //           type: DELETE_STRATEGY_SUCCESS,
    //           payload: { data: res },
    //           done: "删除告警策略成功"
    //         });
    //       }, err => {
    //         return dispatch({
    //           type: DELETE_STRATEGY_ERROR,
    //           error: "删除告警策略失败"
    //         });
    //       });

    // }
}

export default {
  getStrategy,
  addStrategy,
  editStrategy,
  deleteStrategy,
}