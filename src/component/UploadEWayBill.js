import React, {useEffect, useState, useCallback} from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {getImageUrl, getSplitHistory} from '../services/orders';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
import CustomeDatePicker from '../component/common/Datepicker';
import FileUpload from '../component/common/FileUpload';
import {OrderedMap} from 'immutable';
import DocumentPicker from 'react-native-document-picker';
import CustomButton from '../component/common/Button';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../redux/constants';
import Productcard from './Productcard';
import CustomeIcon from './common/CustomeIcon';
import FloatingLabelInputField from './common/FloatingInput';
import {useSelector} from 'react-redux';
const deviceWidth = Dimensions.get('window').width;

const UploadEWayBillModal = props => {
  const profileData = useSelector(state => state.profileReducer.data || {});
  const [orderImage, setOrderImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(false);
  const [orderPickupDate, setOrderPickupDate] = useState('');
  const [podFile, setPodFile] = useState({});
  const [orderPickupDateError, setOrderPickupDateError] = useState(false);
  const [podFileError, setPodFileError] = useState(false);
  const [showMoreTxt, setShowMoreTxt] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const [eWayBillDate, setEWayBillDate] = useState('');
  const [eWayBillDateError, setEWayBillDateError] = useState(false);
  const [eWayBillNumber, setEWayBillNumber] = useState('');
  const [eWayBillNumberError, setEWayBillNumberError] = useState(false);
  const [eWayBillFile, setEWayBillFile] = useState('');
  const [eWayBillFileError, setEWayBillFileError] = useState(false);

  const onPress = id => {
    uploadFromFileExp();
  };

  //upload from fileExp
  const uploadFromFileExp = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        // type: [DocumentPicker],
      });
      setEWayBillFile(res[0]);
      setEWayBillFileError(false);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled from single doc picker');
      } else {
        console.log('error', err);
        throw err;
      }
    }
  };

  const FORM_FIELDS = new OrderedMap({
    eWayBillNumber: {
      title: 'Eway Bill Number',
      isImp: true,
      label: 'Eway Bill Number',
      placeholder: 'Eway Bill Number',
      errorMessage: 'Enter valid Eway Bill Number',
      showError: eWayBillNumberError,
      value: eWayBillNumber,
      keyboardType: 'number-pad',
      onChangeText: text => setEWayBillNumber(text),
      component: FloatingLabelInputField,
    },
    eWayBillDate: {
      title: 'EWay Bill Date',
      isImp: true,
      label: 'EWay Bill Date',
      placeholder: '',
      errorMessage: 'Enter valid EWay Bill Date',
      value: eWayBillDate,
      onBlur: () => onEWayBillDateBlur(),
      onChange: date => setEWayBillDate(date),
      component: CustomeDatePicker,
      showError: eWayBillDate ? null : eWayBillDateError,
    },
    eWayBillFile: {
      label: 'Upload Eway Bill',
      isImp: true,
      value: eWayBillFile.name,
      documents: {
        name: eWayBillFile.name,
        doc: eWayBillFile,
      },
      loading: false,
      //showDoc: true,
      fileUpload: 2,
      errorState: eWayBillFile.name ? null : eWayBillFileError,
      errorText: 'Please upload POD File',
      onPress: onPress,
      disabled: false,
      uploadDocument: d => {
        console.log(d);
      },
      onBlur: () => onUploadEWayBillFileBlur(),
      setUpload: d => {
        console.log(d);
      },
      component: FileUpload,
    },
  });

  const {
    isVisible,
    setModal,
    msn,
    quantity,
    orderRef,
    createdAt,
    itemRef,
    itemId,
    pickupDate,
    transferPrice,
    hsn,
    productName,
    orderTypeString,
    shipmentMode,
    isVmi,
    shipmentModeString,
    taxPercentage,
    totalAmount,
    supplierId,
  } = props;

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    const {data} = await getImageUrl(msn);
    let imageUrl =
      'https://cdn.moglix.com/' +
      (data &&
        data.productBO &&
        data.productBO.productPartDetails &&
        data.productBO.productPartDetails[msn] &&
        data.productBO.productPartDetails[msn].images &&
        data.productBO.productPartDetails[msn].images[0] &&
        data.productBO.productPartDetails[msn].images[0].links.medium);
    let validUrl = imageUrl.split('/');
    if (!validUrl.includes('null')) {
      setOrderImage(imageUrl);
    }
  };

  const onEWayBillDateBlur = () => {
    if (orderPickupDate && orderPickupDate.length) {
      setEWayBillDateError(false);
    } else {
      setEWayBillDateError(true);
    }
  };

  const onUploadEWayBillFileBlur = () => {
    if (podFile && podFile.name) {
      setEWayBillFileError(false);
    } else {
      setEWayBillFileError(true);
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
  const onMarkDelivered = async () => {
    if (
      eWayBillFile &&
      eWayBillFile.name &&
      eWayBillDate &&
      eWayBillNumber &&
      eWayBillNumber.length
    ) {
      try {
        console.log([
          {
            name: 'ewayBillNumber',
            data: eWayBillNumber,
          },
          {
            name: 'ewayBillDocumentDate',
            data: eWayBillDate.split('-').reverse().join('-'),
          },
          {
            name: 'emailId',
            data: profileData.email,
          },
          {
            name: 'itemId',
            data: `${itemId}`,
          },
          {
            name: 'ewaybillDocument',
            filename: eWayBillFile.name,
            type: eWayBillFile.type,
            data: RNFetchBlob.wrap(eWayBillFile.uri),
          },
        ]);
        setLoading(true);
        let token = `Bearer ${await AsyncStorage.getItem('token')}`;
        const url = `https://apigatewayqa.moglix.com/api/order/oms/ewayBillUpload`;
        const response = await RNFetchBlob.fetch(
          'POST',
          url,
          {
            'Content-Type': 'multipart/form-data',
            Authorization: `${token}`,
          },
          [
            {
              name: 'ewayBillNumber',
              data: eWayBillNumber,
            },
            {
              name: 'ewayBillDocumentDate',
              data: eWayBillDate.split('-').reverse().join('-'),
            },
            {
              name: 'itemId',
              data: `${itemId}`,
            },
            {
              name: 'ewaybillDocument',
              filename: eWayBillFile.name,
              type: eWayBillFile.type,
              data: RNFetchBlob.wrap(eWayBillFile.uri),
            },
          ],
        );
        const res = await response.json();
        console.log(res, 'dwefewfwensakkca');
        setLoading(false);
        setModal(false);
        props.onProofOfDeliveryDone();
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      onEWayBillDateBlur();
      onUploadEWayBillFileBlur();
    }
  };

  return (
    <Modal
      overlayPointerEvents={'auto'}
      isVisible={isVisible}
      onTouchOutside={() => {
        setModal(false);
      }}
      onDismiss={() => {
        setModal(false);
      }}
      coverScreen={true}
      style={{
        padding: 0,
        margin: 0,
      }}
      deviceWidth={deviceWidth}
      hasBackdrop={true}
      onBackdropPress={() => setModal(false)}
      onBackButtonPress={() => setModal(false)}>
      <View
        style={[
          styles.modalContainer,
          {maxHeight: Dimensions.get('window').height * 0.9},
        ]}>
        <View style={styles.topbdr}></View>
        <View style={styles.closeIconWrap}>
          <CustomeIcon
            name={'close'}
            size={Dimension.font22}
            color={Colors.FontColor}
            onPress={() => {
              setModal(false);
            }}
          />
        </View>
        <View style={styles.headerTxtWrap}>
          <Text style={styles.headerTxt}>UPLOAD E-WAY BILL</Text>
        </View>
        <ScrollView>
          <>
            <View style={{paddingHorizontal: Dimension.padding15}}>
              {renderOrderDetails()}
            </View>
          </>

          <View style={styles.BottomDataWrap}>
            {FORM_FIELDS.map((_, key) => (
              <_.component key={key} {..._} />
            )).toList()}
          </View>
          <View style={styles.bottomAction}>
            <View style={{flex: 1}}>
              <CustomButton
                title="CANCEL"
                buttonColor={Colors.WhiteColor}
                borderColor={Colors.WhiteColor}
                TextColor={Colors.blackColor}
                TextFontSize={Dimension.font16}
                onPress={() => {
                  setModal(false);
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <CustomButton
                title="UPLOAD E-WAY BILL"
                loading={loading}
                disabled={
                  loading ||
                  !eWayBillFile.name ||
                  !eWayBillDate ||
                  !eWayBillNumber
                }
                buttonColor={Colors.BrandColor}
                borderColor={Colors.BrandColor}
                TextColor={Colors.WhiteColor}
                TextFontSize={Dimension.font16}
                onPress={() => onMarkDelivered()}
              />
            </View>
          </View>
        </ScrollView>
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
    //maxHeight:200
    //flex:1
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
});

export default React.memo(UploadEWayBillModal);
