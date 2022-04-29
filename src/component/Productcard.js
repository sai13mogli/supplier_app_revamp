import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import Modal from 'react-native-modal';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';

const Productcard = props => {
  const {
    quantity,
    productName,
    totalAmount,
    orderRef,
    createdAt,
    itemRef,
    transferPrice,
    hsn,
    pickupDate,
    orderTypeString,
    shipmentMode,
    isVmi,
    shipmentModeString,
    taxPercentage,
    msn,
    orderImage,
  } = props;
  const [showMoreTxt, setShowMoreTxt] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length > 1);
  }, []);

  const getTime = time => {
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
    return `${months[date.getMonth()]} ${date.getDate()},${date.getFullYear()}`;
  };

  const isReadMore = descriptionText => {
    if (descriptionText && descriptionText.length > 60) {
      return {readMore: true, text: descriptionText.slice(0, 60)};
    } else {
      return {readMore: false, text: descriptionText};
    }
  };

  const toggleShowMoreTxt = () => {
    setShowMoreTxt(!showMoreTxt);
  };

  return (
    <>
      <View style={styles.orderCardwrapInnerModal}>
        <View style={styles.LeftpartModal}>
          <ImageBackground
            source={require('../assets/images/rectanglebg.png')}
            style={{width: 62, height: 62, padding: 2}}>
            {orderImage ? (
              <Image source={{uri: orderImage}} style={styles.imgStyleModal} />
            ) : (
              <Image
                source={require('../assets/images/default_image.png')}
                style={styles.imgStyleModal}
              />
            )}
          </ImageBackground>

          <View style={styles.quantityTxt}>
            <Text style={styles.TitleLightTxt}>
              Qty - <Text style={styles.TitleBoldTxt}>{quantity}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.rightPart}>
          <Text style={[{color: Colors.BrandColor}, styles.msnName]}>
            {msn}
          </Text>

          <Text onTextLayout={onTextLayout} style={styles.productName}>
            {showMoreTxt ? productName : isReadMore(productName).text}
            {isReadMore(productName).readMore && !showMoreTxt ? '...' : ''}
            {lengthMore && isReadMore(productName).readMore ? (
              <Text onPress={toggleShowMoreTxt} style={styles.readMoretxt}>
                {showMoreTxt ? ' Read less' : ' Read more'}
              </Text>
            ) : null}
          </Text>
          <View style={{flexDirection: 'row', marginBottom: Dimension.margin5}}>
            <Text style={styles.TotalamounTxt}>
              {' '}
              <Text style={styles.rupeeSign}>₹ </Text>
              {Math.floor(totalAmount)}
            </Text>
            <Text style={styles.taxpercentageTxt}>{taxPercentage}%</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginRight: Dimension.margin20}}>
              <Text style={styles.TitleLightTxt}>
                PO ID - <Text style={styles.TitleBoldTxt}>{orderRef}</Text>
              </Text>
              <Text style={styles.TitleLightTxt}>
                PO Date -{' '}
                <Text style={styles.TitleBoldTxt}>{getTime(createdAt)}</Text>
              </Text>
              <Text style={styles.TitleLightTxt}>
                PO Item ID - <Text style={styles.TitleBoldTxt}>{itemRef}</Text>
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
                <Text style={styles.TitleBoldTxt}>{getTime(pickupDate)}</Text>
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: Dimension.margin10}}>
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

  imgStyleModal: {
    borderRadius: 4,
    backgroundColor: Colors.WhiteColor,
    padding: 2,
    width: 58,
    height: 58,
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

  LeftpartModal: {
    flex: 2,
    marginRight: Dimension.margin12,
  },
  rightPart: {
    flex: 8,
  },
  orderCardwrapInnerModal: {
    padding: Dimension.padding12,
    flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.BoxBorderColor,
    borderRadius: 8,
  },
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
});

export default Productcard;
