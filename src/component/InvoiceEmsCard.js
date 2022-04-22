import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import React, { useState, } from 'react';
import Dimension from '../Theme/Dimension';
import Colors from '../Theme/Colors';
import CustomeIcon from './common/CustomeIcon';

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
  const [amount, setAmount] = useState(props.totalAmount);

  const calculatePrice = text => {
    setQuantity(text);
    const { taxPercentage, transferPrice } = props;
    let Price = transferPrice * text;
    let percentage = (Price / 100) * taxPercentage + text * transferPrice;
    setAmount(percentage);
  };

  const calculateHsn = text => {
    const { transferPrice } = props;
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
            <View style={{ flexDirection: 'row' }}>
              <View style={{}}>
                <Text style={styles.TitleLightTxt}>
                  Moglix HSN- <Text style={styles.TitleBoldTxt}>{hsn}</Text>
                </Text>
                <Text style={styles.TitleLightTxt}>
                  UOM - <Text style={styles.TitleBoldTxt}>{productUom}</Text>
                </Text>
              </View>

              <View style={{ marginLeft: Dimension.margin30 }}>
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
              <View style={{ flexDirection: 'column' }}>
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
            ]}>
            PO ID -{' '}
            <Text style={styles.TitleBoldTxt}>
              {orderRef}
            </Text>
          </Text>
          <Text
            style={[
              styles.TitleBoldTxt,
              {

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
      <View style={[styles.orderCardwrap, { marginTop: Dimension.margin10 }]}>
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
    marginHorizontal: Dimension.margin10,
    paddingHorizontal: Dimension.padding10,
    paddingVertical: Dimension.padding8
  },
  sectionText: {
    fontSize: Dimension.font10,
    color: Colors.redShade,
    fontFamily: Dimension.CustomBoldFont,
  },
  checkboxDesign: {
    position: 'absolute',
    right: 0,
    top: 0,
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
    backgroundColor: "#fff",
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: Dimension.padding10
  },

  productName: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    marginBottom: Dimension.margin8,
    marginTop: Dimension.margin5,
    width: "90%"
  },
  textMeasure: {
    fontSize: Dimension.font12,
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
  },
  leftpart: {
    flex: 2,
    marginRight: Dimension.margin15,
  },
  rightPart: {
    flex: 1,
  },

});
export default InvoiceCard;
