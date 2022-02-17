import {StyleSheet} from 'react-native';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';

const styles = StyleSheet.create({
  UserDetailWrap: {
    backgroundColor: Colors.BrandColor,
    padding: Dimension.padding15,
    borderRadius: 8,
  },
  ContainerCss: {
    backgroundColor: Colors.WhiteColor,
    paddingHorizontal: Dimension.padding15,
  },
  brandHeadingTxt: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.FontColor,
  },

  bottombtnWrap: {
    padding: Dimension.padding15,
    borderTopColor: Colors.grayShade2,
    borderTopWidth: 1,
    backgroundColor: Colors.WhiteColor,
  },
  labelStyle: {
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft: Dimension.margin12,
    marginBottom: Dimension.margin5,
    fontWeight: 'normal',
  },
  starIcon: {
    color: Colors.BrandColor,
    fontSize: Dimension.font10,
    fontFamily: Dimension.CustomMediumFont,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: Colors.FontColor,
    borderRadius: 4,
    paddingHorizontal: Dimension.padding12,
    height: Dimension.height40,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Dimension.margin10,
    backgroundColor: Colors.WhiteColor,
    textAlignVertical: 'center',
    paddingVertical: Dimension.padding12,
  },
  placeholderCss: {
    fontSize: Dimension.font14,
    color: Colors.placeholderColor,
    fontFamily: Dimension.CustomMediumFont,
  },
});

export default styles;
