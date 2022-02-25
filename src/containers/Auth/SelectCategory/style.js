import {StyleSheet} from 'react-native';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
const styles = StyleSheet.create({
  searchWrapper: {
    paddingHorizontal: Dimension.padding10,
    marginBottom: Dimension.margin20,
    position: 'relative',
  },

  SearchInputCss: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.BoxBorderColor,
    paddingHorizontal: Dimension.padding10,
    paddingVertical: Dimension.padding10,
  },
  seacrhIcon: {
    position: 'absolute',
    top: Dimension.padding12,
    right: Dimension.padding15,
    fontSize: Dimension.font18,
    color: Colors.FontColor,
  },
  CloseIcon: {
    position: 'absolute',
    top: Dimension.padding12,
    right: Dimension.padding15,
    fontSize: Dimension.font18,
    color: Colors.BrandColor,
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
  chekboxWrap:{
    paddingVertical:Dimension.padding12,
    borderTopWidth:.5,
    borderTopColor:Colors.BoxBorderColor,
    borderBottomWidth:.5,
    borderBottomColor:Colors.BoxBorderColor,
  },
});

export default styles;
