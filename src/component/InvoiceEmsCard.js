import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {getImageUrl, markOutForOrderApi} from '../services/orders';
import Dimension from '../Theme/Dimension';
import Colors from '../Theme/Colors';
import CustomeIcon from './common/CustomeIcon';
import Modal from 'react-native-modal';
import {acceptOrder, getpoChallan, rejectOrder} from '../services/orders';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PackNowModal from '../component/PackNowModal';
import RejectModal from '../component/RejectModal';
import MarkOutForDeliveryModal from '../component/MarkOutForDeliveryModal';
import ViewLSPModal from '../component/ViewLSPModal';
import SplitHistoryModal from '../component/SplitHistoryModal';
import ProofOfDeliveryModal from '../component/ProofOfDeliveryModal';
import AcceptModal from './AcceptModal';
import AddView from './AddView';
import SplitQuantityModal from './SplitQuantityModal';
import {useNavigation} from '@react-navigation/native';
import {colors} from 'react-native-elements';

const deviceWidth = Dimensions.get('window').width;

const InvoiceCard = props => {
  const {
    selectItemId,
    productUom,
    orderRef,
    transferPrice,
    hsn,
    taxPercentage,
    productName,
    itemId,
    bulkItemIds,
  } = props;

  const [quantity, setQuantity] = useState(props.quantity);
  const [totalAmount, settotalAmount] = useState(props.totalAmount);
  const [amount, setAmount] = useState('');

  const calculatePrice = text => {
    setQuantity(text);
    const {taxPercentage, transferPrice} = props;
    let Price = transferPrice * text;
    let percentage = (Price / 100) * taxPercentage + text * transferPrice;
    setAmount(percentage);
  };

  const calculateHsn = text => {
    const {transferPrice} = props;
    let Price = transferPrice * quantity;
    let percentage = (Price / 100) * text + quantity * transferPrice;
    setAmount(percentage);
  };

  const renderOrderDetails = () => {
    return (
      <>
        <View style={[styles.orderCardwrapInner]}>
          <CustomeIcon
            name={
              (bulkItemIds || []).includes(itemId)
                ? 'checkbox-tick'
                : 'checkbox-blank'
            }
            color={
              (bulkItemIds || []).includes(itemId)
                ? Colors.BrandColor
                : Colors.FontColor
            }
            size={Dimension.font20}
            onPress={() => selectItemId(itemId)}
            style={styles.checkboxDesign}></CustomeIcon>
          <View style={styles.rightPart}>
            <Text style={styles.productName}>{productName}</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{}}>
                <Text style={styles.TitleLightTxt}>
                  Moglix HSN- <Text style={styles.TitleBoldTxt}>{hsn}</Text>
                </Text>
                <Text style={styles.TitleLightTxt}>
                  UOM - <Text style={styles.TitleBoldTxt}>{productUom}</Text>
                </Text>
              </View>

              <View style={{marginLeft:Dimension.margin30}}>
                <Text style={styles.TitleLightTxt}>
                  Total Price -{' '}
                  <Text style={styles.TitleBoldTxt}>
                    {(bulkItemIds || []).includes(itemId)
                      ? amount
                      : totalAmount}
                  </Text>
                </Text>
                <Text style={styles.TitleLightTxt}>
                  TP/Unit -{' '}
                  <Text style={styles.TitleBoldTxt}>
                    ₹{Math.floor(transferPrice)}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.borderWrap}>
              <View style={styles.qtyView}>
                <Text style={styles.TitleLightTxt}>HSN</Text>
                <TextInput
                  style={styles.wrapInput}
                  onChangeText={text => text}
                  keyboardType={'number-pad'}
                  editable={
                    (bulkItemIds || []).includes(itemId) ? true : false
                  }>
                  <Text style={styles.textMeasure}>{hsn}</Text>
                </TextInput>
              </View>
              <View style={styles.qtyView}>
                <Text style={styles.TitleLightTxt}>Qty</Text>
                <TextInput
                  style={styles.wrapInput}
                  onChangeText={text => calculatePrice(text)}
                  keyboardType={'number-pad'}
                  editable={
                    (bulkItemIds || []).includes(itemId) ? true : false
                  }>
                  {quantity}
                </TextInput>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.TitleLightTxt}>HSN Tax %</Text>
                <TextInput
                  style={styles.wrapInput}
                  onChangeText={text => calculateHsn(text)}
                  keyboardType={'number-pad'}
                  editable={
                    (bulkItemIds || []).includes(itemId) ? true : false
                  }>
                  {taxPercentage}
                </TextInput>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  const renderOrderHeaderDetail = () => {
    return (
      <>
        <View style={styles.headerView}>
          <Text
            style={[
              styles.TitleBoldTxt,
              {
               // marginLeft: Dimension.margin10,
               // fontSize: 10,
               // marginTop: Dimension.margin13,
                //marginBottom: Dimension.margin10,
              },
            ]}>
            PO ID -{' '}
            <Text style={[styles.TitleBoldTxt, 
              {
               // fontSize: 10
                }]}>
              {orderRef}
            </Text>
          </Text>
          <Text
            style={[
              styles.TitleBoldTxt,
              {
                //marginLeft: Dimension.margin10,
                //fontSize: 10,
                marginTop: Dimension.margin10,
              },
            ]}>
            Total Price -{' '}
            <Text style={styles.TitleBoldTxt}>
              ₹{Math.floor(totalAmount)}
              {'   '} (Price Including Tax-
              <Text style={styles.sectionText}>Excluding TDS-TCS</Text>
              <Text style={styles.TitleBoldTxt}> )</Text>
            </Text>
          </Text>
        </View>
      </>
    );
  };

  return (
    <>
      {renderOrderHeaderDetail()}

      <View style={[styles.orderCardwrap, {marginTop: Dimension.margin10}]}>
        {renderOrderDetails()}
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
  qtyView: {
    flexDirection: 'column',
    marginLeft: -Dimension.margin32,
    paddingLeft: Dimension.padding5,
  },
  headerView: {
    backgroundColor: Colors.DisableStateColor,
    borderRadius: 3,
    //height: 60,
   // marginLeft: Dimension.margin10,
    //marginRight: Dimension.margin10,
    marginHorizontal:Dimension.margin10,
    paddingHorizontal:Dimension.padding10,
    paddingVertical:Dimension.padding8
  },
  sectionText: {
    fontSize: Dimension.font10,
    color: Colors.redShade,
    fontFamily: Dimension.CustomBoldFont,
  },
  checkboxDesign: {
    position: 'absolute',
    //marginTop: Dimension.margin10,
    //marginRight: Dimension.margin10,
   // marginLeft: Dimension.margin315,
   // marginBottom: Dimension.margin164,
    right: 0,
    top:0,
    zIndex: 9999,
  },
  borderWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Dimension.margin30,
  },
  wrapInput: {
    height: Dimension.height25,
    width: Dimension.width66,
    borderColor: Colors.eyeIcon,
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: Dimension.margin15,
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomMediumFont,
    color: Colors.FontColor,
    backgroundColor:"#fff",
    paddingTop:0,
    paddingBottom:0,
    paddingHorizontal:Dimension.padding10
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
    marginBottom: Dimension.margin8,
    marginTop: Dimension.margin5,
    // marginLeft: Dimension.margin15,
    // marginRight: Dimension.margin11,
    //backgroundColor:"#000",
    width:"90%"
  },
  textMeasure: {
    fontSize: Dimension.font12,
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

    marginHorizontal: Dimension.margin15,
  },
  orderCardwrapInner: {
    flexDirection: 'row',
    flex: 1,
    // marginLeft: Dimension.margin15,
    // marginRight: Dimension.margin15,
  },
  leftpart: {
    flex: 2,
    marginRight: Dimension.margin15,
  },
  rightPart: {
    flex: 1,
    //height: Dimension.height38,
    //width: Dimension.width289,
    // marginLeft: Dimension.margin15,
    // marginRight: Dimension.margin41,
    // paddingLeft: Dimension.padding15,
  },
  imgStyle: {
    borderRadius: 4,
    backgroundColor: Colors.WhiteColor,
    padding: 2,
    width: Dimension.width50,
    height: Dimension.height50,
    //alignSelf:'center'
  },

  imgStyleModal: {
    borderRadius: 4,
    backgroundColor: Colors.WhiteColor,
    padding: 2,
    width: 250,
    height: 250,
    alignSelf: 'center',
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
  LeftpartModal: {flex: 1},
  orderCardwrapInnerModal: {paddingHorizontal: Dimension.padding15},
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
});
export default InvoiceCard;
