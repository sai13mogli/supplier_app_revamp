import {PROFILE_ACTIONS} from '../constants/profile';

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
    payload: {formData},
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
