import {MASTER_ACTIONS} from '../constants/master';
import {PROFILE_ACTIONS} from '../constants/profile';

const initialState = {
  setIsLoggedIn: () => {},
};

export const masterReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case MASTER_ACTIONS.SET_MASTER_ACTION:
      return {
        ...state,
        setIsLoggedIn: payload.func,
      };
    case PROFILE_ACTIONS.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
