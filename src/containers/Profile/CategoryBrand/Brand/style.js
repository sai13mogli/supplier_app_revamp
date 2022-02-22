import {StyleSheet} from 'react-native';
import Colors from '../../../../Theme/Colors';
import Dimension from '../../../../Theme/Dimension';
import {Dimensions} from 'react-native';

const styles = StyleSheet.create({
  submit: {
    backgroundColor: Colors.BrandColor,
    marginHorizontal: Dimension.margin10,
  },
  bottombtnWrap: {
    padding: Dimension.padding15,
    borderTopColor: Colors.grayShade2,
    borderTopWidth: 1,
    backgroundColor: Colors.WhiteColor,
    flexDirection: 'row',
  },
  BrandNumWrap: {
    flex: 1,
  },
  BrandNumTitle: {
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
  },
  BrandNumTxt: {
    fontSize: Dimension.font20,
    color: Colors.eyeIcon,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  BrandNumTxt1: {
    fontSize: Dimension.font20,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  modalContainer: {
    backgroundColor: Colors.WhiteColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: Dimensions.get('window').height * 0.9,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingVertical: Dimension.padding10,
    paddingHorizontal: Dimension.padding20,
  },
  headingWrapper: {
    paddingVertical: Dimension.padding20,
  },
  ModalheadingTxt: {
    fontSize: Dimension.font16,
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.FontColor,
    width: '80%',
  },
  redTxt: {
    color: Colors.BrandColor,
    marginLeft: Dimension.margin15,
  },
  topbdr: {
    alignSelf: 'center',
    height: 3,
    backgroundColor: Colors.modalBorder,
    borderRadius: 2,
    width: Dimension.width70,
  },
  ModalBtnWrap: {flexDirection: 'row', marginTop: Dimension.margin20},
  tabBar: {
    backgroundColor: '#fff',
  },
  //   IconDefaultColor: {color: colors.ExtralightGrayText},
  tabText: {
    fontSize: 10,
    // fontFamily: Dimension.CustomMediumFont,
    marginTop: 4,
  },
  iconAlignment: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  activeTabTitle: {
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomMediumFont,
    color: Colors.BrandColor,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    alignItems: 'center',
  },
  inActiveTabTitle: {
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomMediumFont,
    color: Colors.FontColor,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    alignItems: 'center',
  },
});

export default styles;
