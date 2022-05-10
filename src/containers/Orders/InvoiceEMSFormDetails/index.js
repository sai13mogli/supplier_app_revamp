import React, { useState, useEffect } from 'react';
import { OrderedMap } from 'immutable';
import RNFetchBlob from 'rn-fetch-blob';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  FlatList,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dimension from '../../../Theme/Dimension';
import colors from '../../../Theme/Colors';
import CustomButton from '../../../component/common/Button';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import FileUpload from '../../../component/common/FileUpload';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import Header from '../../../component/common/Header';
import CustomeDatePicker from '../../../component/common/Datepicker';
import { BASE_URL } from '../../../redux/constants';
import Toast from 'react-native-toast-message';
import { fetchOrders, fetchTabCount } from '../../../redux/actions/orders';
import { useDispatch, useSelector } from 'react-redux';

const InvoiceEMSFormDetailScreen = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(
    props?.route?.params?.totalAmount,
  );
  const [warehouseId, setwarehouseId] = useState(
    props?.route?.params?.warehouseId,
  );
  const [orderRef, setOrderRef] = useState(props?.route?.params?.orderRef);
  const [itemRef, setitemRef] = useState(props?.route?.params?.itemRef);
  const [quantity, setQuantity] = useState(props?.route?.params?.quantity);
  const [hsn, setHsn] = useState(props?.route?.params?.hsn);
  const [invoiceNumber, setInvoiceNumber] = useState();
  const [invoiceNumberError, setInvoiceNumberError] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoiceDateError, setInvoiceDateError] = useState(false);
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [invoiceAmountError, setInvoiceAmountError] = useState(false);
  const [uploadInvoice, setUploadInvoice] = useState({});
  const [uploadInvoiceError, setuploadInvoiceError] = useState(false);
  const [ewayBillNumber, setEwayBillNumber] = useState('');
  const [ewayBillNumberError, setEwayBillNumberError] = useState(false);
  const [ewayDate, setEwayDate] = useState('');
  const [ewayDateError, setEwayDateError] = useState(false);
  const [uploadEwayBill, setUploadEwayBill] = useState({});
  const [uploadEwayBillError, setUploadEwayBillError] = useState(false);
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [baseAmount, setBaseAmount] = useState('');
  const [baseAmountError, setBaseAmountError] = useState(false);
  const [hsnError, sethsnError] = useState(false);
  const [taxPercentage, setTaxPercentage] = useState(props?.route?.params?.taxPercentage);
  const [taxError, setTaxError] = useState(false);
  const [total, setTotal] = useState('');
  const [commentError, setCommentError] = useState(false);
  const [addComment, setAddComment] = useState('');
  const [loadingBaseAmount, setloadingBaseAmount] = useState('');
  const [loadingTotal, setloadingTotal] = useState('');
  const [misBaseAmount, setMisBaseAmount] = useState('');
  const [misTotal, setMisTotal] = useState('');
  const [fId, setFId] = useState(null);

  const UploadInvoice = new OrderedMap({
    upload_invoice: {
      id: 'uploadInvoice',
      title: 'Upload Invoice',
      state: uploadInvoice,
      value: uploadInvoice.name,
      disabled: false,
      documents: {
        name: uploadInvoice && uploadInvoice.name,
        doc: uploadInvoice,
      },
      isImp: true,
      errorState: uploadInvoiceError,
      errorText: 'Please upload Invoice',
      placeholder: 'Tap to Upload',
    },
  });

  const UploadEwayBill = new OrderedMap({
    upload_eway_bill: {
      id: 'uploadEwayBill',
      title: 'Upload E-way Bill',
      state: uploadEwayBill,
      value: uploadEwayBill.name,
      disabled: false,
      documents: {
        name: uploadEwayBill && uploadEwayBill.name,
        doc: uploadEwayBill,
      },
      isImp: true,
      errorState: uploadEwayBillError,
      errorText: 'Please upload E-way Bill',
      placeholder: 'Tap to Upload',
      setUpload: uploadEwayBill && uploadEwayBill.setUpload,
    },
  });

  const FORM_FIELDS = new OrderedMap({
    invoiceNumber: {
      title: 'Invoice Number',
      isImp: true,
      label: 'Invoice Number',
      placeholder: '',
      errorMessage: 'Enter valid invoice number',
      showError: invoiceNumberError,
      value: invoiceNumber,
      onBlur: () => onInvoiceNumberBlur(),
      onChangeText: text => setInvoiceNumber(text),
      component: FloatingLabelInputField,
    },
    invoiceDate: {
      title: 'Invoice Date',
      isImp: true,
      maxdate: new Date(),
      label: 'Invoice Date',
      placeholder: 'Invoice Date',
      errorMessage: 'Enter valid Invoice date',
      showError: invoiceDate ? null : invoiceDateError,
      value: invoiceDate,
      onBlur: () => onInvoiceDateBlur(),
      onChange: invoiceDate => setInvoiceDate(invoiceDate),
      component: CustomeDatePicker,
    },
    invoiceAmount: {
      title: 'Invoice Amount',
      isImp: true,
      label: 'Invoice Amount  (Exl. TCS/TDS)',
      placeholder: 'Invoice Amount',
      keyboardType: 'number-pad',
      errorMessage: 'Enter valid invoice amount',
      showError: invoiceAmountError,
      value: invoiceAmount,
      onBlur: () => onInvoiceAmountBlur(),
      onChangeText: text => setInvoiceAmount(text),
      component: FloatingLabelInputField,
    },
    ewayBillNumber: {
      title: 'E-way Bill Number',
      isImp: false,
      label: 'E-way Bill Number',
      placeholder: 'E-way Bill Number',
      errorMessage: 'Enter valid e-way Bill number *(12) digit',
      value: ewayBillNumber,
      showError: ewayBillNumberError,
      // onBlur: () => onEwayBillNumberBlur(),
      onChangeText: text => setEwayBillNumber(text),
      component: FloatingLabelInputField,
    },
    ewayDate: {
      title: 'E-way Date',
      isImp: false,
      maxdate: new Date(),
      label: 'E-way Date',
      placeholder: 'E-way Date',
      errorMessage: 'Enter valid e-way date',
      value: ewayDate,
      showError: ewayDate ? null : ewayDateError,
      onBlur: () => onEwayDateDateBlur(),
      onChange: ewayDate => setEwayDate(ewayDate),
      component: CustomeDatePicker,
    },
    baseAmount: {
      title: 'Base Amount',
      isImp: false,
      label: 'Base Amount',
      keyboardType: 'number-pad',
      placeholder: 'Base Amount',
      errorMessage: 'Enter valid base amount',
      showError: baseAmountError,
      value: baseAmount,
      onChangeText: text => setBaseAmount(text),
      component: FloatingLabelInputField,
      onBlur: () => calculateTotalFreight(),
    },
    hsn: {
      title: 'HSN',
      isImp: false,
      label: 'HSN',
      placeholder: 'HSN',
      errorMessage: 'Enter valid hsn',
      showError: hsnError,
      value: total ? hsn : '',
      component: FloatingLabelInputField,
      disabled: true,
    },
    taxPercentage: {
      title: 'Tax%',
      isImp: false,
      label: 'Tax%',
      placeholder: 'Tax',
      errorMessage: 'Enter valid tax',
      showError: taxError,
      value: baseAmount ? String(taxPercentage) : '',
      component: FloatingLabelInputField,
      disabled: true,
    },
    total: {
      title: 'Total',
      isImp: false,
      label: 'Total',
      keyboardType: 'number-pad',
      placeholder: 'Total',
      errorMessage: 'Enter valid total',
      value: total,
      component: FloatingLabelInputField,
      disabled: true,
    },
    addComment: {
      title: 'Add Comment',
      isImp: false,
      label: 'Add Comment',
      placeholder: '',
      errorMessage: 'Enter valid comment',
      showError: commentError,
      value: addComment,
      onChangeText: text => setAddComment(text),
      component: FloatingLabelInputField,
    },
    loadingBaseAmount: {
      title: 'Base Amount',
      isImp: false,
      label: 'Base Amount',
      keyboardType: 'number-pad',
      placeholder: 'Base Amount',
      errorMessage: 'Enter valid base amount',
      showError: baseAmountError,
      value: loadingBaseAmount,
      onChangeText: text => setloadingBaseAmount(text),
      component: FloatingLabelInputField,
      onBlur: () => calculateLoadingCharges(),
    },
    loadingHsn: {
      title: 'HSN',
      isImp: false,
      label: 'HSN',
      placeholder: 'HSN',
      errorMessage: 'Enter valid hsn',
      showError: hsnError,
      value: loadingTotal ? hsn : '',
      component: FloatingLabelInputField,
      disabled: true,
    },
    loadingTax: {
      title: 'Tax%',
      isImp: false,
      label: 'Tax%',
      placeholder: 'Tax',
      errorMessage: 'Enter valid tax',
      showError: taxError,
      value: loadingBaseAmount ? String(taxPercentage) : '',
      component: FloatingLabelInputField,
      disabled: true,
    },
    loadingTotal: {
      title: 'Total',
      isImp: false,
      label: 'Total',
      placeholder: 'Total',
      errorMessage: 'Enter valid total',
      keyboardType: 'number-pad',
      value: loadingTotal,
      component: FloatingLabelInputField,
      disabled: true,
    },
    misBaseAmount: {
      title: 'Base Amount',
      isImp: false,
      label: 'Base Amount',
      keyboardType: 'number-pad',
      placeholder: 'Base Amount',
      errorMessage: 'Enter valid base amount',
      showError: baseAmountError,
      value: misBaseAmount,
      onChangeText: text => setMisBaseAmount(text),
      component: FloatingLabelInputField,
      onBlur: () => calculateMiscCharges(),
    },
    misHsn: {
      title: 'HSN',
      isImp: false,
      label: 'HSN',
      placeholder: 'HSN',
      errorMessage: 'Enter valid hsn',
      showError: hsnError,
      value: misTotal ? hsn : '',
      component: FloatingLabelInputField,
      disabled: true,
    },
    misTax: {
      title: 'Tax%',
      isImp: false,
      label: 'Tax%',
      placeholder: 'Tax',
      errorMessage: 'Enter valid tax',
      showError: taxError,
      value: misBaseAmount ? String(taxPercentage) : '',
      component: FloatingLabelInputField,
      disabled: true,
    },
    misTotal: {
      title: 'Total',
      isImp: false,
      label: 'Total',
      keyboardType: 'number-pad',
      placeholder: 'Total',
      errorMessage: 'Enter valid total',
      value: misTotal,
      onChangeText: text => setMisTotal(text),
      component: FloatingLabelInputField,
      disabled: true,
    },
  });



  const onUploadInvoiceBlur = () => {
    if (uploadInvoice && uploadInvoice.name) {
      setuploadInvoiceError(false);
    } else {
      setuploadInvoiceError(true);
    }
  };

  const onUploadEwayBlur = () => {
    if (uploadEwayBill && uploadEwayBill.name) {
      setUploadEwayBillError(false);
    } else {
      setUploadEwayBillError(true);
    }
  };

  const calculateTotalFreight = () => {
    setHsn(
      props && props.route && props.route.params && props.route.params.hsn,
    );
    setTaxPercentage(
      props &&
      props.route &&
      props.route.params &&
      props.route.params.taxPercentage,
    );
    let total = Number(baseAmount) + Number((taxPercentage * baseAmount) / 100);
    setTotal(`${total}`);
  };

  const calculateLoadingCharges = text => {
    setHsn(
      props && props.route && props.route.params && props.route.params.hsn,
    );
    setTaxPercentage(
      props &&
      props.route &&
      props.route.params &&
      props.route.params.taxPercentage,
    );
    let total =
      Number(loadingBaseAmount) +
      Number((taxPercentage * loadingBaseAmount) / 100);
    setloadingTotal(`${total}`);
  };

  const calculateMiscCharges = () => {
    setHsn(
      props && props.route && props.route.params && props.route.params.hsn,
    );
    setTaxPercentage(
      props &&
      props.route &&
      props.route.params &&
      props.route.params.taxPercentage,
    );
    let total =
      Number(misBaseAmount) + Number((taxPercentage * misBaseAmount) / 100);
    setMisTotal(`${total}`);
  };

  const onInvoiceNumberBlur = () => {
    if (invoiceNumber && invoiceNumber.length) {
      setInvoiceNumberError(false);
    } else {
      setInvoiceNumberError(true);
    }
  };
  const onInvoiceDateBlur = () => {
    if (invoiceDate && invoiceDate.length) {
      setInvoiceDateError(false);
    } else {
      setInvoiceDateError(true);
    }
  };

  const onEwayDateDateBlur = () => {
    if (ewayDate && ewayDate.length) {
      setEwayDateError(false);
    } else {
      setEwayDateError(true);
    }
  };

  // const onEwayBillNumberBlur = () => {
  //   if (
  //     ewayBillNumber &&
  //     ewayBillNumber.length &&
  //     ewayBillNumber.length == 12
  //   ) {
  //     setEwayBillNumberError(false);
  //   } else {
  //     setEwayBillNumberError(true);
  //   }
  // };

  const onInvoiceAmountBlur = () => {
    if (invoiceAmount && invoiceAmount.length) {
      setInvoiceAmountError(false);
    } else {
      setInvoiceAmountError(true);
    }
  };

  const openSelection = async selection => {
    switch (selection) {
      case 'File Explorer':
        await SheetManager.hide('action_sheet');
        uploadFromFileExp();
        break;

      default:
        await SheetManager.hide('action_sheet');
        break;
    }
  };

  const uploadFromFileExp = async () => {
    try {
      const res = await DocumentPicker.pick({});
      setFormState(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled from single doc picker');
      } else {
        console.log('error', err);
        throw err;
      }
    }
  };

  const setFormState = data => {
    switch (fId) {
      case 'uploadInvoice':
        setUploadInvoice(data);
        break;
      case 'uploadEwayBill':
        setUploadEwayBill(data);

        break;
      default:
        break;
    }
  };

  const renderInputText = ({
    id,
    title,
    isImp,
    showDoc,
    value,
    documents,
    errorState,
    errorText,
    setUpload,
  }) => {
    return (
      <FileUpload
        label={title}
        isImp={isImp}
        value={value}
        documents={documents}
        showDoc={showDoc}
        onBlur={{ onUploadInvoiceBlur, onUploadEwayBlur }}
        id={id}
        fId={fId}
        fileUpload={2}
        errorState={value ? null : errorState}
        errorText={errorText}
        onPress={() => onPress(id)}
        disabled={uploadDisabled}
        uploadDocument={() => onPress(id)}
        setUpload={setUpload}
      />
    );
  };

  const onPress = id => {
    SheetManager.show('action_sheet', id);
  };

  const getMinDate = () => {
    let today = new Date();
    let mutateMonth;

    if (today.getMonth() + 1 < 10) {
      mutateMonth = `0${today.getMonth() + 1}`;
    } else {
      mutateMonth = today.getMonth() + 1;
    }

    let currdate =
      Number(today.getDate()) < 10
        ? `0${Number(today.getDate())}`
        : `${Number(today.getDate())}`;
    let date = today.getFullYear() + '-' + mutateMonth + '-' + currdate;
    return date;
  };

  const onsubmit = async () => {
    if (
      invoiceNumber &&
      invoiceNumber.length &&
      invoiceDate &&
      invoiceAmount &&
      invoiceAmount.length &&
      uploadInvoice
      && uploadEwayBill
      && uploadEwayBill.name
    ) {
      try {
        setLoading(true);
        let payload = {
          supplierId: await AsyncStorage.getItem('userId'),
          invoiceNumber: invoiceNumber,
          invoiceDate: getMinDate(invoiceDate),
          source: 0,
          ewayDate: ewayBillNumber ? getMinDate(ewayDate) : "",
          ewayNumber: ewayBillNumber,
          warehouseId: warehouseId,
          orderRef: orderRef,
          itemLists: [
            {
              quantity: String(quantity),
              hsnPercentage: String(taxPercentage),
              itemRef: itemRef,
              hsn: hsn,
            },
          ],
          igstApplicable: true,
          countryCode: 356,
          frieght: {
            charge: baseAmount,
            hsn: baseAmount ? hsn : '',
            tax: baseAmount ? taxPercentage : '',
            totalAmount: total,
            remarks: addComment,
            countryCode: 356,
            igst: null,
            cgst: 0,
            sgst: 0,
            vatAmount: 0,
          },
          loading: {
            charge: loadingBaseAmount,
            hsn: loadingBaseAmount ? hsn : '',
            tax: loadingBaseAmount ? taxPercentage : '',
            totalAmount: loadingBaseAmount ? loadingTotal : '',
            countryCode: 356,
            igst: null,
            cgst: 0,
            sgst: 0,
            vatAmount: 0,
          },
          misc: {
            charge: misBaseAmount,
            hsn: misBaseAmount ? hsn : '',
            tax: misBaseAmount ? taxPercentage : '',
            totalAmount: misBaseAmount ? misTotal : '',
            countryCode: 356,
            igst: null,
            cgst: 0,
            sgst: 0,
            vatAmount: 0,
          },
          invoiceTotal: invoiceAmount,
        };
        console.log('Payload====>', payload);
        let invoiceFile = {
          name: 'invoiceFile',
          filename: uploadInvoice.name,
          type: uploadInvoice.type,
          data: RNFetchBlob.wrap(uploadInvoice.uri),
        }
        let ewayFile = {
          name: 'ewayBillFile',
          filename: uploadEwayBill.name,
          type: uploadEwayBill.type,
          data: RNFetchBlob.wrap(uploadEwayBill.uri),
        }

        props.navigation.navigate('InvoiceDetail', { data: payload, invoiceFileData: invoiceFile, ewayFileData: ewayFile })
      }
      catch (err) {
        console.log("Erreor", err);
        setLoading(false);
      }
    } else {

      onInvoiceNumberBlur();
      onInvoiceDateBlur();
      onInvoiceAmountBlur();
      onUploadInvoiceBlur();
      // onEwayBillNumberBlur();
      if (ewayBillNumber) {
        onUploadEwayBlur();
        onEwayDateDateBlur();
      }
    }
  };

  const onCancel = () => {
    props.navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Header
        showBack
        showBell
        navigation={props.navigation}
        showText={'Upload Invoice'}
        rightIconName={'business-details'}></Header>
      <ScrollView style={styles.ContainerCss}>
        {FORM_FIELDS.map((field, fieldKey) => (
          <View>
            {fieldKey == 'loadingBaseAmount' ? (
              <Text style={styles.middleTxt}>
                Loading Charges (if Applicable)
              </Text>
            ) : fieldKey == 'misBaseAmount' ? (
              <Text style={styles.middleTxt}>
                Misc. Charges (if Applicable)
              </Text>
            ) : fieldKey == 'ewayBillNumber' ? (
              UploadInvoice.map(_ => renderInputText(_))
                .toList()
                .toArray()
            ) : fieldKey == 'baseAmount' ? (
              <>
                {UploadEwayBill.map(_ => renderInputText(_))
                  .toList()
                  .toArray()}
                <Text style={styles.middleTxt}>
                  Freight Charges (if Applicable)
                </Text>
              </>
            ) : null}

            <field.component
              {...field}
              key={fieldKey}
              disabled={field.disabled}
            />
          </View>
        )).toList()}

        <ActionSheet
          id="action_sheet"
          onBeforeShow={data => {
            setFId(data);
          }}>
          <View style={styles.actionSheet}>
            {['File Explorer', 'Cancel'].map(_ => (
              <TouchableOpacity onPress={() => openSelection(_)}>
                <Text style={styles.modalText}>{_}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ActionSheet>
      </ScrollView>

      <View style={[styles.bottombtnWrap, { flexDirection: 'row' }]}>
        <View style={{ marginRight: 15, flex: 1 }}>
          <CustomButton
            buttonColor={colors.WhiteColor}
            borderColor={colors.transparent}
            TextColor={colors.blackColor}
            TextFontSize={Dimension.font16}
            title={'CANCEL'}
            onPress={onCancel}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomButton
            buttonColor={colors.BrandColor}
            borderColor={colors.BrandColor}
            TextColor={colors.WhiteColor}
            TextFontSize={Dimension.font16}
            title={'CONTINUE'}
            loading={loading}
            onPress={onsubmit}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  actionSheet: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
  modalText: {
    paddingVertical: 10,
    fontFamily: Dimension.CustomRegularFont,
    borderBottomWidth: 0.5,
    color: colors.FontColor,
  },
  modalContainer: {
    backgroundColor: colors.WhiteColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    marginTop: 'auto',
    paddingTop: Dimension.padding10,
  },
  sectionView: {
    borderColor: colors.grayShade14,
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: Dimension.margin15,
  },
  radioText: {
    fontSize: Dimension.font12,
    color: colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginBottom: Dimension.margin5,
  },

  bottombtnWrap: {
    padding: Dimension.padding15,
    borderTopColor: colors.grayShade2,
    borderTopWidth: 1,
    backgroundColor: colors.WhiteColor,
  },

  ContainerCss: {
    backgroundColor: colors.WhiteColor,
    paddingHorizontal: Dimension.padding5,
    // paddingVertical: Dimension.padding5,
  },
  middleTxt: {
    fontSize: Dimension.font12,
    color: colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  verticalWrapper: {
    paddingHorizontal: Dimension.padding15,
    paddingVertical: Dimension.padding10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayShade9,
  },

  ModalheadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Dimension.padding15,
  },
  ModalHeading: {
    fontSize: Dimension.font16,
    color: colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginBottom: Dimension.margin5,
  },
});

export default InvoiceEMSFormDetailScreen;
