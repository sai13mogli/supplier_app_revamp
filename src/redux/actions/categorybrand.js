import {CATEGORY_BRAND_ACTIONS} from '../constants/categorybrand';

export const fetchBrandsByCategory = payloadObj => {
  return {
    type: CATEGORY_BRAND_ACTIONS.FETCH_BRANDS_BY_CATEGORY,
    payload: {
      payloadObj,
    },
  };
};

export const fetchedBrandsByCategory = data => {
  return {
    type: CATEGORY_BRAND_ACTIONS.FETCHED_BRANDS_BY_CATEGORY,
    payload: {
      data,
    },
  };
};

export const failedFetchBrandsByCategory = error => {
  return {
    type: CATEGORY_BRAND_ACTIONS.FAILED_FETCH_BRANDS_BY_CATEGORY,
    error,
  };
};

export const fetchBrandSearchResult = obj => {
  return {
    type: CATEGORY_BRAND_ACTIONS.FETCH_BRANDS,
    payload: {
      obj,
    },
  };
};

export const fetchedBrandSearchResult = (obj, data) => {
  console.log('data', data);
  return {
    type: CATEGORY_BRAND_ACTIONS.FETCHED_BRANDS,
    payload: {
      obj,
      data,
    },
  };
};

export const failedFetchBrandSearchResult = error => {
  return {
    type: CATEGORY_BRAND_ACTIONS.FAILED_FETCH_BRANDS,
    error,
  };
};

export const fetchBrandSearchResultByAlphabet = obj => {
  return {
    type: CATEGORY_BRAND_ACTIONS.FETCH_BRANDS_ALPHABETS,
    payload: {
      obj,
    },
  };
};

export const fetchedBrandSearchResultByAlphabet = (obj, data) => {
  console.log('data', data);
  return {
    type: CATEGORY_BRAND_ACTIONS.FETCHED_BRANDS_ALPHABETS,
    payload: {
      obj,
      data,
    },
  };
};

export const failedFetchBrandSearchResultByAlphabet = error => {
  return {
    type: CATEGORY_BRAND_ACTIONS.FAILED_FETCH_BRANDS_ALPHABETS,
    error,
  };
};

export const addBrand = obj => {
  return {
    type: CATEGORY_BRAND_ACTIONS.ADD_BRAND,
    payload: {
      obj,
    },
  };
};

export const removeBrand = obj => {
  return {
    type: CATEGORY_BRAND_ACTIONS.REMOVE_BRAND,
    payload: {
      obj,
    },
  };
};

export const addCategory = obj => {
  return {
    type: CATEGORY_BRAND_ACTIONS.ADD_CATEGORY,
    payload: {
      obj,
    },
  };
};

export const removeCategory = obj => {
  return {
    type: CATEGORY_BRAND_ACTIONS.REMOVE_CATEGORY,
    payload: {
      obj,
    },
  };
};

export const addBrandData = obj => {
  return {
    type: CATEGORY_BRAND_ACTIONS.ADD_BRAND_DATA,
    payload: {
      obj,
    },
  };
};

export const setPopularCategories = data => {
  return {
    type: CATEGORY_BRAND_ACTIONS.SET_POPULAR_CATEGORIES,
    payload: {
      data,
    },
  };
};

export const setSelectCategories = data => {
  return {
    type: CATEGORY_BRAND_ACTIONS.SET_SELECT_CATEGORIES,
    payload: {
      data,
    },
  };
};

export const setCategories = data => {
  return {
    type: CATEGORY_BRAND_ACTIONS.SET_CATEGORIES,
    payload: {
      data,
    },
  };
};

export const fetchCategoriesBrands = () => {
  return {
    type: CATEGORY_BRAND_ACTIONS.FETCH_CATEGORIES_BRANDS,
  };
};

export const fetchedCategoriesBrands = data => {
  return {
    type: CATEGORY_BRAND_ACTIONS.FETCHED_CATEGORIES_BRANDS,
    payload: {
      data,
    },
  };
};

export const failedFetchCategoriesBrands = error => {
  return {
    type: CATEGORY_BRAND_ACTIONS.FAILED_FETCH_CATEGORIES_BRANDS,
    error,
  };
};
