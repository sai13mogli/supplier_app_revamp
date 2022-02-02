import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

const  normalize = (size) =>{
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

const Dimension = {
    font8 : normalize(8),
    font10 : normalize(10),
    font12 : normalize(12),
    font14 : normalize(14),
    font16 : normalize(16),
    font15 : normalize(15),
    font18 : normalize(18),
    font20 : normalize(20),
    font22 : normalize(22),
    font24 : normalize(24),
    font28 : normalize(28),
    font30 : normalize(30),
    font34 : normalize(34),
    font36 : normalize(36),


    margin2: normalize(2),
    margin4: normalize(4),
    margin5: normalize(5),
    margin6: normalize(6),
    margin8: normalize(8),
    margin10: normalize(10),
    margin12: normalize(12),
    margin15: normalize(15),
    margin16: normalize(16),
    margin20: normalize(20),
    margin24: normalize(24),
    margin25: normalize(25),
    margin30: normalize(30),
    margin32: normalize(32),
    margin35: normalize(35),
    margin40: normalize(40),
    margin60: normalize(60),

    height5: normalize(5),
    height18: normalize(18),
    height10: normalize(10),
    height20: normalize(20),
    height28: normalize(28),
    height30: normalize(30),
    height35: normalize(35),
    height40: normalize(40),
    height45: normalize(45),
    height50: normalize(50),
    height60: normalize(60),
    height70: normalize(70),
    height80: normalize(80),
    height90: normalize(90),
    height150: normalize(150),
    height100:normalize(100),
    height200: normalize(200),
    height250: normalize(250),
    height245: normalize(245),

    height221: normalize(221),
    height218: normalize(218),

    CTAHeight:normalize(40),
    sliderBottomheight: normalize(100),
    height300: normalize(300),
    verticleSliderHeight: normalize(250),
    closeIconSIze:normalize(24),

    padding2: normalize(2),
    padding4: normalize(4),
    padding5: normalize(5),
    padding6: normalize(6),
    padding8: normalize(8),
    padding10: normalize(10),
    padding12: normalize(12),
    padding13: normalize(13),
    padding15: normalize(15),
    padding16: normalize(16),
    padding18: normalize(16),
    padding20: normalize(20),
    padding25: normalize(25),
    padding32: normalize(32),
    padding35: normalize(35),
    padding30: normalize(30),
    padding40: normalize(40),
    padding45: normalize(45),
    padding50: normalize(50),
    padding55: normalize(55),
    padding60: normalize(60),
    padding80: normalize(80),


    width18: normalize(18),
    width20: normalize(20),
    width35: normalize(35),
    width40: normalize(40),
    width50: normalize(50),
    width60: normalize(60),
    width80: normalize(80),
    width125: normalize(125),
    width100: normalize(100),
    width227:normalize(227),
    width224:normalize(224),
    width250:normalize(250),
    width42: normalize(42),
    width3: normalize(3),

    logoWidth:normalize(132),
    logoHeight:normalize(32),
    googleiconSize:normalize(46),
    sliderimgHeight:normalize(150),
   loginBlockMaxHeight:normalize(320),
   profileImgSize:normalize(74),


    borderwidth1: 1,
    borderRadius3: normalize(3),
                                                   
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


export default Dimension;
