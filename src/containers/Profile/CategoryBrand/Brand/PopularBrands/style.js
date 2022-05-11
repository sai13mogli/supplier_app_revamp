import {StyleSheet} from 'react-native';
import Colors from '../../../../../Theme/Colors';
import Dimension from '../../../../../Theme/Dimension';
const styles = StyleSheet.create({
Wrapper:{
  marginTop:Dimension.margin20,
  flexDirection:"row",
  backgroundColor:"#fff",
  paddingVertical: Dimension.padding20,
  },
  activeBackground: {
   backgroundColor:Colors.grayShade1,
   paddingHorizontal:Dimension.padding10,
   paddingVertical:Dimension.padding15
  },
  inactiveBackground: {
    backgroundColor:Colors.WhiteColor,
    paddingHorizontal:Dimension.padding10,
    paddingVertical:Dimension.padding15
  },
  leftPart:{
    flex:.8,
    marginRight:Dimension.margin10,
    marginBottom:80,
  },
  rightPart:{
    flex:1
  },
  categoryText:{
    fontSize:Dimension.font12,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomRegularFont,
  },
  searchWrapper:{
    paddingHorizontal:Dimension.padding10,
    marginBottom:Dimension.margin20,
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
  paddingVertical:Dimension.padding10
 
},
seacrhIcon:{
    position:"absolute",
    top:Dimension.padding12,
    right:Dimension.padding15,
    fontSize:Dimension.font18,
    color:Colors.FontColor
},
CloseIcon:{
  position:"absolute",
    top:Dimension.padding12,
    right:Dimension.padding15,
    fontSize:Dimension.font18,
    color:Colors.BrandColor  
},
NoDataTxt:{
  fontSize:Dimension.font14,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomSemiBoldFont,
},
});

export default styles;
