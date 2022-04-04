import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import Dimension from '../Theme/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import Colors from '../Theme/Colors';
import Toast from 'react-native-toast-message';
import CustomeIcon from './common/CustomeIcon';
import Productcard from './Productcard';
import FloatingLabelInputField from './common/FloatingInput';
import {splitItem} from '../services/orders';
const deviceWidth = Dimensions.get('window').width;

const SplitQuantityModal = props => {
  const {
    splitQuantityModal,
    setSplitQuantityModal,
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
    taxPercentage,
    totalAmount,
    invoiceUrl,
    orderImage,
    fetchOrdersFunc,
    fetchTabCountFunc,
    itemId,
  } = props;
  const [splitQuantity, setSplitQuantity] = useState(0);
  const [splitPortion, setSplitPortion] = useState({});
  const [splitLoader, setSplitLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

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

  const setPortions = (portionId, text) => {
    let currentPortionIds = {...splitPortion};
    if (currentPortionIds.hasOwnProperty(`${portionId}`)) {
      currentPortionIds[`${portionId}`] = text;
    } else {
      if (currentPortionIds) {
        currentPortionIds[`${portionId}`] = text;
      } else {
        currentPortionIds = {};
        currentPortionIds[`${portionId}`] = text;
      }
    }
    setSplitPortion(currentPortionIds);
  };

  const resetSplitQuantity = () => {
    setSplitQuantity(0);
    setSplitPortion({});
  };

  const renderSplitPortion = () => {
    let portions = [];
    if (splitQuantity && splitQuantity != 0 && splitQuantity > 0) {
      for (let i = 0; i < splitQuantity; i++) {
        portions.push(
          <FloatingLabelInputField
            key={i}
            title={`Portion ${i < 9 ? `0${i + 1}` : i + 1}`}
            label={`Portion ${i < 9 ? `0${i + 1}` : i + 1}`}
            isImp={true}
            value={splitPortion[`${i}`]}
            onChangeText={text => setPortions(i, text)}
            showError={errorMsg && !splitPortion[`${i}`]}
            errorMessage={`Partition ${
              i < 9 ? `0${i + 1}` : i + 1
            } can't be empty`}
          />,
        );
      }
      return portions;
    } else {
      return null;
    }
  };

  const onSplit = async () => {
    try {
      setSplitLoader(true);
      let currSplitPortion = {...splitPortion};
      let quantities = Object.values(currSplitPortion);
      let numberQuantities = (quantities || []).map(_ => Number(_));
      if (quantities.length == splitQuantity) {
        const {data} = await splitItem({
          supplierId: await AsyncStorage.getItem('userId'),
          itemId: itemId,
          source: 0,
          itemQty: numberQuantities,
        });
        if (data && data.success) {
          setSplitLoader(false);
          setSplitQuantityModal(false);
          Toast.show({
            type: 'success',
            text2: data.message,
            visibilityTime: 2000,
            autoHide: true,
          });
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
        } else {
          console.log(data);
          setSplitLoader(false);
          Toast.show({
            type: 'error',
            text2: data.message,
            visibilityTime: 2000,
            autoHide: true,
          });
          setSplitQuantityModal(false);
        }
      } else {
        setErrorMsg(true);
        setSplitLoader(false);
      }
    } catch (error) {
      setSplitLoader(false);
      console.log(error);
    }
  };

  return (
    <Modal
      overlayPointerEvents={'auto'}
      isVisible={splitQuantityModal}
      onTouchOutside={() => {
        setSplitQuantityModal(false);
      }}
      onDismiss={() => {
        setSplitQuantityModal(false);
      }}
      coverScreen={true}
      style={{padding: 0, margin: 0}}
      deviceWidth={deviceWidth}
      hasBackdrop={true}
      onBackdropPress={() => false}
      onBackButtonPress={() => setSplitQuantityModal(false)}>
      {/* <Toast ref={modalToastRef} /> */}
      <View style={styles.modalContainer}>
        <View style={styles.topbdr}></View>

        <View style={styles.ModalheadingWrapper}>
        <Text style={styles.ModalHeading}>
          Split Quantity
        </Text>
          <CustomeIcon
            name={'close'}
            size={Dimension.font22}
            color={Colors.FontColor}
            onPress={() => setSplitQuantityModal(false)}></CustomeIcon>
        </View>
        
        <View style={{paddingHorizontal: Dimension.padding15}}>
          {renderOrderDetails()}
        </View>
        <FloatingLabelInputField
          title={'Split in portion'}
          label={'Split in portion'}
          isImp={true}
          value={splitQuantity}
          onChangeText={text => setSplitQuantity(text)}
          //   errorMessage={serialNumberError}
          placeholder={'Type the number you want to split the quantity in'}
          //   showError={serialNumberError}
          //   onBlur={() => onPasswordBlur()}
          //   secureTextEntry={isSecure}
          //   extraView={() => getExtraView()}
        />
        {renderSplitPortion()}
        <View style={styles.btnWrap}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={resetSplitQuantity}>
            <Text style={styles.canceltxt}>RESET</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSplit}
            style={[
              splitQuantity > 0
                ? styles.rejectCtabtn
                : styles.disabledrejectCtabtn,
            ]}
            disabled={splitQuantity == 0}>
            <Text
              style={[
                splitQuantity > 0
                  ? styles.rejectCtaTxt
                  : styles.disabledrejectCtaTxt,
              ]}>
              SPLIT
            </Text>
            {splitLoader && (
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
  disabledrejectCtabtn: {
    flex: 5,
    backgroundColor: 'gray',
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
  disabledrejectCtaTxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    color: '#000',
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
  ModalHeading: {
    fontSize: Dimension.font16,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginBottom: Dimension.margin5,
  },
});

export default SplitQuantityModal;
