import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {acceptOrder} from '../services/orders';
import Toast from 'react-native-toast-message';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
const deviceWidth = Dimensions.get('window').width;
import CustomeIcon from './common/CustomeIcon';
import moment from 'moment';

const AcceptModal = props => {
  const {
    selectedTab,
    fetchOrdersFunc,
    fetchTabCountFunc,
    itemId,
    displayCalendar,
    shipmentType,
    setDisplayCalendar,
    pickupDate,
    isOmsPickupDate,
  } = props;
  const [day, setDay] = useState({
    dateString: '',
    day: '',
    month: '',
    timestamp: '',
    year: '',
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

  const onAccept = async () => {
    try {
      setAcceptLoader(true);
      let payload = {
        supplierId: await AsyncStorage.getItem('userId'),
        itemId: `${itemId}`,
        pickupDate: day.dateString.split('-').reverse().join('-'),
      };
      const {data} = await acceptOrder(payload);
      if (data && data.success) {
        fetchOrdersFunc(0, '', selectedTab, shipmentType, {
          pickupFromDate: '',
          pickupToDate: '',
          poFromDate: '',
          poToDate: '',
          orderType: [],
          deliveryType: [],
          orderRefs: [],
        });
        fetchTabCountFunc('SCHEDULED_PICKUP', shipmentType);
        props.setLoadingTabs(true);
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

  const markedDay = {
    [day.dateString]: {
      selected: true,
      marked: true,
      customStyles: {
        container: {
          backgroundColor: 'red',
        },
        text: {
          color: 'black',
          fontWeight: 'bold',
        },
      },
    },
  };
  const getMinDate = () => {
    let today = new Date();
    let mutateMonth;

    if (today.getMonth() + 1 < 10) {
      mutateMonth = `0${today.getMonth() + 1}`;
    } else {
      mutateMonth = today.getMonth() + 1;
    }

    let currdate =
      Number(today.getDate()) < 10
        ? `0${Number(today.getDate())}`
        : `${Number(today.getDate())}`;
    let date = today.getFullYear() + '-' + mutateMonth + '-' + currdate;
    return date;
  };

  const getMaxDate = () => {
    let daysCount = 2;
    if (isOmsPickupDate) {
      daysCount = 5;
    }
    let mutatedate = new Date(
      Number(pickupDate) + daysCount * 24 * 60 * 60 * 1000,
    );
    let mutateMonth;

    if (mutatedate.getMonth() + 1 < 10) {
      mutateMonth = `0${mutatedate.getMonth() + 1}`;
    } else {
      mutateMonth = mutatedate.getMonth() + 1;
    }

    let currdate =
      Number(mutatedate.getDate()) < 10
        ? `0${Number(mutatedate.getDate())}`
        : `${Number(mutatedate.getDate())}`;
    let date = mutatedate.getFullYear() + '-' + mutateMonth + '-' + currdate;
    console.log('maxdate', date);
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
      style={{padding: 0, margin: 0}}
      deviceWidth={deviceWidth}
      hasBackdrop={true}
      onBackdropPress={() => setDisplayCalendar(false)}
      onBackButtonPress={() => setDisplayCalendar(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.topbdr}></View>
        <View style={styles.ModalheadingWrapper}>
          <Text style={styles.ModalHeading}>
            Do you wish to change the Pickup Date
          </Text>

          <CustomeIcon
            name={'close'}
            size={Dimension.font22}
            color={Colors.FontColor}
            onPress={() => {
              setDisplayCalendar(false);
            }}></CustomeIcon>
        </View>

        <Calendar
          minDate={getMinDate()}
          maxDate={getMaxDate()}
          onDayPress={day => {
            setDay(day);
          }}
          markingType={'custom'}
          markedDates={markedDay}
          currentDate={getMinDate()}
          theme={{
            selectedDayBackgroundColor: Colors.BrandColor,
            arrowColor: Colors.BrandColor,
            textDayFontSize: Dimension.font14,
            textMonthFontSize: Dimension.font14,
            textDayHeaderFontSize: Dimension.font14,
            textDayFontFamily: Dimension.CustomMediumFont,
            textMonthFontFamily: Dimension.CustomMediumFont,
            textDayHeaderFontFamily: Dimension.CustomMediumFont,
          }}
        />
        <View style={styles.btnWrap}>
          <TouchableOpacity
            onPress={() => setDisplayCalendar(false)}
            style={styles.cancelBtn}>
            <Text style={styles.canceltxt}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectCtabtn} onPress={onAccept}>
            <Text style={styles.rejectCtaTxt}>ACCEPT</Text>
            {acceptLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.WhiteColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingTop: Dimension.padding10,
  },

  rejectCtabtn: {
    flex: 5,
    backgroundColor: Colors.BrandColor,
    borderRadius: 4,
    paddingVertical: Dimension.padding8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectCtaTxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.WhiteColor,
    fontSize: Dimension.font12,
  },
  cancelBtn: {
    flex: 5,
    backgroundColor: Colors.WhiteColor,
    borderRadius: 4,
    paddingVertical: Dimension.padding8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  canceltxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.FontColor,
    fontSize: Dimension.font12,
  },
  topbdr: {
    alignSelf: 'center',
    height: 3,
    backgroundColor: Colors.modalBorder,
    borderRadius: 2,
    width: Dimension.width70,
  },
  ModalheadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Dimension.padding15,
  },
  ModalHeading: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginBottom: Dimension.margin5,
  },
  btnWrap: {
    flex: 1,
    flexDirection: 'row',
    padding: Dimension.padding15,
    borderTopWidth: 1,
    borderTopColor: Colors.grayShade1,
  },
});
export default AcceptModal;
