import { PROFILE_ACTIONS } from '../constants/profile';

export const fetchProfile = () => {
  return {
    type: PROFILE_ACTIONS.FETCH_PROFILE,
  };
};

export const fetchedProfile = data => {
  return {
    type: PROFILE_ACTIONS.FETCHED_PROFILE,
    payload: {
      data,
    },
  };
};

export const failedFetchProfile = error => {
  return {
    type: PROFILE_ACTIONS.FAILED_FETCH_PROFILE,
    error,
  };
};


export const saveAddressAction = () => {
  return {
    type: PROFILE_ACTIONS.FETCH_SAVE_ADDRESS,

  };
}

export const saveBankDetailAction = () => {
  return {
    type: PROFILE_ACTIONS.FETCH_SAVE_BANK_DETAILS,

  };
}

export const saveBankDetailFailed = () => {
  return {
    type: PROFILE_ACTIONS.FAILED_FETCH_SAVE_BANK_DETAILS,

  };
}

export const saveAddressFailed = () => {
  return {
    type: PROFILE_ACTIONS.FAILED_FETCH_SAVE_ADDRESS,
    error,
  };
}

export const fetchBusinessDetails = () => {
  return {
    type: PROFILE_ACTIONS.FETCH_BUSINESS_DETAILS,
  };
};

export const fetchedBusinessDetails = data => {
  return {
    type: PROFILE_ACTIONS.FETCHED_BUSINESS_DETAILS,
    payload: {
      data,
    },
  };
};

export const failedFetchBusinessDetails = error => {
  return {
    type: PROFILE_ACTIONS.FAILED_FETCH_BUSINESS_DETAILS,
    error,
  };
};

export const fetchUpdateBusinessDetails = formData => {
  return {
    type: PROFILE_ACTIONS.FETCH_UPDATE_BUSINESS_DETAILS,
    payload: { formData },
  };
};

export const fetchedUpdateBusinessDetails = (formData, data) => {
  return {
    type: PROFILE_ACTIONS.FETCHED_UPDATE_BUSINESS_DETAILS,
    payload: {
      formData,
      data,
    },
  };
};

export const failedFetchUpdateBusinessDetails = error => {
  return {
    type: PROFILE_ACTIONS.FAILED_FETCH_UPDATE_BUSINESS_DETAILS,
    error,
  };
};

//=================================================================
export const fetchUpdateTDSDetails = formData => {
  return {
    type: PROFILE_ACTIONS.FETCH_UPDATE_TDS_DETAILS,
    payload: { formData },
  };
};

export const fetchedUpdateTDSDetails = (formData, data) => {
  return {
    type: PROFILE_ACTIONS.FETCHED_UPDATE_TDS_DETAILS,
    payload: {
      formData,
      data,
    },
  };
};

export const failedFetchUpdateTDSDetails = error => {
  return {
    type: PROFILE_ACTIONS.FAILED_FETCH_UPDATE_TDS_DETAILS,
    error,
  };
};
//====================================================================

export const fetchAddressDetails = () => {
  return {
    type: PROFILE_ACTIONS.FETCH_ADDRESSES,
  };
};

export const fetchedAddressDetails = data => {
  return {
    type: PROFILE_ACTIONS.FETCHED_FETCH_ADDRESSES,
    payload: {
      data,
    },
  };
};

export const failedFetchAddressDetails = error => {
  return {
    type: PROFILE_ACTIONS.FAILED_FETCH_ADDRESSES,
    error,
  };
};

export const fetchDeleteAddresses = formData => {
  return {
    type: PROFILE_ACTIONS.FETCH_DELETE_ADDRESSES,
    payload: { formData },
  };
};

export const fetchedDeleteAddresses = (formData, data) => {
  return {
    type: PROFILE_ACTIONS.FETCHED_DELETE_ADDRESSES,
    payload: {
      formData,
      data,
    },
  };
};

export const failedFetchDeleteAddresses = error => {
  return {
    type: PROFILE_ACTIONS.FAILED_FETCH_DELETE_ADDRESSES,
    error,
  };
};

export const fetchUpdateBillingAddress = formData => {
  return {
    type: PROFILE_ACTIONS.FETCH_UPDATE_BILLING_ADDRESS,
    payload: { formData },
  };
};

export const fetchedUpdateBillingAddress = (formData, data) => {
  return {
    type: PROFILE_ACTIONS.FETCHED_UPDATE_BILLING_ADDRESS,
    payload: {
      formData,
      data,
    },
  };
};

export const failedFetchUpdateBillingAddress = error => {
  return {
    type: PROFILE_ACTIONS.FAILED_FETCH_UPDATE_BILLING_ADDRESS,
    error,
  };
};

export const fetchBankDetails = () => {
  return {
    type: PROFILE_ACTIONS.FETCH_BANK_DETAILS,
  };
};

export const fetchedBankDetails = data => {
  return {
    type: PROFILE_ACTIONS.FETCHED_BANK_DETAILS,
    payload: {
      data,
    },
  };
};

export const failedFetchBankDetails = error => {
  return {
    type: PROFILE_ACTIONS.FAILED_FETCH_BANK_DETAILS,
    error,
  };
};

export const fetchTdsInfoDetails = () => {
  return {
    type: PROFILE_ACTIONS.FETCH_TDS_INFO_DETAILS,
  };
};

export const fetchedTdsInfoDetails = data => {
  return {
    type: PROFILE_ACTIONS.FETCHED_TDS_INFO_DETAILS,
    payload: {
      data,
    },
  };
};

export const failedFetchTdsInfoDetails = error => {
  return {
    type: PROFILE_ACTIONS.FAILED_FETCH_TDS_INFO_DETAILS,
    error,
  };
};

export const fetchUpdateBankDetails = formData => {
  return {
    type: PROFILE_ACTIONS.FETCH_UPDATE_BANK_DETAILS,
    payload: { formData },
  };
};

export const fetchedUpdateBankDetails = (formData, data) => {
  return {
    type: PROFILE_ACTIONS.FETCHED_UPDATE_BANK_DETAILS,
    payload: {
      formData,
      data,
    },
  };
};

export const failedFetchUpdateBankDetails = error => {
  return {
    type: PROFILE_ACTIONS.FAILED_FETCH_UPDATE_BANK_DETAILS,
    error,
  };
};

export const logout = token => {
  return {
    type: PROFILE_ACTIONS.LOGOUT,
    payload: {
      token,
    },
  };
};

export const setToken = token => {
  return {
    type: PROFILE_ACTIONS.SET_TOKEN,
    payload: {
      token,
    },
  };
};

export const setRmData = data => {
  return {
    type: PROFILE_ACTIONS.SET_RM_DATA,
    payload: {
      data,
    },
  };
};

export const setNavigation = data => {
  return {
    type: PROFILE_ACTIONS.SET_NAVIGATION,
    payload: {
      data,
    },
  };
};
