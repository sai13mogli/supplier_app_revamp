import {StyleSheet} from 'react-native';
import Colors from '../../../../Theme/Colors';
import Dimension from '../../../../Theme/Dimension';

const styles = StyleSheet.create({
  submit: {
    backgroundColor: Colors.BrandColor,
    marginHorizontal: Dimension.margin10,
  },
  bottombtnWrap:{
    padding:Dimension.padding15,
    borderTopColor:Colors.grayShade2,
    borderTopWidth:1,
    backgroundColor:Colors.WhiteColor,
    flexDirection:"row"
  },
  BrandNumWrap:{
    flex:1
  },
  BrandNumTitle:{
    fontSize:Dimension.font10,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomRegularFont
  },
  BrandNumTxt:{
    fontSize:Dimension.font20,
    color:Colors.eyeIcon,
    fontFamily:Dimension.CustomSemiBoldFont
  },
  BrandNumTxt1:{
    fontSize:Dimension.font20,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomSemiBoldFont
  },
});

export default styles;
