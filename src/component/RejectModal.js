import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import Modal from 'react-native-modal';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rejectOrder} from '../services/orders';
import Toast from 'react-native-toast-message';
import DropDown from '../component/common/DropDown';
import CustomeIcon from './common/CustomeIcon';
import Productcard from './Productcard';
import PickerDropDown from './common/PickerDropDown';
import DropDownModal from './DropDownModal';

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
    shipmentType,
    totalAmount,
    invoiceUrl,
    orderImage,
    itemId,
  } = props;
  const [rejectLoader, setRejectLoader] = useState(false);
  const [reason, setReason] = useState('Material is not ready');
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

  //rejectOrder
  const onReject = async () => {
    try {
      setRejectLoader(true);
      let payload = {
        supplierId: await AsyncStorage.getItem('userId'),
        itemId: `${itemId}`,
        remark: reason || 'Material is not ready',
      };

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
        fetchTabCountFunc('SCHEDULED_PICKUP', shipmentType);
        props.setLoadingTabs(true);
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
        <View style={{paddingHorizontal: Dimension.padding15}}>
          {renderOrderDetails()}
          <View
            style={{
              paddingVertical: Dimension.padding10,
            }}>
            <DropDownModal
              fromRejectModal={true}
              items={Reasons}
              selectedValue={reason}
              onSelect={text => setReason(text)}
            />
          </View>
        </View>
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
