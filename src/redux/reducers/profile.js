import {STATE_STATUS} from '../constants/index';
import {PROFILE_ACTIONS} from '../constants/profile';

const initialState = {
  status: STATE_STATUS.UNFETCHED,
  data: [],
  token: '',
  navigateProfile: true,
  businessDetails: {
    status: STATE_STATUS.UNFETCHED,
    data: {},
    error: null,
  },
  addressesDetails: {
    status: STATE_STATUS.UNFETCHED,
    data: [],
    error: null,
  },
  bankDetails: {
    status: STATE_STATUS.UNFETCHED,
    data: {},
    error: null,
  },
  tdsInfoDetails: {
    status: STATE_STATUS.UNFETCHED,
    data: {},
    error: null,
  },
  categoryBrandDetails: {
    status: STATE_STATUS.UNFETCHED,
    data: {},
    error: null,
  },
};

export const profileReducer = (state = initialState, action) => {
  const {type, payload, error} = action;
  switch (type) {
    case PROFILE_ACTIONS.FETCH_PROFILE:
      return {
        ...state,
        status: STATE_STATUS.FETCHING,
        // data: {},
      };
    case PROFILE_ACTIONS.FETCHED_PROFILE:
      return {
        ...state,
        status: STATE_STATUS.FETCHED,
        data: {...state.data, ...payload.data},
      };
    case PROFILE_ACTIONS.FAILED_FETCH_PROFILE:
      return {
        ...state,
        status: STATE_STATUS.FAILED_FETCH,
        // data: {},
      };

    case PROFILE_ACTIONS.SET_RM_DATA:
      return {
        ...state,
        data: {...state.data, ...payload.data},
      };

    case PROFILE_ACTIONS.SET_NAVIGATION:
      return {
        ...state,
        navigateProfile: payload.data,
      };

    case PROFILE_ACTIONS.FETCH_BUSINESS_DETAILS:
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          status: STATE_STATUS.FETCHING,
          data: {},
          error: null,
        },
      };
    case PROFILE_ACTIONS.FETCHED_BUSINESS_DETAILS:
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          status: STATE_STATUS.FETCHED,
          data: payload.data,
          error: null,
        },
      };
    case PROFILE_ACTIONS.FAILED_FETCH_BUSINESS_DETAILS:
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          status: STATE_STATUS.FAILED_FETCH,
          error: error,
        },
      };

    case PROFILE_ACTIONS.FETCH_UPDATE_BUSINESS_DETAILS:
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          status: STATE_STATUS.UPDATING,
        },
      };
    case PROFILE_ACTIONS.FETCHED_UPDATE_BUSINESS_DETAILS:
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          status: STATE_STATUS.UPDATED,
          // data: payload.data,
        },
      };
    case PROFILE_ACTIONS.FAILED_FETCH_UPDATE_BUSINESS_DETAILS:
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          status: STATE_STATUS.FAILED_UPDATE,
          error: error,
        },
      };
    //========================================================== TDS Detail
    case PROFILE_ACTIONS.FETCH_UPDATE_TDS_DETAILS:
      return {
        ...state,
        tdsInfoDetails: {
          ...state.tdsInfoDetails,
          status: STATE_STATUS.UPDATING,
        },
      };
    case PROFILE_ACTIONS.FETCHED_UPDATE_TDS_DETAILS:
      return {
        ...state,
        tdsInfoDetails: {
          ...state.tdsInfoDetails,
          status: STATE_STATUS.UPDATED,
          // data: payload.data,
        },
      };
    case PROFILE_ACTIONS.FAILED_FETCH_UPDATE_TDS_DETAILS:
      return {
        ...state,
        tdsInfoDetails: {
          ...state.tdsInfoDetails,
          status: STATE_STATUS.FAILED_UPDATE,
          error: error,
        },
      };
    //========================================================== TDS Detail
    case PROFILE_ACTIONS.FETCH_ADDRESSES:
      return {
        ...state,
        addressesDetails: {
          ...state.addressesDetails,
          status: STATE_STATUS.FETCHING,
          data: [],
          error: null,
        },
      };
    case PROFILE_ACTIONS.FETCHED_FETCH_ADDRESSES:
      return {
        ...state,
        addressesDetails: {
          ...state.addressesDetails,
          status: STATE_STATUS.FETCHED,
          data: payload.data,
          error: null,
        },
      };
    case PROFILE_ACTIONS.FAILED_FETCH_ADDRESSES:
      return {
        ...state,
        addressesDetails: {
          ...state.addressesDetails,
          status: STATE_STATUS.FAILED_FETCH,
          data: [],
          error: error,
        },
      };
    //=====================================================
    case PROFILE_ACTIONS.FETCH_DELETE_ADDRESSES:
      return {
        ...state,
        addressesDetails: {
          ...state.addressesDetails,
          status: STATE_STATUS.FETCHING,
          data: [],
          error: null,
        },
      };
    case PROFILE_ACTIONS.FETCHED_DELETE_ADDRESSES:
      return {
        ...state,
        addressesDetails: {
          ...state.addressesDetails,
          status: STATE_STATUS.FETCHED,
          error: null,
        },
      };
    case PROFILE_ACTIONS.FAILED_FETCH_DELETE_ADDRESSES:
      return {
        ...state,
        addressesDetails: {
          ...state.addressesDetails,
          status: STATE_STATUS.FAILED_FETCH,
          data: {},
          error: error,
        },
      };
    //=====================================================
    case PROFILE_ACTIONS.FETCH_UPDATE_BILLING_ADDRESS:
      return {
        ...state,
        addressesDetails: {
          ...state.addressesDetails,
          status: STATE_STATUS.UPDATING,
        },
      };
    case PROFILE_ACTIONS.FETCHED_UPDATE_BILLING_ADDRESS:
      return {
        ...state,
        addressesDetails: {
          ...state.addressesDetails,
          status: STATE_STATUS.UPDATED,
        },
      };
    case PROFILE_ACTIONS.FAILED_FETCH_UPDATE_BILLING_ADDRESS:
      return {
        ...state,
        addressesDetails: {
          ...state.addressesDetails,
          status: STATE_STATUS.FAILED_UPDATE,
          error: error,
        },
      };
    case PROFILE_ACTIONS.FETCH_BANK_DETAILS:
      return {
        ...state,
        bankDetails: {
          ...state.bankDetails,
          status: STATE_STATUS.FETCHING,
          data: {},
          error: null,
        },
      };
    case PROFILE_ACTIONS.FETCHED_BANK_DETAILS:
      return {
        ...state,
        bankDetails: {
          ...state.bankDetails,
          status: STATE_STATUS.FETCHED,
          data: payload.data,
          error: null,
        },
      };
    case PROFILE_ACTIONS.FAILED_FETCH_BANK_DETAILS:
      return {
        ...state,
        bankDetails: {
          ...state.bankDetails,
          status: STATE_STATUS.FAILED_FETCH,
          data: {},
          error: error,
        },
      };
    case PROFILE_ACTIONS.FETCH_TDS_INFO_DETAILS:
      return {
        ...state,
        tdsInfoDetails: {
          ...state.tdsInfoDetails,
          status: STATE_STATUS.FETCHING,
          data: [],
          error: null,
        },
      };
    case PROFILE_ACTIONS.FETCHED_TDS_INFO_DETAILS:
      return {
        ...state,
        tdsInfoDetails: {
          ...state.tdsInfoDetails,
          status: STATE_STATUS.FETCHED,
          data: payload.data,
          error: null,
        },
      };
    case PROFILE_ACTIONS.FAILED_FETCH_TDS_INFO_DETAILS:
      return {
        ...state,
        tdsInfoDetails: {
          ...state.tdsInfoDetails,
          status: STATE_STATUS.FAILED_FETCH,
          data: [],
          error: error,
        },
      };
    case PROFILE_ACTIONS.FETCH_UPDATE_BANK_DETAILS:
      return {
        ...state,
        bankDetails: {
          ...state.bankDetails,
          status: STATE_STATUS.UPDATING,
        },
      };
    case PROFILE_ACTIONS.FETCHED_UPDATE_BANK_DETAILS:
      return {
        ...state,
        bankDetails: {
          ...state.bankDetails,
          status: STATE_STATUS.UPDATED,
          data: payload.data,
        },
      };
    case PROFILE_ACTIONS.FAILED_FETCH_UPDATE_BANK_DETAILS:
      return {
        ...state,
        bankDetails: {
          ...state.bankDetails,
          status: STATE_STATUS.FAILED_UPDATE,
          error: error,
        },
      };
    case PROFILE_ACTIONS.FETCH_CATEGORIES_BRANDS:
      return {
        ...state,
        categoryBrandDetails: {
          ...state.categoryBrandDetails,
          status: STATE_STATUS.FETCHING,
          data: {},
          error: null,
        },
      };
    case PROFILE_ACTIONS.FETCHED_CATEGORIES_BRANDS:
      return {
        ...state,
        categoryBrandDetails: {
          ...state.categoryBrandDetails,
          status: STATE_STATUS.FETCHED,
          categories: payload.data.categories,
          brands: payload.data.brands,
          error: null,
        },
      };
    case PROFILE_ACTIONS.FAILED_FETCH_CATEGORIES_BRANDS:
      return {
        ...state,
        categoryBrandDetails: {
          ...state.categoryBrandDetails,
          status: STATE_STATUS.FAILED_FETCH,
          error: error,
        },
      };

    case PROFILE_ACTIONS.LOGOUT:
      return {
        ...initialState,
      };
    case PROFILE_ACTIONS.SET_TOKEN:
      return {
        ...state,
        token: payload.token,
      };
    default:
      return state;
  }
};
