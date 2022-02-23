import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../../../Theme/Colors';
import Dimension from '../../../../Theme/Dimension';

const styles = StyleSheet.create({
  ContainerCss:{
    backgroundColor:Colors.WhiteColor,
    paddingHorizontal:Dimension.padding15
  },
 wrap:{
   borderWidth:1,
   padding:Dimension.padding15,
   borderRadius:4,
   borderColor:Colors.eyeIcon,
   marginBottom:Dimension.margin10
  },
//  submit:{
//   backgroundColor:Colors.BrandColor,
//   marginHorizontal:Dimensions.margin10,
//  },
 nameWrap:{
  flexDirection:'row',
  marginBottom:Dimension.margin5
 },
 UserNameCss:{
  alignSelf:'center' ,
  fontSize:Dimension.font14,
  color:Colors.FontColor,
  fontFamily:Dimension.CustomSemiBoldFont
 },
 AddressType:{
  alignSelf:'center' ,
  backgroundColor:Colors.grayShade1,
 fontSize:Dimension.font10,
 color:Colors.FontColor,
  fontFamily:Dimension.CustomMediumFont,
  marginLeft:Dimension.margin10,
  paddingHorizontal:Dimension.padding12,
  paddingVertical:Dimension.padding3


 },
 AddressTxt:{
  fontSize:Dimension.font14,
  color:Colors.FontColor,
  fontFamily:Dimension.CustomRegularFont,
 

 },
 buttonWrap:{
 flexDirection:'row',
 justifyContent:'space-around',
 flex:1,
 marginTop:Dimension.margin15
 },

 TopWrap:{
  flexDirection:'row',
  justifyContent:'space-between',
  paddingVertical:Dimension.padding25,
  

},
Pageheading:{
  fontSize:Dimension.font14,
  color:Colors.FontColor,
  fontFamily:Dimension.CustomMediumFont,
},
addnewtxt:{
  fontSize:Dimension.font14,
  color:Colors.BrandColor,
  fontFamily:Dimension.CustomMediumFont, 
  marginLeft:Dimension.margin5
},
bottombtnWrap:{
  padding:Dimension.padding15,
  borderTopColor:Colors.grayShade2,
  borderTopWidth:1,
  backgroundColor:Colors.WhiteColor
}
});

export default styles;