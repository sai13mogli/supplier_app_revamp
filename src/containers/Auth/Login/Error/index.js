import React from 'react';
import {Text, View,StyleSheet,Image,StatusBar,ImageBackground, Dimensions, ScrollView} from 'react-native';
import CustomButton from '../../../../component/common/Button';
import Colors from '../../../../Theme/Colors';
import Dimension from '../../../../Theme/Dimension';
import CustomeIcon from '../../../../component/common/CustomeIcon';
const Error = props => {
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
       <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
       <ImageBackground
        source={require('../../../../assets/images/loginBg.png')}
        resizeMode="cover" //style={{flex:1}}
      >
        <View style={{width:"100%",position:"relative",zIndex:999999,}}>
        <Image
          source={require('../../../../assets/images/LoginError.png')}
          style={{height: Dimension.height221, width: Dimension.width115, marginTop: 120, alignSelf: 'center'}}
        />
        </View>
        
      </ImageBackground>
      

      
      <ScrollView style={styles.ContainerCss}>

      
      <Text style={styles.oopstxt}>Oops!</Text>
      
      <Text style={styles.lighttxt}>
        The email id <Text style={styles.emailtxt}> {props.route.params.email} </Text>
      </Text>
      <Text style={styles.lighttxt}>Is not associated with us.</Text>
      <Text style={[styles.lighttxt,{marginVertical:Dimension.margin20}]}>
        Please sign in with registered email id
      </Text>
      <View style={{paddingVertical:Dimension.margin15}}>

      
      <CustomButton
        title={'GO BACK TO LOGIN'}
        onPress={() => props.navigation.goBack()}
         TextFontSize={Dimension.font16}
        buttonColor={Colors.blackColor}
        TextColor={Colors.WhiteColor}
         borderColor={Colors.blackColor}
         icon={() => (
              <CustomeIcon
                name={'arrow-back'}
                size={Dimension.font20}
                color={Colors.WhiteColor}
                style={{marginRight:10,marginTop:-2}}
              />
            )}
      //showIcon={true}
      />
      </View>
      </ScrollView>
    </View>
  
  );
};
const styles = StyleSheet.create({
  ContainerCss:{
    backgroundColor:Colors.DisableStateColor,
    marginHorizontal:Dimension.padding15,
    paddingTop:Dimension.margin120,
    borderRadius:10,
    paddingHorizontal:Dimension.padding20,
    marginTop:-100,
    //zIndex:-9,
    //position:"relative",
    alignContent:"center"
  },
  oopstxt:{
    fontSize:Dimension.font36,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomSemiBoldFont,
    marginBottom:Dimension.margin15,
    alignSelf:"center"
  },
  lighttxt:{
    fontSize:Dimension.font14,
    color:Colors.FontColor,
    fontFamily:Dimension.CustomRegularFont,
    alignSelf:"center"
  },
  emailtxt:{
    color:Colors.BrandColor,
    fontFamily:Dimension.CustomMediumFont
  },
})
export default Error;
