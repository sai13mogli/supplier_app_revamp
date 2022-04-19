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
import {getImageUrl, getLspDetail} from '../services/orders';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
import Productcard from './Productcard';
import CustomeIcon from './common/CustomeIcon';
const deviceWidth = Dimensions.get('window').width;

const ViewLSPModal = props => {
  const [orderImage, setOrderImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState({records: []});
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
    itemId,
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

  const fetchSplitHistory = async () => {
    const {data} = await getLspDetail(supplierId, itemId);
    if (data.success) {
      setHistory(data.data);
      setLoading(false);
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
          <Text style={styles.headerTxt}>View LSP Details</Text>
        </View>
        {loading ? (
          <ActivityIndicator
            color={Colors.BrandColor}
            size={'small'}
            style={{alignSelf: 'center'}}
          />
        ) : (
          <>
            <View style={{paddingHorizontal: Dimension.padding15}}>
              {renderOrderDetails()}
            </View>
          </>
        )}
        <View style={styles.BottomDataWrap}>
          {((history || {}).records || []).map((_, k) => (
            <View key={k} style={styles.ItemWrap}>
              <View style={styles.itemWrapInner}>
                <Text style={styles.PoText}>
                  Shipper Name -{' '}
                  <Text style={styles.PoBoldText}>{_.shipmentMode}</Text>
                </Text>
                <Text style={styles.PoText}>
                  Manifest ID -{' '}
                  <Text style={styles.PoBoldText}>{_.shipperId}</Text>
                </Text>
              </View>
              <View style={styles.itemWrapInner}>
                <Text style={styles.PoText}>
                  No. of packets -{' '}
                  <Text style={styles.PoBoldText}>{_.quantity}</Text>
                </Text>
                <Text style={styles.PoText}>
                  AWB - <Text style={styles.PoBoldText}>{_.awbNumber}</Text>
                </Text>
              </View>
            </View>
          ))}
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
  },
  BottomDataTitle: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginBottom: Dimension.margin10,
  },
  ItemWrap: {
    paddingHorizontal: Dimension.padding20,
    paddingVertical: Dimension.padding12,
    borderRadius: 4,
    backgroundColor: Colors.WhiteColor,
    borderWidth: 1,
    borderColor: Colors.BoxBorderColor,
    marginBottom: Dimension.margin40,
  },
  itemWrapInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginBottom: Dimension.margin40,
  },
  PoText: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
  },
  PoBoldText: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomBoldFont,
  },
});

export default React.memo(ViewLSPModal);
