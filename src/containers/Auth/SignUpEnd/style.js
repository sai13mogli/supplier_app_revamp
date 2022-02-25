import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import { createConfigItem } from '@babel/core';


const styles = StyleSheet.create({
    headerPart:{
        marginTop:Dimension.margin40,
        flexDirection:"row",
        marginBottom:Dimension.margin30
        
    },
  ContainerCss:{
   // backgroundColor:Colors.WhiteColor,
    paddingHorizontal:Dimension.padding15,
    //flex:1
  },
  formWrap:{

  },
  
  sendOtptext:{
    fontSize:Dimension.font12,
    color:Colors.BrandColor,
    fontFamily:Dimension.CustomRegularFont,
  },
  setndOtpBtn:{
   backgroundColor:Colors.LightBrandColor,
   paddingVertical:Dimension.padding8,
   paddingHorizontal:Dimension.padding10,
   borderRadius:2,
   
   alignItems:"center"
  },

  headingTxt:{
    fontSize:Dimension.font18,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomSemiBoldFont,
    marginVertical:Dimension.margin30  
},
  errorTxt:{
    fontSize:Dimension.font10,
    color:Colors.BrandColor,
    fontFamily:Dimension.CustomRegularFont,
  },
 bottomBtnWrap:{
      padding:Dimension.padding15,
      
      borderTopColor:Colors.grayShade1,
      borderTopWidth:1,
      backgroundColor:"#fff"
  },
  greenBar:{
      width:Dimension.width20,
      height:Dimension.height5,
      borderRadius:2,
      backgroundColor:Colors.SuccessStateColor,
      marginVertical:Dimension.margin10,
      marginLeft:Dimension.margin20,
      marginRight:Dimension.margin5
  },
  RightGrrenbar:{
    width:Dimension.width20,
    height:Dimension.height5,
    borderRadius:2,
    backgroundColor:Colors.SuccessStateColor,
    marginVertical:Dimension.margin10,
}

});

export default styles;