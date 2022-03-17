import React from 'react';
import {Text, View} from 'react-native';
import CustomButton from '../../component/common/Button';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';
import TicketsList from './TicketsList';
import Header from '../../component/common/Header';
import styles from './style';
const SupportScreen = props => {
  return (
    <>
      <View style={{flex: 1}}>
        <Header showText={'Support'} />
        <TicketsList navigation={props.navigation} />
      </View>
      <View style={styles.BottomWrap}>
        <CustomButton
          title={'Raise New Ticket'}
          buttonColor={Colors.BrandColor}
          onPress={() => props.navigation.navigate('NewTicket')}
          TextColor={Colors.WhiteColor}
          borderColor={Colors.WhiteColor}
          TextFontSize={Dimension.font16}
        />
      </View>
    </>
  );
};

export default SupportScreen;
