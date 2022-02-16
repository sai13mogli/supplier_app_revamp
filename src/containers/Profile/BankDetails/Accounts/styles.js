import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../../../Theme/Colors';
import Dimension from '../../../../Theme/Dimension';

const styles = StyleSheet.create({
 wrap:{
   borderWidth:0.9,
   padding:Dimension.padding2,
   paddingHorizontal:Dimension.padding10,
   marginHorizontal:Dimension.margin10,
   height:Dimension.height130,
   borderRadius:3,
   borderColor:Colors.FontColor,
   marginVertical:Dimension.margin8
 },
 ContainerCss:{
  backgroundColor:Colors.WhiteColor,
  paddingHorizontal:Dimension.padding15
 },
 addnewtxt:{
  fontSize:Dimension.font14,
  color:Colors.BrandColor,
  fontFamily:Dimension.CustomMediumFont, 
  marginLeft:Dimension.margin5
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
  bottombtnWrap:{
    padding:Dimension.padding15,
    borderTopColor:Colors.grayShade2,
    borderTopWidth:1,
    backgroundColor:Colors.WhiteColor
  },
 submit:{
  backgroundColor:Colors.BrandColor,
  marginHorizontal:Dimensions.margin10,
 },
 nameWrap:{
  flexDirection:'row',
  top:10,
  left:10
 },
 name:{
  alignSelf:'center' ,
  fontSize:Dimension.font13
 },
 type:{
  alignSelf:'center' ,
  left:10,
  borderWidth:1,
  backgroundColor:'#eeeeee',
  borderColor:'#eeeeee',
  fontSize:Dimension.font13
 },
 addresses:{
  top:15,
  left:10,
  fontSize:Dimension.font13
 },
 buttonWrap:{
 flexDirection:'row',
 justifyContent:'space-around',
 },
 remove:{
    borderWidth:0.9,
    top:33,
    padding:Dimension.padding2,
    paddingHorizontal:Dimension.padding42,
    height:Dimension.height30,
    borderRadius:3,
    borderColor:Colors.BoxBorderColor,
    marginVertical:Dimension.margin8
 },
});

export default styles;