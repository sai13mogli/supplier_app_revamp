import {STATE_STATUS} from '../constants/index';
import {CATEGORY_BRAND_ACTIONS} from '../constants/categorybrand';
import {PROFILE_ACTIONS} from '../constants/profile';

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
  popularcategories: {
    data: [],
    status: STATE_STATUS.UNFETCHED,
  },
  selectcategories: [],
  confirmedbrands: [],
  categoriesbrandsStatus: STATE_STATUS.UNFETCHED,

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
            params: ['A'],
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
      if (state && state.brandsAdded) {
        console.log('currbrand', state && state.brandsAdded);
        let currbrand = (state && state.brandsAdded).find(
          _ => _.name == payload.obj.name,
        );
        if (currbrand && currbrand.name) {
          return {
            ...state,
            brandsAdded: [
              ...state.brandsAdded.filter(
                _ => (_.brandCode || _.code) !== payload.obj.code,
              ),
            ],
          };
        } else {
          console.log('addbrand', payload.obj);
          return {
            ...state,
            brandsAdded: [...state.brandsAdded, payload.obj],
          };
        }
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

    case CATEGORY_BRAND_ACTIONS.ADD_MULTIPLE_BRANDS:
      // if (state && state.brandsAdded) {
      //   console.log('currbrand', state && state.brandsAdded);
      //   let currbrand = (state && state.brandsAdded).find(
      //     _ => _.name == payload.obj.name,
      //   );
      //   if (currbrand && currbrand.name) {
      //     console.log('curr brand is already added', currbrand);
      //   } else {
      //     return {
      //       ...state,
      //       brandsAdded: [...state.brandsAdded, payload.obj],
      //     };
      //   }
      // }
      return {
        ...state,
        brandsAdded: payload.data,
      };

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

    case CATEGORY_BRAND_ACTIONS.UPDATE_BRAND_DATA:
      if (state && state.brandsData) {
        let currObj = ([...state.brandsData] || []).find(
          _ => _.brandCode == payload.obj.brandCode,
        );
        let updateObj = {
          ...currObj,
          ...payload.obj,
        };

        let updateBrandsData = ([...state.brandsData] || []).filter(
          _ => _.brandCode !== payload.obj.brandCode,
        );

        return {
          ...state,
          brandsData: [...updateBrandsData, updateObj],
        };
      }

    case CATEGORY_BRAND_ACTIONS.SET_POPULAR_CATEGORIES:
      return {
        ...state,
        popularcategories: {
          ...state.popularcategories,
          data: [...payload.data],
          status: STATE_STATUS.FETCHED,
        },
      };

    case CATEGORY_BRAND_ACTIONS.SET_SELECT_CATEGORIES:
      return {
        ...state,
        selectcategories: [...payload.data],
      };

    case CATEGORY_BRAND_ACTIONS.FETCHED_CATEGORIES_BRANDS:
      return {
        ...state,
        initialcategories: [...(payload.data.categories || [])],
        confirmedbrands: [...(payload.data.brands || [])],
        categoriesbrandsStatus: STATE_STATUS.FETCHED,
      };

    case CATEGORY_BRAND_ACTIONS.SET_CATEGORIES:
      return {
        ...state,
        categories: [...payload.data],
      };

    case CATEGORY_BRAND_ACTIONS.CONFRIM_BRANDS:
      // if (state && state.confirmedbrands && state.confirmedbrands.length) {
      //   let brandIds = ([...payload.data] || []).map;
      // }

      return {
        ...state,
        confirmedbrands: [...state.confirmedbrands, ...payload.data],
      };

    case PROFILE_ACTIONS.LOGOUT:
      return {
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
        popularcategories: {
          data: [],
          status: STATE_STATUS.UNFETCHED,
        },
        selectcategories: [],
      };

    default:
      return state;
  }
};
