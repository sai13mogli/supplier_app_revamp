import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {getImageUrl} from '../services/orders';
import Dimension from '../Theme/Dimension';
import Colors from '../Theme/Colors';
import CustomeIcon from './common/CustomeIcon';
import Modal from 'react-native-modal';
import {colors} from 'react-native-elements';
import {color} from 'react-native-elements/dist/helpers';

const deviceWidth = Dimensions.get('window').width;
const Ordercard = props => {
  const {
    msn,
    quantity,
    orderRef,
    createdAt,
    itemRef,
    pickupDate,
    transferPrice,
    hsn,
    productName,
    orderTypeString,
    shipmentMode,
    isVmi,
    shipmentModeString,
    actionCTA,
    taxPercentage,
    totalAmount,
  } = props;
  const [orderImage, setOrderImage] = useState(null);
  const [showMoreTxt, setShowMoreTxt] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const [isOrderVisible, setIsOrderVisible] = useState(false);

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

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length > 1);
  }, []);

  const toggleShowMoreTxt = () => {
    setShowMoreTxt(!showMoreTxt);
  };

  const renderCTAs = () => {
    return (actionCTA || []).map((_, i) => {
      return (
        <>
          {_ == 'ACCEPT' ? (
            <TouchableOpacity>
              <Text style={{color: 'red', fontSize: 12}}>ACCEPT</Text>
            </TouchableOpacity>
          ) : _ == 'DOWNLOAD_PO_EMS' ? (
            <TouchableOpacity>
              <Text style={{color: '#000', fontSize: 12}}>DOWNLOAD PO</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Text style={{color: '#000', fontSize: 12}}>{_}</Text>
            </TouchableOpacity>
          )}
        </>
      );
    });
  };

  const toggleOrder = () => {
    setIsOrderVisible(!isOrderVisible);
  };

  const renderOrderDetails = fromModal => {
    return (
      <>
        <View style={styles.leftpart}>
          <Image
            source={{
              uri:
                orderImage ||
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
            }}
            style={[fromModal ? styles.imgStyleModal : styles.imgStyle]}
          />
          {!fromModal ? (
            <View style={styles.quantityTxt}>
              <Text style={styles.TitleLightTxt}>
                Qty - <Text style={styles.TitleBoldTxt}>{quantity}</Text>
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.rightPart}>
          <Text
            style={[
              fromModal ? {color: '#000'} : {color: Colors.BrandColor},
              styles.msnName,
            ]}>
            {msn}
          </Text>
          {!fromModal ? (
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={showMoreTxt ? undefined : 1}
              style={styles.productName}>
              {productName}
            </Text>
          ) : (
            <Text style={styles.productName}>{productName}</Text>
          )}

          {lengthMore && !fromModal ? (
            <Text onPress={toggleShowMoreTxt} style={styles.readMoretxt}>
              {showMoreTxt ? 'Read less' : 'Read more'}
            </Text>
          ) : null}

          {fromModal ? (
            <>
              <Text style={{color: '#000'}}> ₹{Math.floor(totalAmount)}</Text>
              <Text style={{color: '#000'}}>{taxPercentage}%</Text>
            </>
          ) : null}
          <View style={{flexDirection: 'row'}}>
            <View>
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
          <View style={{flexDirection: 'row'}}>
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
          {renderCTAs()}
        </View>
      </>
    );
  };

  return (
    <TouchableOpacity style={styles.orderCardwrap} onPress={toggleOrder}>
      {renderOrderDetails(false)}
      {isOrderVisible && (
        <Modal
          overlayPointerEvents={'auto'}
          isVisible={isOrderVisible}
          onTouchOutside={() => {
            setIsOrderVisible(false);
          }}
          onDismiss={() => {
            setIsOrderVisible(false);
          }}
          coverScreen={true}
          style={{padding: 0, margin: 0}}
          deviceWidth={deviceWidth}
          hasBackdrop={true}
          onBackdropPress={() => setIsOrderVisible(false)}
          onBackButtonPress={() => setIsOrderVisible(false)}>
          <View style={styles.modalContainer}>{renderOrderDetails(true)}</View>
        </Modal>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  TitleLightTxt: {
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
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
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
    backgroundColor: Colors.LightBrandColor,
    borderRadius: 2,
    marginRight: Dimension.margin5,
  },
  shipmentModeStringWrap: {
    paddingVertical: Dimension.padding4,
    paddingHorizontal: Dimension.padding10,
    fontSize: Dimension.font10,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
    backgroundColor: Colors.LightBrandColor,
    borderRadius: 2,
    marginRight: Dimension.margin5,
  },
  VMIWrap: {
    paddingVertical: Dimension.padding4,
    paddingHorizontal: Dimension.padding10,
    fontSize: Dimension.font10,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
    backgroundColor: Colors.LightBrandColor,
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
    flexDirection: 'row',
  },
  leftpart: {
    flex: 2,
    marginRight: Dimension.margin12,
  },
  rightPart: {
    flex: 7,
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
});
export default Ordercard;
