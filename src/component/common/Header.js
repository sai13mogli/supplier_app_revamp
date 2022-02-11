import React, {useState} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import colors from "../../Theme/Colors"
import CustomeIcon from './CustomeIcon';
import { Header, HeaderProps, Icon } from 'react-native-elements';

import Dimension from "../../Theme/Dimension"
const AppHeader = props => {
return (
    <Header
  backgroundColor="#fff"
  barStyle="dark-content"
  containerStyle={{paddingVertical:Dimension.padding25,}}
  leftContainerStyle={{flex:1}}
  leftComponent={
    <View style={styles.leftSection}>
    <CustomeIcon name={'arrow-back'} size={Dimension.font20} color={colors.FontColor}></CustomeIcon>
     <Text style={styles.headerTxt}>{props.showText}</Text>
 </View>
 
    
    }
    rightContainerStyle={{flex:1}}
    
  rightComponent={

    <CustomeIcon name={props.rightIconName} size={Dimension.font20} color={colors.FontColor}></CustomeIcon>
    
  } 
/>


)
}
const styles = StyleSheet.create({
    headerWrap:{

    },
    headerTxt:{
      fontSize:Dimension.font12,
      color:colors.headerTxtColor,
      fontFamily:Dimension.CustomSemiBoldFont,
      marginTop:Dimension.margin5,
      marginLeft:Dimension.margin10
      
    },
    leftSection:{flexDirection:'row'}

  });

export default AppHeader;