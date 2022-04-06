import React, { useEffect, useState, useCallback } from 'react';
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
import { getImageUrl, getSplitHistory } from '../services/orders';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
import CustomeIcon from './common/CustomeIcon';
import Productcard from './Productcard';
const deviceWidth = Dimensions.get('window').width;

const SplitHistoryModal = props => {
  const [orderImage, setOrderImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState({ children: [] });
  const [showMoreTxt, setShowMoreTxt] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const {
    isVisible,
    setModal,
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
    taxPercentage,
    totalAmount,
    supplierId,
  } = props;

  useEffect(() => {
    fetchImage();
    fetchSplitHistory();
  }, []);

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
  const fetchSplitHistory = async () => {
    const { data } = await getSplitHistory(supplierId, orderRef, itemRef);
    console.log("OrdeRef====>", orderRef);
    if (data.success) {
      setHistory(data.data);
      setLoading(false);
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

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length > 1);
  }, []);

  const toggleShowMoreTxt = () => {
    setShowMoreTxt(!showMoreTxt);
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
      style={{ padding: 0, margin: 0 }}
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
          <Text style={styles.headerTxt}>Split History</Text>
        </View>
        {loading ? (
          <ActivityIndicator
            color={Colors.BrandColor}
            size={'small'}
            style={{ alignSelf: 'center' }}
          />
        ) : (
          <>
            <View style={{ paddingHorizontal: Dimension.padding15 }}>
              {renderOrderDetails()}
            </View>
            {/* <View style={styles.topbdr}></View>
          <View>
          <CustomeIcon
                name={'arrow-back'}
                size={Dimension.font22}
                color={Colors.FontColor}
              />
          </View>
            <View style={styles.headerWrap}>
              <Text style={styles.headerTxt}>Split History</Text>
           </View>
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
                <Text style={[{ color: '#000' }, styles.msnName]}>{msn}</Text>

                <Text style={styles.productName}>{productName}</Text>

                <>
                  <Text style={{ color: '#000' }}>
                    {' '}
                    ₹{Math.floor(totalAmount)}
                  </Text>
                  <Text style={{ color: '#000' }}>{taxPercentage}%</Text>
                </>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ marginRight: Dimension.margin20 }}>
                    <Text style={styles.TitleLightTxt}>
                      PO ID -{' '}
                      <Text style={styles.TitleBoldTxt}>{orderRef}</Text>
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
                      Product HSN -{' '}
                      <Text style={styles.TitleBoldTxt}>{hsn}</Text>
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
                  style={{ flexDirection: 'row', marginTop: Dimension.margin10 }}>
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
            </View> */}

          </>
        )}
        <View style={styles.BottomDataWrap}>


          <Text style={styles.BottomDataTitle}>Item Breakdow</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.leftStepsPart}>
              <View style={styles.circle}></View>
              <View style={styles.line}>

              </View>
              <View style={styles.circle}></View>
            </View>
            <View style={styles.rightStepsPart}>


              {((history || {}).children || []).map((_, k) => (
                //<View key={k} style={styles.RedItemWrap}>
                <View key={k} style={styles.ItemWrap}>
                  <Text style={styles.PoText}>PO ITem ID - <Text style={styles.PoBoldText}>{_.itemId}</Text></Text>
                  <Text style={styles.PoText}>
                    {_.itemQty}Qty. | {_.itemStatus}
                  </Text>
                </View>
              ))}
            </View>
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
    alignItems: "flex-end",
    paddingHorizontal: Dimension.padding15,
  },
  headerTxtWrap: {
    paddingHorizontal: Dimension.padding15,
    marginBottom: Dimension.margin20
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
    paddingHorizontal: Dimension.padding15
  },
  BottomDataTitle: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginBottom: Dimension.margin10,
  },
  ItemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Dimension.padding20,
    paddingVertical: Dimension.padding12,
    borderRadius: 4,
    backgroundColor: Colors.WhiteColor,
    borderWidth: 1,
    borderColor: Colors.BoxBorderColor,
    marginBottom: Dimension.margin40
  },
  RedItemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Dimension.padding20,
    paddingVertical: Dimension.padding12,
    borderRadius: 4,
    backgroundColor: Colors.LightBrandColor1,
    borderWidth: 1,
    borderColor: Colors.LightBrandColor1,
    marginBottom: Dimension.margin40

  },
  PoText: {
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
  },
  PoBoldText: {
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomBoldFont,
  },
  leftStepsPart: {
    marginRight: Dimension.margin10,
    flex: 1,
    alignItems: "center",
    paddingTop: Dimension.padding12
  },
  rightStepsPart: {
    flex: 9
  },
  circle: {
    width: Dimension.width10,
    height: Dimension.height10,
    borderRadius: Dimension.height10,
    backgroundColor: Colors.FontColor,
  },
  line: {
    height: Dimension.height65,
    borderRadius: 1,
    borderWidth: 1,
    width: 1,
    borderStyle: "dashed",
    borderColor: Colors.grayShade14,
  },
});

export default React.memo(SplitHistoryModal);
