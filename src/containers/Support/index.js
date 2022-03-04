import React from 'react';
import {Text, View} from 'react-native';
import CustomButton from '../../component/common/Button';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';
import TicketsList from './TicketsList';

const SupportScreen = props => {
  return (
    <View>
      <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
        SupportScreen
      </Text>
      <CustomButton
        title={'New Ticket'}
        buttonColor={Colors.BrandColor}
        onPress={() => props.navigation.navigate('NewTicket')}
        TextColor={Colors.WhiteColor}
        borderColor={Colors.WhiteColor}
        TextFontSize={Dimension.font16}
      />
      <TicketsList navigation={props.navigation} />
    </View>
  );
};

export default SupportScreen;
