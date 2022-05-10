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
import PickerDropDown from '../component/common/PickerDropDown';
import PickerMenu from '../component/common/PickerMenu';
import { OrderedMap } from 'immutable';
import FloatingLabelInputField from '../component/common/FloatingInput';

const InvoiceCard = props => {
  const {
    selectItemId,
    productUom,
    transferPrice,
    productName,
    itemId,
    bulkItemIds,
  } = props;

  const [taxPercentageLabel, setTaxPercentageLabel] = useState(props?.taxPercentage);
  const [taxPercentage, setTaxPercentage] = useState(props?.taxPercentage);
  const [hsnError, setHsnError] = useState(false);
  const [hsn, setHsn] = useState(props?.hsn);
  const [quantity, setQuantity] = useState(props?.quantity);
  const [totalAmount, setTotalAmount] = useState(props.totalAmount);
  const [amount, setAmount] = useState(props.totalAmount);

  const FORM_FIELDS = new OrderedMap({

    HSN: {
      title: 'HSN',
      isImp: true,
      label: 'HSN',
      placeholder: 'HSN',
      errorMessage: 'Enter valid hsn',
      showError: hsnError,
      value: hsn,
      keyboardType: 'number-pad',
      onChangeText: text => setHsn(text),
      component: FloatingLabelInputField,
      editable: (bulkItemIds || []).includes(itemId) ? true : false,
    },
    qnty: {
      title: 'Qty',
      isImp: false,
      label: 'Qty',
      placeholder: 'Qty',
      errorMessage: 'Enter valid Qty',
      showError: hsnError,
      value: String(quantity),
      keyboardType: 'number-pad',
      onChangeText: text => calculatePrice(text),
      component: FloatingLabelInputField,
      editable: (bulkItemIds || []).includes(itemId) ? true : false,
    },
    hsn_tax: {
      title: 'HSN Tax%',
      isImp: false,
      errorMessage: 'Enter valid hsn',
      onValueChange: (text, label) => calculateHsn(text, label),
      component: PickerMenu,
      fromUploadInvoive: true,
      enabled: true,
      selectedValue: taxPercentageLabel,
      value: taxPercentage,
      options: [
        {
          label: '0.00',
          value: 0.00,
        },
        {
          label: '0.10',
          value: 0.10,
        },
        {
          label: '0.25',
          value: 0.25,
        },
        {
          label: '3.00',
          value: 3.00,
        },
        {
          label: '5.00',
          value: 5.00,
        },
        {
          label: '12.00',
          value: 12.00,
        },
        {
          label: '18.00',
          value: 18.00,
        },
        {
          label: '28.00',
          value: 28.00,
        },
      ],
    },

  });



  const calculatePrice = text => {
    setQuantity(text);
    props.UpdatedQuntity(text)
    const { taxPercentage, transferPrice } = props;
    let Price = transferPrice * text;
    let percentage = (Price / 100) * taxPercentage + text * transferPrice;
    setAmount(percentage);
    props.UpdatedTotalPrice(percentage)
  };

  const calculateHsn = (text, label) => {
    props.selectedValue(text)
    setTaxPercentage(text)
    setTaxPercentageLabel(label)
    const { transferPrice } = props;
    let Price = transferPrice * quantity;
    let percentage = (Price / 100) * text + quantity * transferPrice;
    setAmount(percentage);
    props.UpdatedTotalPrice(percentage)
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
            onPress={() => selectItemId(itemId, props.totalAmount)}
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
            <View style={{
              flexDirection: 'row',
              flex: 1,

            }}>
              {FORM_FIELDS.map((field, fieldKey) => (
                <View style={[fieldKey == "hsn_tax" ? { flex: 0.4, marginRight: Dimension.margin10 } : { flex: 0.4, marginRight: Dimension.margin8, }]}>
                  <field.component
                    {...field}
                    key={fieldKey}
                    disabled={field.disabled}
                  />
                </View>
              )).toList()}

            </View>
          </View>
        </View>
      </>
    );
  };


  return (
    <>
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
