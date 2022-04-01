import React, {useEffect, useState, useCallback} from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {getImageUrl, getPackNow} from '../services/orders';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
import {OrderedMap} from 'immutable';
import CustomButton from '../component/common/Button';
import FloatingLabelInputField from './common/FloatingInput';

const deviceWidth = Dimensions.get('window').width;

const PackNowModal = props => {
  const [orderImage, setOrderImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noOfPackets, setNoOfPackets] = useState('');
  const [noOfPacketsError, setNoOfPacketsError] = useState(false);
  const [weight, setWeight] = useState('');
  const [weightError, setWeightError] = useState(false);
  const [height, setHeight] = useState('');
  const [heightError, setHeightError] = useState(false);
  const [length, setLength] = useState('');
  const [lengthError, setLengthError] = useState(false);
  const [width, setWidth] = useState('');
  const [widthError, setWidthError] = useState(false);

  const onnoOfPacketsBlur = () => {
    if (noOfPackets && noOfPackets.length) {
      setNoOfPacketsError(false);
    } else {
      setNoOfPacketsError(true);
    }
  };

  const onweightBlur = () => {
    if (weight && weight.length) {
      setWeightError(false);
    } else {
      setWeightError(true);
    }
  };

  const onheightBlur = () => {
    if (height && height.length) {
      setHeightError(false);
    } else {
      setHeightError(true);
    }
  };

  const onlengthBlur = () => {
    if (length && length.length) {
      setLengthError(false);
    } else {
      setLengthError(true);
    }
  };

  const onwidthBlur = () => {
    if (width && width.length) {
      setWidthError(false);
    } else {
      setWidthError(true);
    }
  };

  const FORM_FIELDS = new OrderedMap({
    noOfPackets: {
      title: 'No. Of Packets',
      label: 'No. Of Packets',
      isImp: true,
      value: noOfPackets,
      onChangeText: text => setNoOfPackets(text),
      component: FloatingLabelInputField,
      errorMessage: 'Enter packet count',
      showError: noOfPacketsError,
      keyboardType: 'number-pad',
      onBlur: () => onnoOfPacketsBlur(),
      //   extraView: () => getExtraView(),
    },
    weight: {
      title: 'Weight',
      label: 'Weight',
      isImp: true,
      value: weight,
      onChangeText: text => setWeight(text),
      component: FloatingLabelInputField,
      errorMessage: 'Enter Weight',
      showError: weightError,
      keyboardType: 'number-pad',
      onBlur: () => onweightBlur(),
      extraView: () => <Text style={{color: '#000'}}>Kg</Text>,
    },
    height: {
      title: 'Height',
      label: 'Height',
      isImp: true,
      value: height,
      onChangeText: text => setHeight(text),
      component: FloatingLabelInputField,
      errorMessage: 'Enter Height',
      showError: heightError,
      keyboardType: 'number-pad',
      onBlur: () => onheightBlur(),
      extraView: () => <Text style={{color: '#000'}}>cm</Text>,
    },
    length: {
      title: 'Length',
      label: 'Length',
      isImp: true,
      value: length,
      onChangeText: text => setLength(text),
      component: FloatingLabelInputField,
      errorMessage: 'Enter Length',
      showError: lengthError,
      keyboardType: 'number-pad',
      onBlur: () => onlengthBlur(),
      //   extraView: () => getExtraView(),
    },
    width: {
      title: 'Width',
      label: 'Width',
      isImp: true,
      value: width,
      onChangeText: text => setWidth(text),
      component: FloatingLabelInputField,
      errorMessage: 'Enter Width',
      showError: widthError,
      keyboardType: 'number-pad',
      onBlur: () => onwidthBlur(),
      //   extraView: () => getExtraView(),
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
    onPackNowSuccess,
  } = props;

  useEffect(() => {
    fetchImage();
  }, []);

  const onPackNow = async () => {
    console.log(
      noOfPackets,
      weight,
      height,
      length,
      width,
      !noOfPacketsError,
      !weightError,
      !heightError,
      !lengthError,
      !widthError,
    );
    if (
      noOfPackets &&
      weight &&
      height &&
      length &&
      width &&
      !noOfPacketsError &&
      !weightError &&
      !heightError &&
      !lengthError &&
      !widthError
    ) {
      setLoading(true);
      const {data} = await getPackNow({
        length,
        width,
        height,
        weight,
        packetNo: noOfPackets,
        source: 0,
        itemId,
        supplierId,
      });
      if (data.success) {
        setModal(false);
        onPackNowSuccess();
      }
      setLoading(false);
    }
  };

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
        <>
          <Text style={{color: '#000'}}>Pack Order</Text>
          <View style={styles.orderCardwrapInner}>
            <View style={styles.leftpart}>
              <Image
                source={{
                  uri:
                    orderImage ||
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                }}
                style={[styles.imgStyleModal]}
              />
            </View>
            <View style={styles.rightPart}>
              <Text style={[{color: '#000'}, styles.msnName]}>{msn}</Text>

              <Text style={styles.productName}>{productName}</Text>

              <>
                <Text style={{color: '#000'}}> ₹{Math.floor(totalAmount)}</Text>
                <Text style={{color: '#000'}}>{taxPercentage}%</Text>
              </>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: Dimension.margin20}}>
                  <Text style={styles.TitleLightTxt}>
                    PO ID - <Text style={styles.TitleBoldTxt}>{orderRef}</Text>
                  </Text>
                  <Text style={styles.TitleLightTxt}>
                    PO Date -{' '}
                    <Text style={styles.TitleBoldTxt}>
                      {getTime(createdAt, false)}
                    </Text>
                  </Text>
                  <Text style={styles.TitleLightTxt}>
                    PO Item ID -{' '}
                    <Text style={styles.TitleBoldTxt}>{itemRef}</Text>
                  </Text>
                </View>

                <View>
                  <Text style={styles.TitleLightTxt}>
                    TP/Unit -{' '}
                    <Text style={styles.TitleBoldTxt}>
                      ₹{Math.floor(transferPrice)}
                    </Text>
                  </Text>
                  <Text style={styles.TitleLightTxt}>
                    Product HSN - <Text style={styles.TitleBoldTxt}>{hsn}</Text>
                  </Text>
                  <Text style={styles.TitleLightTxt}>
                    Date -{' '}
                    <Text style={styles.TitleBoldTxt}>
                      {getTime(pickupDate, false)}
                    </Text>
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', marginTop: Dimension.margin10}}>
                <Text style={styles.GstWrapTxt}>{orderTypeString}</Text>
                <Text style={styles.shipmentModeWrap}>
                  {shipmentMode == 2
                    ? 'Dropship'
                    : shipmentMode == 3
                    ? 'Door Delivery'
                    : 'Oneship'}
                </Text>
                {isVmi ? <Text style={styles.VMIWrap}>VMI</Text> : null}
                <Text style={styles.shipmentModeStringWrap}>
                  {shipmentModeString}
                </Text>
              </View>
            </View>
          </View>
        </>

        <ScrollView style={{flexDirection: 'column'}}>
          {FORM_FIELDS.map((_, key) => (
            <_.component key={key} {..._} />
          )).toList()}
        </ScrollView>
        <CustomButton
          title="Mark Delivered"
          loading={loading}
          disabled={loading}
          buttonColor={Colors.BrandColor}
          borderColor={Colors.BrandColor}
          TextColor={Colors.WhiteColor}
          TextFontSize={Dimension.font16}
          onPress={() => onPackNow()}
        />
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

export default React.memo(PackNowModal);
