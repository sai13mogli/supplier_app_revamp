import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {acceptOrder} from '../services/orders';
import Toast from 'react-native-toast-message';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
const deviceWidth = Dimensions.get('window').width;

const AcceptModal = props => {
  const {
    selectedTab,
    fetchOrdersFunc,
    fetchTabCountFunc,
    itemId,
    displayCalendar,
    setDisplayCalendar,
  } = props;
  const [day, setDay] = useState({
    dateString: '2022-03-24',
    day: 24,
    month: 3,
    timestamp: 1648166400000,
    year: 2022,
  });
  const [acceptLoader, setAcceptLoader] = useState(false);

  useEffect(() => {
    setPickupDate();
  }, []);

  const setPickupDate = () => {
    let minDate = getMinDate();
    let [year, month, day] = minDate.split('-');
    let timestamp = new Date(minDate).getTime();
    setDay({
      dateString: minDate,
      day: day,
      month: month,
      timestamp: timestamp,
      year: year,
    });
  };

  //acceptOrder
  const onAccept = async () => {
    try {
      setAcceptLoader(true);
      let payload = {
        supplierId: await AsyncStorage.getItem('userId'),
        itemId: `${itemId}`,
        pickupDate: day.dateString,
      };
      // getTime(pickupDate, true)
      console.log(payload.pickupDate);
      const {data} = await acceptOrder(payload);
      if (data && data.success) {
        fetchOrdersFunc(0, '', selectedTab, 'ONESHIP', {
          pickupFromDate: '',
          pickupToDate: '',
          poFromDate: '',
          poToDate: '',
          orderType: [],
          deliveryType: [],
          orderRefs: [],
        });
        fetchTabCountFunc('SCHEDULED_PICKUP', 'ONESHIP');
        setAcceptLoader(false);
      } else {
        setAcceptLoader(false);
        setDisplayCalendar(false);
        Toast.show({
          type: 'error',
          text2: data.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.log(error);
      setAcceptLoader(false);
      setDisplayCalendar(false);
      Toast.show({
        type: 'error',
        text2: 'Something went wrong',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const markedDay = {[day.dateString]: {selected: true, marked: true}};
  const getMinDate = () => {
    let today = new Date();
    let mutateMonth;
    if (today.getMonth() + 1 < 10) {
      mutateMonth = `0${today.getMonth() + 1}`;
    } else {
      mutateMonth = today.getMonth() + 1;
    }
    let date = today.getFullYear() + '-' + mutateMonth + '-' + today.getDate();
    return date;
  };

  const getMaxDate = () => {
    let today = new Date();
    let mutatedate = Number(today.getDate()) + 2;
    let date =
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + mutatedate;

    return date;
  };

  return (
    <Modal
      overlayPointerEvents={'auto'}
      isVisible={displayCalendar}
      onTouchOutside={() => {
        setDisplayCalendar(false);
      }}
      onDismiss={() => {
        setDisplayCalendar(false);
      }}
      coverScreen={true}
      style={{padding: 0, margin: 0, backgroundColor: '#fff'}}
      deviceWidth={deviceWidth}
      hasBackdrop={true}
      onBackdropPress={() => setDisplayCalendar(false)}
      onBackButtonPress={() => setDisplayCalendar(false)}>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 12, fontWeight: 'bold', color: '#000'}}>
          Do you wish to change the Pickup Date
        </Text>
        <Calendar
          minDate={getMinDate()}
          maxDate={getMaxDate()}
          onDayPress={day => {
            setDay(day);
          }}
          markedDates={markedDay}
          theme={{
            selectedDayBackgroundColor: 'red',
            arrowColor: 'orange',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />

        <TouchableOpacity onPress={() => setDisplayCalendar(false)}>
          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#000'}}>
            CANCEL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: 'red'}} onPress={onAccept}>
          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#000'}}>
            ACCEPT
          </Text>
          {acceptLoader && (
            <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
          )}
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AcceptModal;
