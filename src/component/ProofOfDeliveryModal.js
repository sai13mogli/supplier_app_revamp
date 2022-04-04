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
      console.log('doc', res[0]);
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
      onChange: date => setOrderPickupDate(date),
      component: CustomeDatePicker,
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
      showDoc: true,
      fileUpload: 2,
      errorState: podFileError,
      errorText: 'Please upload POD File',
      onPress: onPress,
      disabled: false,
      uploadDocument: d => {
        console.log(d);
      },
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

  const getTime = (time, acceptrejectOrder) => {
    let months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];
    let date = new Date(Number(time));
    if (acceptrejectOrder) {
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }
    return `${months[date.getMonth()]} ${date.getDate()},${date.getFullYear()}`;
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
              <Text style={styles.headerTxt}>PROOF OF DELIVERY</Text>
           </View>
        <>
         
          <View style={{paddingHorizontal: Dimension.padding15}}>
          {renderOrderDetails()}
        </View>
        </>

        <View style={{flexDirection: 'column'}}>
          {FORM_FIELDS.map((_, key) => (
            <_.component key={key} {..._} />
          )).toList()}
          <CustomButton
            title="Mark Delivered"
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
    height: Dimension.width50,
    height: Dimension.height50,
    //alignSelf:'center'
  },
  imgStyleModal: {
    borderRadius: 4,
    backgroundColor: Colors.WhiteColor,
    padding: 2,
    height: Dimension.width100,
    height: Dimension.height100,
    //alignSelf:'center'
  },
  quantityTxt: {
    alignSelf: 'center',
    backgroundColor: '#E2E2E2',
    borderRadius: 2,
    marginTop: Dimension.margin8,
    width: '100%',
    alignItems: 'center',
    paddingVertical: Dimension.padding5,
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
    backgroundColor: Colors.grayShade12,
    borderRadius: 4,
    paddingVertical: Dimension.padding8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectCtaTxt: {
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
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default React.memo(ProofOfDeliveryModal);
