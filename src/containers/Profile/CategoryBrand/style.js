import {StyleSheet} from 'react-native';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';


const styles = StyleSheet.create({
  UserDetailWrap:{
    backgroundColor:Colors.BrandColor,
    padding:Dimension.padding15,
    borderRadius:8,
  },
  ContainerCss:{
    backgroundColor:Colors.WhiteColor,
    paddingHorizontal:Dimension.padding15
  },
  brandHeadingTxt:{
      fontSize:Dimension.font14,
      fontFamily:Dimension.CustomSemiBoldFont,
      color:Colors.FontColor
  },

 
  bottombtnWrap:{
    padding:Dimension.padding15,
    borderTopColor:Colors.grayShade2,
    borderTopWidth:1,
    backgroundColor:Colors.WhiteColor
  },
  
});

export default styles;
