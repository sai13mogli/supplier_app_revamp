import React from 'react';
import {Text, View} from 'react-native';
import CustomButton from '../../../../component/common/Button';
import Colors from '../../../../Theme/Colors';
import Dimension from '../../../../Theme/Dimension';

const Error = props => {
  return (
    <View>
      <Text style={{color: '#000'}}>Oops!</Text>
      <Text style={{color: '#000'}}>
        The email id {props.route.params.email}
      </Text>
      <Text style={{color: '#000'}}>Is not associated with us.</Text>
      <Text style={{color: '#000'}}>
        Please sign in with registered email id
      </Text>
      <CustomButton
        title={'GO BACK TO LOGIN'}
        buttonColor={Colors.BrandColor}
        onPress={() => props.navigation.goBack()}
        TextColor={Colors.WhiteColor}
        borderColor={Colors.WhiteColor}
        TextFontSize={Dimension.font16}
      />
    </View>
  );
};

export default Error;
