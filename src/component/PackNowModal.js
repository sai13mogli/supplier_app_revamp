import React, { useEffect, useState, useCallback } from 'react';
import {
  Dimensions,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import { getImageUrl, getPackNow, getLbh } from '../services/orders';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
import { OrderedMap } from 'immutable';
import CustomButton from '../component/common/Button';
import FloatingLabelInputField from './common/FloatingInput';
import FloatingInputDropdown from './FloatingInputDropdown';
import CustomeIcon from './common/CustomeIcon';
import Productcard from './Productcard';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const options = [
  {
    label: 'Cm',
    value: 'Cm',
  },
  {
    label: 'm',
    value: 'm',
  },
  {
    label: 'Km',
    value: 'Km',
  },
  {
    label: 'Ft',
    value: 'Ft',
  },
  {
    label: 'In',
    value: 'In',
  },
];
const PackNowModal = props => {
  const [orderImage, setOrderImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noOfPackets, setNoOfPackets] = useState('1');
  const [noOfPacketsError, setNoOfPacketsError] = useState(false);
  const [weight, setWeight] = useState('');
  const [weightLabel, setWeightLabel] = useState('Gm');
  const [heightLabel, setHeightLabel] = useState('Cm');
  const [lenghtLabel, setLenghtLabel] = useState('Cm');
  const [widthLabel, setWidthLabel] = useState('Cm');
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

  const unitWeightConversion = (weights, weightLabels) => {
    switch (weightLabels) {
      case 'Kg':
        let kiloGram = weights * 1000;
        return kiloGram;
      case 'Lb':
        let pondWeight = weights * 0.0022046;
        return pondWeight;
      default:
        return weights;
    }
  };

  const unitConversion = (heights, heightLabels) => {
    switch (heightLabels) {
      case 'm':
        let meterValue = heights * 100;
        return meterValue;
      case 'Km':
        let kilometer = heights * 100000;
        return kilometer;
      case 'Ft':
        let feet = heights * 30.48;
        return feet;
      case 'In':
        let Inches = heights * 2.54;
        return Inches;
      default:
        return heights;
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
    },
    weight: {
      title: 'Weight',
      label: 'Weight',
      isImp: true,
      component: FloatingInputDropdown,
      errorMessage: 'Enter Weight',
      showError: weightError,
      keyboardType: 'number-pad',
      onBlur: () => onweightBlur(),
      onValueChange: (text, label) => setWeigthValue(text, label),
      selectedValue: weightLabel,
      value: weight,
      options: [
        {
          label: 'Gm',
          value: 'Gm',
        },
        {
          label: 'Kg',
          value: 'Kg',
        },
        {
          label: 'Lb',
          value: 'Lb',
        },
      ],
      extraView: () => <View />,
    },
    height: {
      title: 'Height',
      label: 'Height',
      isImp: true,
      onChangeText: text => setHeight(text),
      component: FloatingInputDropdown,
      errorMessage: 'Enter Height',
      showError: heightError,
      keyboardType: 'number-pad',
      onBlur: () => onheightBlur(),
      onValueChange: (text, label) => setHeightValue(text, label),
      selectedValue: heightLabel,
      value: unitConversion(height, heightLabel),
      options: options,
      extraView: () => <View />,
    },
    length: {
      title: 'Length',
      label: 'Length',
      isImp: true,
      onChangeText: text => setLength(text),
      component: FloatingInputDropdown,
      errorMessage: 'Enter Length',
      showError: lengthError,
      keyboardType: 'number-pad',
      onBlur: () => onlengthBlur(),
      onValueChange: (text, label) => setLengthValue(text, label),
      selectedValue: lenghtLabel,
      value: length,
      options: options,
      extraView: () => <View />,
    },
    width: {
      title: 'Width',
      label: 'Width',
      isImp: true,
      onChangeText: text => setWidth(text),
      component: FloatingInputDropdown,
      errorMessage: 'Enter Width',
      showError: widthError,
      keyboardType: 'number-pad',
      onBlur: () => onwidthBlur(),
      onValueChange: (text, label) => setWidthValue(text, label),
      selectedValue: widthLabel,
      value: width,
      options: options,
      extraView: () => <View />,
    },
  });

  const setWeigthValue = (text, label) => {
    setWeightLabel(label);
  };
  const setHeightValue = (text, label) => {
    setHeightLabel(label);
  };
  const setLengthValue = (text, label) => {
    setLenghtLabel(label);
  };
  const setWidthValue = (text, label) => {
    setWidthLabel(label);
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
    fetchLbh();
  }, []);

  const fetchLbh = async () => {
    try {
      let payload = {
        msn,
        qty: quantity,
      };
      const { data } = await getLbh(payload);
      if (data && data.success) {
        setHeight(data && data.data && data.data.height);
        setLength(data && data.data && data.data.length);
        setWeight(data && data.data && data.data.weight);
        setWidth(data && data.data && data.data.width);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPackNow = async () => {
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

      const { data } = await getPackNow({
        length: unitConversion(length, lenghtLabel),
        width: unitConversion(width, weightLabel),
        height: unitConversion(height, heightLabel),
        weight: unitWeightConversion(weight, weightLabel),
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
    const { data } = await getImageUrl(msn);
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
      style={{ padding: 0, margin: 'auto', width: '100%', height: '100%' }}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      //height={'80%'}
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
          <Text style={styles.headerTxt}>Pack Order</Text>
        </View>
        <ScrollView bounces>
          <>
            <View style={{ paddingHorizontal: Dimension.padding15 }}>
              {renderOrderDetails()}
            </View>
          </>

          <View style={styles.BottomDataWrap}>
            {FORM_FIELDS.map((_, key) => (
              <_.component key={key} {..._} />
            )).toList()}
          </View>
        </ScrollView>
        <View style={styles.bottomAction}>
          <View style={{ flex: 1 }}>
            <CustomButton
              title="RESET"
              buttonColor={Colors.WhiteColor}
              borderColor={Colors.WhiteColor}
              TextColor={Colors.blackColor}
              TextFontSize={Dimension.font16}
              onPress={() => {
                setNoOfPackets('');
                setNoOfPacketsError(false);
                setWeight('');
                setWeightError(false);
                setHeight('');
                setHeightError(false);
                setLength('');
                setLengthError(false);
                setWidth('');
                setWidthError(false);
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <CustomButton
              title="PACK NOW"
              loading={loading}
              disabled={loading}
              buttonColor={Colors.BrandColor}
              borderColor={Colors.BrandColor}
              TextColor={Colors.WhiteColor}
              TextFontSize={Dimension.font16}
              onPress={() => onPackNow()}
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
    //marginTop: 'auto',
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

  BottomDataWrap: {
    paddingVertical: Dimension.padding30,
    paddingHorizontal: Dimension.padding15,
    //maxHeight:200
    //flex:1
  },
  BottomDataTitle: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginBottom: Dimension.margin10,
  },
  InputRighttxt: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
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

export default React.memo(PackNowModal);
