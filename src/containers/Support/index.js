import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import CustomButton from '../../component/common/Button';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';
import Header from '../../component/common/Header';
import {SUPPORT_TAB_SCREENS} from '../../constants';
import Tabs from '../../component/common/Tabs';
import styles from './style';
import CustomeIcon from '../../component/common/CustomeIcon';

const SupportScreen = props => {
  return (
    <>
      <View style={{flex: 1}}>
        <Header showText={'Support'} navigation={props.navigation} showBell />
        <Tabs
          hideScroll
          data={SUPPORT_TAB_SCREENS.map(_ => ({..._}))}
          navigation={props.navigation}
        />
        {/* <TicketsList navigation={props.navigation} /> */}
      </View>
      <View style={styles.BottomWrap}  onPress={() => props.navigation.navigate('NewTicket')}>
        
        <TouchableOpacity style={styles.ticketBtn}>
        <CustomeIcon name={'add-circle-line'} size={Dimension.font22} color={Colors.WhiteColor}></CustomeIcon>
          <Text style={styles.ticketBtnTxt}>Raise New Ticket</Text>
        </TouchableOpacity>
        {/* <CustomButton
          title={'Raise New Ticket'}
          buttonColor={Colors.BrandColor}
          onPress={() => props.navigation.navigate('NewTicket')}
          TextColor={Colors.WhiteColor}
          borderColor={Colors.WhiteColor}
          TextFontSize={Dimension.font14}
        /> */}
      </View>
    </>
  );
};

export default SupportScreen;
