import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
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
const deviceHeight = Dimensions.get('window').height;

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
          props.setLoadingTabs(true);
        } else {
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
      deviceHeight={deviceHeight}
      hasBackdrop={true}
      onBackdropPress={() => false}
      onBackButtonPress={() => setSplitQuantityModal(false)}>
      {/* <Toast ref={modalToastRef} /> */}
      <View style={styles.modalContainer}>
        <View style={styles.topbdr}></View>
        <View style={styles.closeIconWrap}>
          <CustomeIcon
            name={'close'}
            size={Dimension.font22}
            color={Colors.FontColor}
            onPress={() => {
              setSplitQuantityModal(false);
            }}
          />
        </View>
        <View style={styles.headerTxtWrap}>
          <Text style={styles.headerTxt}>Split Quantity</Text>
        </View>
        <ScrollView>
          <View style={{paddingHorizontal: Dimension.padding15}}>
            {renderOrderDetails()}
          </View>
          <View style={styles.BottomDataWrap}>
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
          </View>
        </ScrollView>
        <View style={styles.bottomAction}>
          <TouchableOpacity
            style={styles.ResetCtabtn}
            onPress={resetSplitQuantity}>
            <Text style={styles.ResetCtaTxt}>RESET</Text>
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
                splitQuantity > 0 ? styles.rejectCtaTxt : styles.ResetCtaTxt,
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
    height: deviceHeight - 100,
  },
  topbdr: {
    alignSelf: 'center',
    height: 3,
    backgroundColor: Colors.modalBorder,
    borderRadius: 2,
    width: Dimension.width70,
  },
  closeIconWrap: {
    alignItems: 'flex-end',
    paddingHorizontal: Dimension.padding15,
  },
  headerTxtWrap: {
    paddingHorizontal: Dimension.padding15,
    marginBottom: Dimension.margin20,
  },

  headerTxt: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    // marginLeft:Dimension.margin10,
  },
  showMoreCta: {
    marginLeft: Dimension.margin10,
    paddingVertical: Dimension.padding6,
  },

  BottomDataWrap: {
    paddingVertical: Dimension.padding30,
    paddingHorizontal: Dimension.padding15,
  },
  bottomAction: {
    borderTopWidth: 1,
    borderTopColor: Colors.grayShade2,
    padding: Dimension.padding15,
    backgroundColor: Colors.WhiteColor,
    //position: 'absolute',
    width: '100%',
    //bottom: 0,
    flexDirection: 'row',
  },
  ResetCtabtn: {
    flex: 1,
    backgroundColor: Colors.WhiteColor,
    //borderRadius: 4,
    paddingVertical: Dimension.padding12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ResetCtaTxt: {
    fontFamily: Dimension.CustomMediumFont,
    color: Colors.FontColor,
    fontSize: Dimension.font16,
  },
  rejectCtabtn: {
    flex: 1,
    backgroundColor: Colors.BrandColor,
    borderRadius: 4,
    paddingVertical: Dimension.padding12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectCtaTxt: {
    fontFamily: Dimension.CustomMediumFont,
    color: Colors.WhiteColor,
    fontSize: Dimension.font16,
  },
  disabledrejectCtabtn: {
    flex: 1,
    backgroundColor: Colors.grayShade10,
    borderRadius: 4,
    paddingVertical: Dimension.padding12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplitQuantityModal;
