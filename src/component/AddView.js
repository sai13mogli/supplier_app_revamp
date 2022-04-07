import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import Modal from 'react-native-modal';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Productcard from './Productcard';
import CustomeIcon from './common/CustomeIcon';
import FloatingLabelInputField from './common/FloatingInput';
import {viewSerialNumber, addSerialNumber} from '../services/orders';
const deviceWidth = Dimensions.get('window').width;
const AddView = props => {
  const {
    addViewModal,
    setAddViewModal,
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
  const [serialNumber, setSerialNumber] = useState('');
  const [serialNumberError, setSerialNumberError] = useState('');
  const [serialNumberList, setSerialNumberList] = useState([]);
  const [submitLoader, setSubmitLoader] = useState(false);

  useEffect(() => {
    fetchSerialNumber();
  }, []);

  const fetchSerialNumber = async () => {
    try {
      const {data} = await viewSerialNumber({
        supplierId: await AsyncStorage.getItem('userId'),
        itemId: itemId,
      });
      if (data && data.success) {
        setSerialNumber(
          data.serialNumberList[data.serialNumberList.length - 1],
        );
        setSerialNumberList(data.serialNumberList);
      } else {
        setSerialNumberError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    try {
      setSubmitLoader(true);
      const {data} = await addSerialNumber({
        supplierId: await AsyncStorage.getItem('userId'),
        itemId: itemId,
        serialNumberList: [...serialNumberList],
      });
      if (data && data.success) {
        setSubmitLoader(false);
        setSerialNumber(
          data.serialNumberList[data.serialNumberList.length - 1],
        );
        setSerialNumberList(data.serialNumberList);
        setAddViewModal(false);
      } else {
        setSubmitLoader(false);
        setSerialNumberError(data.message);
      }
    } catch (error) {
      setSubmitLoader(false);
      console.log(error);
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
      isVisible={addViewModal}
      onTouchOutside={() => {
        setAddViewModal(false);
      }}
      onDismiss={() => {
        setAddViewModal(false);
      }}
      coverScreen={true}
      style={{padding: 0, margin: 0}}
      deviceWidth={deviceWidth}
      hasBackdrop={true}
      onBackdropPress={() => setAddViewModal(false)}
      onBackButtonPress={() => setAddViewModal(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.topbdr}></View>
      <View style={styles.closeIconWrap}>
          <CustomeIcon
                name={'close'}
                size={Dimension.font22}
                color={Colors.FontColor}
                onPress={() => {
                  setAddViewModal(false);
                }}
              />  
          </View>
          <View style={styles.headerTxtWrap}>
              <Text style={styles.headerTxt}>Add serial number</Text>
           </View>
        <View style={{paddingHorizontal: Dimension.padding15}}>
          {renderOrderDetails()}
        </View>
        <View style={styles.BottomDataWrap}>

        
        <FloatingLabelInputField
          title={'Add Serial Number'}
          label={'Add Serial Number'}
          isImp={true}
          value={serialNumber}
          onChangeText={text => setSerialNumber(text)}
          errorMessage={serialNumberError}
          placeholder={'Add Serial Number'}
          showError={serialNumberError}
          //   onBlur={() => onPasswordBlur()}
          //   secureTextEntry={isSecure}
          //   extraView={() => getExtraView()}
        />
</View>
        <View style={styles.btnWrap}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setAddViewModal(false)}>
            <Text style={styles.canceltxt}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectCtabtn} onPress={onSubmit}>
            <Text style={styles.rejectCtaTxt}>SUBMIT</Text>
            {submitLoader && (
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
   // height:deviceHeight-100
  },
  topbdr: {
    alignSelf: 'center',
    height: 3,
    backgroundColor: Colors.modalBorder,
    borderRadius: 2,
    width: Dimension.width70,
  },
  closeIconWrap:{
    alignItems:"flex-end",
    paddingHorizontal:Dimension.padding15,
  },
  headerTxtWrap:{
    paddingHorizontal:Dimension.padding15,
    marginBottom:Dimension.margin20
  },

  headerTxt:{
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
   // marginLeft:Dimension.margin10,

  },
  showMoreCta: {
    marginLeft: Dimension.margin10,
    paddingVertical: Dimension.padding6,
  },
  
  BottomDataWrap:{
paddingVertical:Dimension.padding30,
paddingHorizontal:Dimension.padding15
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

export default AddView;
