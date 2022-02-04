import { Dimensions } from 'react-native';

const window = Dimensions.get('window');

export const screenHeight = window.height;

export const screenWidth = window.width;

export const wp = (percentage) => {
  const value = (percentage * screenWidth) / 100;
  return Math.round(value);
};

const baselineHeight = screenHeight < 750 ? 680 : 800;

export const scale = value => Math.round((screenHeight / baselineHeight) * value);

export default null;