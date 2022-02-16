import {STATE_STATUS} from '../constants/index';
import {CATEGORY_BRAND_ACTIONS} from '../constants/categorybrand';

const initialState = {
  popularBrands: {
    status: STATE_STATUS.UNFETCHED,
    data: {},
  },
  allBrands: {
    status: STATE_STATUS.UNFETCHED,
    data: [],
    alphabetNo: [],
    maxPage: 91,
  },

  brandsAdded: [],
  categories: [],
  brandsData: [],

  // brandsStatus: STATE_STATUS.UNFETCHED,

  // brands: {},
};

export const categorybrandReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case CATEGORY_BRAND_ACTIONS.FETCH_BRANDS_BY_CATEGORY:
      return {
        ...state,
        popularBrands: {
          status: STATE_STATUS.FETCHING,
        },
      };
    case CATEGORY_BRAND_ACTIONS.FETCHED_BRANDS_BY_CATEGORY:
      return {
        ...state,
        popularBrands: {
          status: STATE_STATUS.FETCHED,
          data: payload.data,
        },
      };
    case CATEGORY_BRAND_ACTIONS.FAILED_FETCH_BRANDS_BY_CATEGORY:
      return {
        ...state,
        popularBrands: {
          status: STATE_STATUS.FAILED_FETCH,
          error: error,
        },
      };
    case CATEGORY_BRAND_ACTIONS.FETCH_BRANDS:
      if (payload.obj.pageNo == 64 || payload.obj.searchString) {
        return {
          ...state,
          allBrands: {
            status: STATE_STATUS.FETCHING,
            data: [],
            alphabetNo: [],
          },
        };
      }
      return {
        ...state,
        allBrands: {
          ...state.allBrands,
          status: STATE_STATUS.FETCHING,
          alphabetNo: [
            ...state.allBrands.alphabetNo,
            ...payload.obj.categoryCodes,
          ],
        },
      };

    case CATEGORY_BRAND_ACTIONS.FETCHED_BRANDS:
      console.log(
        state.allBrands.data,
        'reducerData',
        payload.data,
        state.allBrands,
        state.allBrands.alphabetNo,
      );
      if (payload.obj.pageNo === 64 || payload.obj.searchString) {
        return {
          ...state,
          allBrands: {
            ...state.allBrands,
            status: STATE_STATUS.FETCHED,
            data: payload.data,
            pageIndex: payload.obj.pageNo,
          },
        };
      }
      return {
        ...state,
        allBrands: {
          ...state.allBrands,
          status: STATE_STATUS.FETCHED,
          data: [...state.allBrands.data, ...payload.data],
          pageIndex: payload.obj.pageNo,
          alphabetEnd: false,
        },
      };

    case CATEGORY_BRAND_ACTIONS.FAILED_FETCH_BRANDS:
      return {
        ...state,
        allBrands: {
          ...state.allBrands,
          status: STATE_STATUS.FAILED_FETCH,
          error: error,
        },
      };

    case CATEGORY_BRAND_ACTIONS.FETCH_BRANDS_ALPHABETS:
      return {
        ...state,
        allBrands: {
          status: STATE_STATUS.FETCHING,
          data: [],
          alphabetNo: [],
        },
      };

    case CATEGORY_BRAND_ACTIONS.FETCHED_BRANDS_ALPHABETS:
      console.log(
        state.allBrands.data,
        'reducerData',
        payload.data,
        state.allBrands,
        state.allBrands.alphabetNo,
      );

      return {
        ...state,
        allBrands: {
          ...state.allBrands,
          status: STATE_STATUS.FETCHED,
          data: payload.data,
          pageIndex: payload.obj.pageNo,
          alphabetEnd: true,
        },
      };

    case CATEGORY_BRAND_ACTIONS.FAILED_FETCH_BRANDS_ALPHABETS:
      return {
        ...state,
        allBrands: {
          ...state.allBrands,
          status: STATE_STATUS.FAILED_FETCH,
          error: error,
        },
      };

    case CATEGORY_BRAND_ACTIONS.ADD_BRAND:
      console.log(state && state.brandsAdded, payload.obj);
      if (state && state.brandsAdded) {
        return {
          ...state,
          brandsAdded: [...state.brandsAdded, payload.obj],
        };
      }
      return {
        ...state,
        brandsAdded: [payload.obj],
      };

    case CATEGORY_BRAND_ACTIONS.REMOVE_BRAND:
      console.log(state && state.brandsAdded, payload.obj);
      if (state && state.brandsAdded) {
        return {
          ...state,
          brandsAdded: [
            ...state.brandsAdded.filter(_ => _.id !== payload.obj.id),
          ],
        };
      }

    case CATEGORY_BRAND_ACTIONS.ADD_CATEGORY:
      if (state && state.categories) {
        return {
          ...state,
          categories: [...state.categories, payload.obj],
        };
      }
      return {
        ...state,
        categories: [payload.obj],
      };

    case CATEGORY_BRAND_ACTIONS.REMOVE_CATEGORY:
      if (state && state.categories) {
        return {
          ...state,
          categories: [
            ...state.categories.filter(_ => _.id !== payload.obj.id),
          ],
        };
      }

    case CATEGORY_BRAND_ACTIONS.ADD_BRAND_DATA:
      if (state && state.brandsData) {
        return {
          ...state,
          brandsData: [...state.brandsData, payload.obj],
        };
      }
      return {
        ...state,
        categories: [payload.obj],
      };

    // case CATEGORY_BRAND_ACTIONS.SET_CATEGORIES:
    //   console.log('dat', payload);
    //   return {
    //     ...state,
    //     categories: [...payload.data],
    //   };

    default:
      return state;
  }
};
