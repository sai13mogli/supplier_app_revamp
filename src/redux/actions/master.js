import {MASTER_ACTIONS} from '../constants/master';

export const setMasterAction = func => {
  return {
    type: MASTER_ACTIONS.SET_MASTER_ACTION,
    payload: {
      func,
    },
  };
};
