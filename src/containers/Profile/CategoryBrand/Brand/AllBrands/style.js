import {StyleSheet} from 'react-native';
import Colors from '../../../../../Theme/Colors';
import Dimension from '../../../../../Theme/Dimension';
const styles = StyleSheet.create({
Wrapper:{
 flexDirection:"row",
 },

  leftPart:{
    flex:.8,
    marginRight:Dimension.margin10
  },
  rightPart:{
    flex:1,
    paddingRight:Dimension.padding10
  },
  categoryText:{
    fontSize:Dimension.font12,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomRegularFont,
  },
  alphbetText:{
    fontSize:Dimension.font16,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomBoldFont,
    alignSelf:"flex-end"
  },
  searchWrapper:{
      paddingHorizontal:Dimension.padding10,
      marginVertical:Dimension.margin20,
      position:"relative"
  },

  SearchInputCss:{
    fontSize:Dimension.font12,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomRegularFont,
    borderRadius:4,
    borderWidth:1,
    borderColor:Colors.BoxBorderColor,
    paddingHorizontal:Dimension.padding10,
    paddingVertical:Dimension.padding12
   
  },
  seacrhIcon:{
      position:"absolute",
      top:Dimension.padding15,
      right:Dimension.padding20,
      fontSize:Dimension.font18,
      color:Colors.FontColor
  },
  CloseIcon:{
    position:"absolute",
      top:Dimension.padding15,
      right:Dimension.padding20,
      fontSize:Dimension.font18,
      color:Colors.BrandColor  
  },
});

export default styles;
