import {STATE_STATUS} from '../constants/index';
import {CATEGORY_BRAND_ACTIONS} from '../constants/categorybrand';
import {PROFILE_ACTIONS} from '../constants/profile';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  selectedcategories: [],
  categoriesbrandsStatus: STATE_STATUS.UNFETCHED,
  userBrands: [],
  userCategories: [],
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
      let currbrand = {...payload.obj};
      currbrand = {
        supplierId: payload.obj.supplierId,
        brandCode: payload.obj.code || payload.obj.brandCode,
        fileKey: payload.obj.fileKey || '',
        businessNature: `${payload.obj.businessNature}`,
        expiryDate: payload.obj.expiryDate ? `${payload.obj.expiryDate}` : '',
        isDeleted: payload.obj.isDeleted ? `${payload.obj.isDeleted}` : '0',
        isRaiseRequest: payload.obj.isRaiseRequest
          ? `${payload.obj.isRaiseRequest}`
          : 'false',
        brandListingUrl: payload.obj.brandListingUrl || '',
        brandName: payload.obj.name || '',
        isDocumentRequired: payload.obj.isDocumentRequired,
        confirmed: payload.obj.confirmed,
      };
      return {
        ...state,
        userBrands: [...state.userBrands, currbrand],
      };

    case CATEGORY_BRAND_ACTIONS.REMOVE_BRAND:
      if (state && state.userBrands) {
        let currbrand = {...payload.obj};
        currbrand = {
          supplierId: payload.obj.supplierId,
          brandCode: payload.obj.code || payload.obj.brandCode,
          fileKey: payload.obj.fileKey || '',
          businessNature: `${payload.obj.businessNature}`,
          expiryDate: payload.obj.expiryDate || '',
          isDeleted: `${payload.obj.isDeleted}` || '0',
          isRaiseRequest: `${payload.obj.isRaiseRequest}` || 'false',
          brandListingUrl: payload.obj.brandListingUrl || '',
          brandName: payload.obj.name || '',
          isDocumentRequired: payload.obj.isDocumentRequired,
        };
        return {
          ...state,
          userBrands: [
            ...state.userBrands.filter(
              _ => _.brandCode !== currbrand.brandCode,
            ),
          ],
        };
      }

    case CATEGORY_BRAND_ACTIONS.ADD_MULTIPLE_BRANDS:
      let currbrands = [...payload.data];
      currbrands = (currbrands || []).map((_, i) => ({
        supplierId: `${_.supplierId}`,
        brandCode: `${_.brandCode}`,
        fileKey: `${_.fileKey}`,
        businessNature: `${_.businessNature}`,
        expiryDate: _.expiryDate ? `${_.expiryDate}` : '',
        isDeleted: `${_.isDeleted}` || '0',
        isRaiseRequest: `${_.isRaiseRequest}` || 'false',
        brandListingUrl: `${_.brandListingUrl}` || '',
        brandName: _.brandName || '',
        isDocumentRequired: _.isDocumentRequired || 0,
        confirmed: true,
      }));
      return {
        ...state,
        userBrands: [...currbrands],
      };

    case CATEGORY_BRAND_ACTIONS.ADD_MULTIPLE_CATEGORIES:
      let currcategories = [...payload.data];
      currcategories = (currcategories || []).map((_, i) => _.categoryCode);
      return {
        ...state,
        userCategories: [...currcategories],
      };

    case CATEGORY_BRAND_ACTIONS.ADD_CATEGORY:
      if (state && state.selectedcategories) {
        return {
          ...state,
          selectedcategories: [...state.selectedcategories, payload.obj],
        };
      }
      return {
        ...state,
        selectedcategories: [payload.obj],
      };

    case CATEGORY_BRAND_ACTIONS.REMOVE_CATEGORY:
      if (state && state.selectedcategories) {
        return {
          ...state,
          selectedcategories: [
            ...state.selectedcategories.filter(_ => _.id !== payload.obj.id),
          ],
        };
      }

    case CATEGORY_BRAND_ACTIONS.UPDATE_BRAND_DATA:
      return {
        ...state,
        userBrands: [...payload.arr],
      };

    case CATEGORY_BRAND_ACTIONS.SET_SELECT_CATEGORIES:
      return {
        ...state,
        selectedcategories: [...payload.data],
      };

    case CATEGORY_BRAND_ACTIONS.FETCHED_CATEGORIES_BRANDS:
      return {
        ...state,
        categoriesbrandsStatus: STATE_STATUS.FETCHED,
      };

    case CATEGORY_BRAND_ACTIONS.SET_CATEGORIES:
      return {
        ...state,
        categories: [...payload.data],
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

        categories: [],
        popularcategories: {
          data: [],
          status: STATE_STATUS.UNFETCHED,
        },
        selectedcategories: [],
      };

    default:
      return state;
  }
};
