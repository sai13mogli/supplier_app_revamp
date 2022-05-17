import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import CustomButton from '../../component/common/Button';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';
import Header from '../../component/common/Header';
import {SUPPORT_TAB_SCREENS} from '../../constants';
import Tabs from '../../component/common/Tabs';
import styles from './style';
import CustomeIcon from '../../component/common/CustomeIcon';
import analytics from '@react-native-firebase/analytics';
import {useSelector} from 'react-redux';

const SupportScreen = props => {
  const profileData = useSelector(
    state => (state.profileReducer || {}).data || {},
  );

  useEffect(() => {
    logEvent();
  }, []);

  const logEvent = async () => {
    await analytics().logEvent('TicketTab', {
      action: `click`,
      label: '',
      datetimestamp: `${new Date().getTime()}`,
      supplierId: profileData.userId,
    });
  };

  const navigateToNewTicket = async () => {
    await analytics().logEvent('RaiseTicket', {
      action: `click`,
      label: '',
      datetimestamp: `${new Date().getTime()}`,
      supplierId: profileData.userId,
    });
    props.navigation.navigate('NewTicket');
  };

  return (
    <>
      <View style={{flex: 1}}>
        <Header showText={'Support'} navigation={props.navigation} showBell />
        <Tabs
          hideScroll
          data={SUPPORT_TAB_SCREENS.map(_ => ({..._}))}
          navigation={props.navigation}
          route={props.route}
        />
        {/* <TicketsList navigation={props.navigation} /> */}
      </View>
      <View style={styles.BottomWrap}>
        <TouchableOpacity
          onPress={navigateToNewTicket}
          style={styles.ticketBtn}>
          <CustomeIcon
            name={'add-circle-line'}
            size={Dimension.font22}
            color={Colors.WhiteColor}></CustomeIcon>
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
