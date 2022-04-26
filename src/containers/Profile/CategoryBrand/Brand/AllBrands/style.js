import {StyleSheet} from 'react-native';
import Colors from '../../../../../Theme/Colors';
import Dimension from '../../../../../Theme/Dimension';
const styles = StyleSheet.create({
  Wrapper: {
    flexDirection: 'row',
    paddingHorizontal: Dimension.padding10,
    paddingVertical: Dimension.padding20,
    position: 'relative',
    backgroundColor:"#fff",
    marginTop:Dimension.margin15
  },

  leftPart: {
    flex: 1,
    marginRight: Dimension.margin10,
  },
  AlphabetWrap: {
    flex: 0.1,
    top: Dimension.padding60,
    right: Dimension.padding10,
  },
  categoryText: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
  },
  alphbetText: {
    fontSize: Dimension.font16,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomBoldFont,
    alignSelf: 'flex-end',
  },
  activealphbetText: {
    fontSize: Dimension.font16,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomBoldFont,
    alignSelf: 'flex-end',
  },
  searchWrapper: {
    paddingHorizontal: Dimension.padding10,
    marginVertical: Dimension.margin20,
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
    paddingVertical: Dimension.padding12,
  },
  seacrhIcon: {
    position: 'absolute',
    top: Dimension.padding15,
    right: Dimension.padding20,
    fontSize: Dimension.font18,
    color: Colors.FontColor,
  },
  CloseIcon: {
    position: 'absolute',
    top: Dimension.padding15,
    right: Dimension.padding20,
    fontSize: Dimension.font18,
    color: Colors.BrandColor,
  },

  NoBrandWrap:{
borderWidth:1,
borderColor:Colors.BoxBorderColor,
borderRadius:4,
paddingHorizontal:Dimension.padding15,
paddingVertical:Dimension.padding20,
flexDirection:"row",
justifyContent:"space-between"
  },
  NoDataTxt:{
    fontSize:Dimension.font12,
      color:Colors.FontColor,
      fontFamily:Dimension.CustomRegularFont,
  },
  addBrandTxt:{
    fontSize:Dimension.font12,
    color:Colors.BrandColor,
    fontFamily:Dimension.CustomMediumFont,
  },
});

export default styles;
