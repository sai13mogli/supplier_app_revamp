import {StyleSheet} from 'react-native';
import Colors from '../../../../Theme/Colors';
import Dimension from '../../../../Theme/Dimension';
const styles = StyleSheet.create({
  searchWrapper: {
    paddingHorizontal: Dimension.padding10,
    marginVertical: Dimension.margin10,
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
  bottomWrap:{
    borderTopColor:Colors.BoxBorderColor,
    padding:Dimension.padding10,
    borderTopWidth:1
  },
});

export default styles;
