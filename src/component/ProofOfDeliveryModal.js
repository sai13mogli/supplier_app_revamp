import React, {useEffect, useState, useCallback} from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
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
const deviceWidth = Dimensions.get('window').width;

const ProofOfDeliveryModal = props => {
  const [orderImage, setOrderImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(false);
  const [orderPickupDate, setOrderPickupDate] = useState('');
  const [podFile, setPodFile] = useState({});
  const [orderPickupDateError, setOrderPickupDateError] = useState(false);
  const [podFileError, setPodFileError] = useState(false);
  const [showMoreTxt, setShowMoreTxt] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

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
      setPodFile(res[0]);
      setPodFileError(false);
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
    orderPickupDate: {
      title: 'Pickup Date',
      isImp: true,
      label: 'Pickup Date',
      placeholder: '',
      errorMessage: 'Enter valid pickup date',
      value: orderPickupDate,
      onBlur: () => onOrderPickUpDateBlur(),
      onChange: date => setOrderPickupDate(date),
      component: CustomeDatePicker,
      showError: orderPickupDate ? null : orderPickupDateError,
    },
    podFile: {
      label: 'Upload POD File',
      isImp: true,
      value: podFile.name,
      documents: {
        name: podFile.name,
        doc: podFile,
      },
      loading: false,
      //showDoc: true,
      fileUpload: 2,
      errorState: podFile.name ? null : podFileError,
      errorText: 'Please upload POD File',
      onPress: onPress,
      disabled: false,
      uploadDocument: d => {
        console.log(d);
      },
      onBlur: () => onUploadPodFileBlur(),
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

  const onOrderPickUpDateBlur = () => {
    if (orderPickupDate && orderPickupDate.length) {
      setOrderPickupDateError(false);
    } else {
      setOrderPickupDateError(true);
    }
  };

  const onUploadPodFileBlur = () => {
    if (podFile && podFile.name) {
      setPodFileError(false);
    } else {
      setPodFileError(true);
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
    if (orderPickupDate && orderPickupDate.length) {
      try {
        setLoading(true);
        let token = `Bearer ${await AsyncStorage.getItem('token')}`;
        const url = `${BASE_URL}api/order/deliveryDone`;
        const response = await RNFetchBlob.fetch(
          'POST',
          url,
          {
            'Content-Type': 'multipart/form-data',
            Authorization: `${token}`,
          },
          [
            {
              name: 'deliveryDate',
              data: orderPickupDate.split('-').reverse().join('-'),
            },
            {
              name: 'source',
              data: '0',
            },
            {
              name: 'itemId',
              data: `${itemId}`,
            },
            {
              name: 'file',
              filename: podFile.name,
              type: podFile.type,
              data: RNFetchBlob.wrap(podFile.uri),
            },
          ],
        );

        const res = await response.json();
        setLoading(false);
        setModal(false);
        props.onProofOfDeliveryDone();
      } catch (err) {
        setLoading(false);
      }
    } else {
      onOrderPickUpDateBlur();
      onUploadPodFileBlur();
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
      style={{padding: 0, margin: 0}}
      deviceWidth={deviceWidth}
      hasBackdrop={true}
      onBackdropPress={() => setModal(false)}
      onBackButtonPress={() => setModal(false)}>
      <View style={styles.modalContainer}>
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
          <Text style={styles.headerTxt}>UPLOAD PROOF OF DELIVERY</Text>
        </View>
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
              title="MARK DELIVERED"
              loading={loading}
              disabled={loading || !podFile.name || !orderPickupDate}
              buttonColor={Colors.BrandColor}
              borderColor={Colors.BrandColor}
              TextColor={Colors.WhiteColor}
              TextFontSize={Dimension.font16}
              onPress={() => onMarkDelivered()}
            />
          </View>
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

export default React.memo(ProofOfDeliveryModal);
