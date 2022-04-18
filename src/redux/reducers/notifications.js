import { STATE_STATUS } from '../constants/index';
import { NOTIFICATIONS_ACTIONS } from '../constants/notifications';
import { PROFILE_ACTIONS } from '../constants/profile';
import { OrderedMap } from 'immutable';
const initialState = {
  status: STATE_STATUS.UNFETCHED,
  data: [],
  maxPage: 0,
  page: 0,
};

const getTime = (time, ind) => {
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  let date = new Date(time);
  let currentDate = new Date();
  if (currentDate.getFullYear() == date.getFullYear()) {
    if (currentDate.getMonth() == date.getMonth()) {
      if (currentDate.getDate() == date.getDate()) {
        return `Today`;
      } else if (currentDate.getDate() - date.getDate() == 1) {
        return `Yesterday`;
      } else {
        return `${date.getDate()} ${months[date.getMonth()]
          } ${date.getFullYear()}`;
      }
    } else {
      return `${date.getDate()} ${months[date.getMonth()]
        } ${date.getFullYear()}`;
    }
  } else {
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }
};

export const notificationsReducer = (state = initialState, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case NOTIFICATIONS_ACTIONS.FETCH_NOTIFICATIONS:
      if (payload.page == 0) {
        return {
          // data: [],
          ...state,
          page: payload.page,
          status: STATE_STATUS.FETCHING,
        };
      } else {
        return {
          ...state,
          page: payload.page,
          status: STATE_STATUS.FETCHING,
        };
      }
    case NOTIFICATIONS_ACTIONS.FETCHED_NOTIFICATIONS:
      let prevData = [];
      if (payload.page != 0) {
        state.data.map(_ => {
          prevData = [...prevData, ..._.data];
        });
      }
      let newData =
        payload.page == 0
          ? payload.data.dataList
          : [...prevData, ...payload.data.dataList];

      let groupedObj = {};
      newData = newData.map(_ => {
        if (_.id) {
          if (groupedObj[`${getTime(_.createdAt)}`]) {
            groupedObj[`${getTime(_.createdAt)}`] = [
              ...groupedObj[`${getTime(_.createdAt)}`],
              _,
            ];
          } else {
            groupedObj[`${getTime(_.createdAt)}`] = [];
            groupedObj[`${getTime(_.createdAt)}`] = [
              ...groupedObj[`${getTime(_.createdAt)}`],
              _,
            ];
          }
        }
      });

      groupedObj = new OrderedMap(groupedObj).toList().toArray();
      groupedObj = groupedObj.map(_ => ({
        title: getTime(_[0].createdAt),
        data: _,
      }));
      if (payload.page == 0) {
        return {
          ...state,
          maxPage: payload.data.totalPages,
          status: STATE_STATUS.FETCHED,
          data: groupedObj,
        };
      } else {
        return {
          ...state,
          maxPage: payload.data.totalPages,
          status: STATE_STATUS.FETCHED,
          data: groupedObj,
        };
      }
    case NOTIFICATIONS_ACTIONS.FAILED_FETCH_NOTIFICATIONS:
      return {
        ...state,
        status: STATE_STATUS.FAILED_FETCH,
        error: error,
      };
    case PROFILE_ACTIONS.LOGOUT:
      return {
        status: STATE_STATUS.UNFETCHED,
        data: [],
        maxPage: 0,
        page: 0,
      };
    default:
      return state;
  }
};
