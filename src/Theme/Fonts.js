import { PixelRatio,StyleSheet,Platform, Dimensions } from "react-native";
const { width: screenWidth } = Dimensions.get('window');
const scale = screenWidth  / 320;

function normalize(size) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}
const size = {
  h1: normalize(38),
  h2: normalize(34),
  h3: normalize(30),
  input: normalize(15),
  regular: normalize(14),
  medium: normalize(13),
  small: normalize(11),
  extrasmall: normalize(10),
  large:normalize(17),
}

const style = {
  h1: {
    fontSize: size.h1,
  },
  h2: {
    fontSize: size.h2,
  },
  h3: {
    fontSize: size.h3,
  },
  normal: {
    fontSize: size.regular,
  },
  medium: {
    fontSize: size.medium,
  },
  small: {
    fontSize: size.small,
  },  
  large: {
    fontSize: size.large,
  },
  input:{
    fontSize:size.input
  },
  extrasmall:{
    fontSize:size.extrasmall

  } ,   
  font8 : normalize(8),
  font10 : normalize(10),
  font12 : normalize(12),
  font14 : normalize(14),
  font16 : normalize(16),
  font18 : normalize(18),
  font20 : normalize(20),
  font22 : normalize(22),

    margin5: normalize(5),
    margin8: normalize(8),
    margin10: normalize(10),
    margin12: normalize(12),
    margin15: normalize(15),
    margin18: normalize(18),
    margin20: normalize(20),
    margin40:normalize(40),

    height150: normalize(150),
    height10: normalize(10),
    height20: normalize(20),

    padding5: normalize(5),
    padding8: normalize(8),
    padding10: normalize(10),
    padding12: normalize(12),
    padding15: normalize(15),
    padding18: normalize(18),
    padding20: normalize(20),
    padding22: normalize(22),
    padding25: normalize(25),
    padding30: normalize(30),

    heightforCaurosal:normalize(125),
    prdBorderColor:"#A2A2A2",
    prdBorderWidth:normalize(1/2),

    width40:normalize(30),
    width60:normalize(45),


  CustomBlackFont:'Poppins-Black',
  CustomBoldFont:'Poppins-Bold',
  CustomExtraBoldFont:'Poppins-ExtraBold',
  CustomExtraLightFont:'Poppins-ExtraLight',
  CustomLightFont:'Poppins-Light',
  CustomMediumFont:'Poppins-Medium',
  CustomRegularFont:'Poppins-Regular',
  CustomSemiBoldFont:'Poppins-SemiBold',
  CustomSemThinFont:'Poppins-Thin',

}

export default {
  //size,
  style,
}

