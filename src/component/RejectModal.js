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
        {renderOrderDetails()}
        <View
          style={{
            paddingHorizontal: Dimension.padding15,
            paddingVertical: Dimension.padding10,
          }}>
          <DropDown
            title={'Specify Reason'}
            label={'Specify Reason'}
            selectedValue={reason}
            onValueChange={text => {
              setReason(text);
            }}
            items={Reasons}
            enabled={true}
            fromRejectModal={true}
          />
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
  TitleLightTxt: {
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    marginBottom: Dimension.margin5,
  },
  TitleBoldTxt: {
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomBoldFont,
  },
  msnName: {
    fontSize: Dimension.font12,
    // color: Colors.BrandColor,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  productName: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    marginBottom: Dimension.margin10,
    marginTop: Dimension.margin5,
  },
  readMoretxt: {
    fontSize: Dimension.font12,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  GstWrapTxt: {
    paddingVertical: Dimension.padding4,
    paddingHorizontal: Dimension.padding10,
    fontSize: Dimension.font10,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
    backgroundColor: Colors.LightBrandColor,
    borderRadius: 2,
    marginRight: Dimension.margin5,
  },
  shipmentModeWrap: {
    paddingVertical: Dimension.padding4,
    paddingHorizontal: Dimension.padding10,
    fontSize: Dimension.font10,
    color: Colors.oneShipTxt,
    fontFamily: Dimension.CustomMediumFont,
    backgroundColor: Colors.oneShipLight,
    borderRadius: 2,
    marginRight: Dimension.margin5,
  },
  shipmentModeStringWrap: {
    paddingVertical: Dimension.padding4,
    paddingHorizontal: Dimension.padding10,
    fontSize: Dimension.font10,
    color: Colors.ApproveStateColor,
    fontFamily: Dimension.CustomMediumFont,
    backgroundColor: Colors.pickupLight,
    borderRadius: 2,
    marginRight: Dimension.margin5,
  },
  VMIWrap: {
    paddingVertical: Dimension.padding4,
    paddingHorizontal: Dimension.padding10,
    fontSize: Dimension.font10,
    color: Colors.VmiTxt,
    fontFamily: Dimension.CustomMediumFont,
    backgroundColor: Colors.VmiLight,
    borderRadius: 2,
    marginRight: Dimension.margin5,
  },
  orderCardwrap: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.BoxBorderColor,
    backgroundColor: Colors.WhiteColor,
    marginBottom: Dimension.margin8,
    paddingHorizontal: Dimension.padding12,
    paddingVertical: Dimension.padding12,
    flex: 1,

    marginHorizontal: Dimension.margin5,
  },
  orderCardwrapInner: {
    flexDirection: 'row',
    flex: 1,
  },
  leftpart: {
    flex: 2,
    marginRight: Dimension.margin12,
  },
  rightPart: {
    flex: 8,
  },
  imgStyle: {
    borderRadius: 4,
    backgroundColor: Colors.WhiteColor,
    padding: 2,
    width: Dimension.width50,
    height: Dimension.height50,
    //alignSelf:'center'
  },

  imgStyleModal: {
    borderRadius: 4,
    backgroundColor: Colors.WhiteColor,
    padding: 2,
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  quantityTxt: {
    alignSelf: 'flex-start',
    backgroundColor: '#E2E2E2',
    borderRadius: 2,
    //marginTop: Dimension.margin8,
    //width: '100%',
    alignItems: 'center',
    paddingHorizontal: Dimension.padding5,
    justifyContent: 'center',
    paddingTop: Dimension.padding5,
  },
  modalContainer: {
    backgroundColor: Colors.WhiteColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingTop: Dimension.padding10,
  },
  acceptCtabtn: {
    flex: 5,
    backgroundColor: Colors.BrandColor,
    borderRadius: 4,
    paddingVertical: Dimension.padding8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Dimension.margin10,
  },
  acceptCtaTxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.WhiteColor,
    fontSize: Dimension.font12,
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
  DownloadPoBtn: {
    flex: 1,
    backgroundColor: Colors.grayShade12,
    borderRadius: 4,
    paddingVertical: Dimension.padding8,
    justifyContent: 'center',
    alignItems: 'center',

    flexBasis: '100%',
    marginTop: Dimension.margin10,
  },
  showMoreCta: {
    marginLeft: Dimension.margin10,
    paddingVertical: Dimension.padding6,
  },
  LeftpartModal: {flex: 1},
  orderCardwrapInnerModal: {paddingHorizontal: Dimension.padding15},
  rupeeSign: {
    fontFamily: Dimension.CustomRobotoBold,
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    marginRight: Dimension.margin5,
  },
  TotalamounTxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    fontSize: Dimension.font12,
    color: Colors.FontColor,
  },
  taxpercentageTxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    fontSize: Dimension.font12,
    color: Colors.greenShade,
    marginLeft: Dimension.margin5,
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
