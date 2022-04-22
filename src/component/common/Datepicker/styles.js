import { StyleSheet } from 'react-native';
import Dimension from "../../../Theme/Dimension";
import colors from "../../../Theme/Colors"

const styles = StyleSheet.create({
  WrapperStyle: {
    //marginBottom: Dimension.margin10,
    paddingHorizontal: 0,
  },

  inputContainerStyle: {
    borderWidth: 1,
    borderColor: colors.FontColor,
    borderRadius: 4,
    height: Dimension.height40,
    paddingBottom: 0,
  },
  placeholderCss: {
    fontSize: Dimension.font14,
    color: colors.placeholderColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  labelStyle: {
    fontSize: Dimension.font10,
    color: colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft: Dimension.margin12,
    marginBottom: Dimension.margin5,
    fontWeight: 'normal',
  },
  starIcon: {
    fontSize: Dimension.font10,
    color: colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  inputStyle: {
    fontSize: Dimension.font12,
    color: colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    paddingLeft:Dimension.padding12,
    paddingRight:Dimension.padding12,
  },
  iconStyle: {
    width: Dimension.width24,
    height: Dimension.height24,
    marginRight: Dimension.padding10,
  },
  errorText: {
    fontSize: Dimension.font10,
    color: colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
    //bottom: 20
  },
  errorText: {
    fontSize: Dimension.font10,
    color: colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  disabledInputStyle: {
    fontSize: Dimension.font12,
    color: colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    paddingLeft:Dimension.padding12,
    paddingRight:Dimension.padding12,
    backgroundColor: colors.DisableStateColor,
    //paddingHorizontal: Dimension.padding12,
  },
});

export default styles;