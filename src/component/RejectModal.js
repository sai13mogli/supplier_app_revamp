import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import Modal from 'react-native-modal';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rejectOrder} from '../services/orders';
import Toast from 'react-native-toast-message';
import DropDown from '../component/common/DropDown';
import CustomeIcon from './common/CustomeIcon';
import Productcard from './Productcard';
import DropDownModal from './DropDownModal';
import FloatingLabelInputField from './common/FloatingInput';

const deviceWidth = Dimensions.get('window').width;
const RejectModal = props => {
  const {
    rejectModal,
    setRejectModal,
    selectedTab,
    msn,
    quantity,
    orderRef,
    itemRef,
    createdAt,
    transferPrice,
    hsn,
    pickupDate,
    productName,
    orderTypeString,
    shipmentMode,
    isVmi,
    shipmentModeString,
    actionCTA,
    taxPercentage,
    fetchOrdersFunc,
    shipmentType,
    totalAmount,
    invoiceUrl,
    orderImage,
    itemId,
    fetchTabCountFunc,
  } = props;
  const [rejectLoader, setRejectLoader] = useState(false);
  const [reason, setReason] = useState('Material is not ready');
  const [reasonText, setReasonText] = useState('');
  const Reasons = [
    {
      id: 1,
      label: 'Material is not ready',
      value: 'Material is not ready',
    },
    {
      id: 2,
      label: 'Payment Issue',
      value: 'Payment Issue',
    },
    {
      id: 3,
      label: 'MOQ Issue',
      value: 'MOQ Issue',
    },
    {
      id: 4,
      label: 'Rate Issue',
      value: 'Rate Issue',
    },
    {
      id: 5,
      label: 'Other',
      value: 'Other',
    },
  ];

  useEffect(() => {
    console.log(reason);
  });

  //rejectOrder
  const onReject = async () => {
    try {
      setRejectLoader(true);
      let payload = {
        supplierId: await AsyncStorage.getItem('userId'),
        itemId: `${itemId}`,
        remark:
          reason == 'Other' ? reasonText : reason || 'Material is not ready',
      };

      console.log('reason', reason);
      const {data} = await rejectOrder(payload);
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
        Toast.show({
          type: 'success',
          text2: data.message,
          visibilityTime: 2000,
          autoHide: true,
        });
        fetchTabCountFunc('SCHEDULED_PICKUP', shipmentType);
        setRejectLoader(false);
        setRejectModal(false);
      } else {
        setRejectLoader(false);
        setRejectModal(false);
        Toast.show({
          type: 'error',
          text2: data.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.log(error);
      setRejectLoader(false);
      setRejectModal(false);
      Toast.show({
        type: 'error',
        text2: 'Something went wrong',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const renderOrderDetails = () => {
    return (
      <Productcard
        quantity={quantity}
        productName={productName}
        totalAmount={totalAmount}
        orderRef={orderRef}
        createdAt={createdAt}
        itemRef={itemRef}
        transferPrice={transferPrice}
        hsn={hsn}
        pickupDate={pickupDate}
        orderTypeString={orderTypeString}
        shipmentMode={shipmentMode}
        isVmi={isVmi}
        shipmentModeString={shipmentModeString}
        taxPercentage={taxPercentage}
        msn={msn}
        orderImage={orderImage}
      />
    );
  };

  return (
    <Modal
      overlayPointerEvents={'auto'}
      isVisible={rejectModal}
      onTouchOutside={() => {
        setRejectModal(false);
      }}
      onDismiss={() => {
        setRejectModal(false);
      }}
      coverScreen={true}
      style={{padding: 0, margin: 0}}
      deviceWidth={deviceWidth}
      hasBackdrop={true}
      onBackdropPress={() => setRejectModal(false)}
      onBackButtonPress={() => setRejectModal(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.topbdr}></View>

        <View style={styles.ModalheadingWrapper}>
          <CustomeIcon
            name={'close'}
            size={Dimension.font22}
            color={Colors.FontColor}
            onPress={() => setRejectModal(false)}></CustomeIcon>
        </View>
        <View
          style={{
            paddingHorizontal: Dimension.padding15,
            marginBottom: Dimension.margin10,
          }}>
          {renderOrderDetails()}
        </View>
        <ScrollView
          bounces
          style={{
            height: 250,
            paddingVertical: Dimension.padding10,
          }}>
          <DropDownModal
            fromRejectModal={true}
            label={'Select reason for rejecting'}
            items={Reasons}
            selectedValue={reason}
            onSelect={text => setReason(text)}
          />
          <View
            style={{
              paddingHorizontal: Dimension.padding15,
              marginBottom: Dimension.margin10,
            }}>
            {reason == 'Other' ? (
              <FloatingLabelInputField
                title={'Specify a reason'}
                label={'Specify a reason'}
                placeholder={'Reason'}
                value={reasonText}
                onChangeText={text => setReasonText(text)}
              />
            ) : null}
          </View>
        </ScrollView>

        <View style={styles.btnWrap}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setRejectModal(false)}>
            <Text style={styles.canceltxt}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectCtabtn} onPress={onReject}>
            <Text style={styles.rejectCtaTxt}>REJECT</Text>
            {rejectLoader && (
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
    justifyContent: 'flex-end',
    padding: Dimension.padding15,
  },
  btnWrap: {
    flex: 1,
    flexDirection: 'row',
    padding: Dimension.padding15,
    borderTopWidth: 1,
    borderTopColor: Colors.grayShade1,
  },
});

export default RejectModal;
