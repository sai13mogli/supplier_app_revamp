import React, { useState, useEffect } from 'react';
import { OrderedMap } from 'immutable';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dimension from '../../../Theme/Dimension';
import colors from '../../../Theme/Colors';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../../component/common/Button';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import FileUpload from '../../../component/common/FileUpload';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import Header from '../../../component/common/Header';
import CustomeDatePicker from '../../../component/common/Datepicker';
import { getInvoiceOMSDetails } from '../../../services/orders';
import styles from './style';
import InvoiceOmsCard from '../../../component/InvoiceOmsCard';
import { BASE_URL } from '../../../redux/constants';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-toast-message';
import { fetchOrders, fetchTabCount } from '../../../redux/actions/orders';

const UploadInvoiceOMSScreen = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [omsLoading, setOmsLoading] = useState(false);
  const [itemRef, setitemRef] = useState(props?.route?.params?.itemRef);
  const [podId, setPodId] = useState(props?.route?.params?.itemRef);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceNumberError, setInvoiceNumberError] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoiceDateError, setInvoiceDateError] = useState(false);
  const [uploadInvoice, setUploadInvoice] = useState({});
  const [uploadInvoiceError, setuploadInvoiceError] = useState(false);
  const [supplierInvoiceTotal, setSupplierInvoiceTotal] = useState('');
  const [supplierInvoiceTotalError, setSupplierInvoiceTotalError] =
    useState(false);
  const [poTotal, setPoTotal] = useState(0);
  const [poTotalError, setpoTotalError] = useState(false);
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [OmsUploadList, setOmsUploadList] = useState([]);
  const [bulkItemIds, setBulkItemIds] = useState([]);
  const [poTotalPrice, setPoTotalPrice] = useState([]);
  const [totalKeys, setTotalKeys] = useState([]);
  const [fId, setFId] = useState(null);
  const [podIdList, setPodIdList] = useState([]);
  const [actionCTA, setaAtionCTA] = useState(props?.route?.params?.actionCTA);

  const Documents = new OrderedMap({
    upload_invoice: {
      id: 'uploadInvoice',
      title: 'Upload Invoice',
      state: uploadInvoice,
      errorState: uploadInvoiceError,
      value: uploadInvoice.name,
      disabled: false,
      documents: {
        name: uploadInvoice && uploadInvoice.name,
        doc: uploadInvoice,
      },
      isImp: true,
      errorText: 'Please upload Invoice',
      placeholder: 'Tap to Upload',
    },
  });

  const getTotalPrice = () => {
    let price = 0;
    price = poTotalPrice.reduce(function (sum, tax) {
      return sum + tax.price;
    }, 0);
    return price;
  };

  const FORM_FIELDS = new OrderedMap({
    invoiceNumber: {
      title: 'Invoice Number',
      isImp: true,
      label: 'Invoice Number',
      placeholder: 'Invoice Number',
      errorMessage: 'Enter valid invoice number',
      showError: invoiceNumberError,
      value: invoiceNumber,
      onBlur: () => onInvoiceNumberBlur(),
      onChangeText: text => setInvoiceNumber(text),
      component: FloatingLabelInputField,
    },
    supplierInvoiceTotal: {
      title: 'Supplier Invoice Total',
      isImp: true,
      keyboardType: 'number-pad',
      label: 'Supplier Invoice Total',
      placeholder: 'Supplier Invoice Total',
      showError: supplierInvoiceTotalError,
      errorMessage: 'Supplier invoice total must be equal to Po Total',
      value: supplierInvoiceTotal,
      onBlur: () => onSupplierInvoiceBlur(),
      onChangeText: text => setSupplierInvoiceTotal(text),
      component: FloatingLabelInputField,
    },
    invoiceDate: {
      title: 'Invoice Date',
      maxdate: new Date(),
      isImp: true,
      label: 'Invoice Date',
      placeholder: 'Invoice Date',
      errorMessage: 'Enter valid Invoice date',
      showError: invoiceDate ? null : invoiceDateError,
      value: invoiceDate,
      onBlur: () => onInvoiceDateBlur(),
      onChange: invoiceDate => setInvoiceDate(invoiceDate),
      component: CustomeDatePicker,
    },
    poTotal: {
      title: 'Po Total',
      disabled: true,
      isImp: false,
      label: 'Po Total',
      keyboardType: 'number-pad',
      placeholder: 'Po Total',
      errorMessage: 'Enter valid po total amount',
      showError: poTotalError,
      value: String(getTotalPrice()),
      onBlur: () => onPoTotalBlur(),
      onChangeText: text => setPoTotal(text),
      component: FloatingLabelInputField,
    },
  });

  let EmsOmsFlag = actionCTA;

  useEffect(() => {
    setOmsLoading(true);
    if (EmsOmsFlag.includes('MAP_PO_TO_INVOICE')) {
      fetchInvoiceOMSDetails();
    }
  }, []);

  const onInvoiceNumberBlur = () => {
    if (invoiceNumber && invoiceNumber.length) {
      setInvoiceNumberError(false);
    } else {
      setInvoiceNumberError(true);
    }
  };

  const onSupplierInvoiceBlur = () => {
    if (
      supplierInvoiceTotal != poTotal &&
      supplierInvoiceTotal.length &&
      supplierInvoiceTotal
    ) {
      setSupplierInvoiceTotalError(false);
    } else {
      setSupplierInvoiceTotalError(true);
    }
  };

  const onInvoiceDateBlur = () => {
    if (invoiceDate && invoiceDate.length) {
      setInvoiceDateError(false);
    } else {
      setInvoiceDateError(true);
    }
  };

  const onUploadInvoiceBlur = () => {
    if (uploadInvoice && uploadInvoice.name) {
      setuploadInvoiceError(false);
    } else {
      setuploadInvoiceError(true);
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
        id={id}
        fId={fId}
        fileUpload={2}
        onBlur={onUploadInvoiceBlur}
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

  const fetchInvoiceOMSDetails = async () => {
    try {
      let payload = {
        supplierId: await AsyncStorage.getItem('userId'),
      };
      const { data } = await getInvoiceOMSDetails(payload);
      if (data.success) {
        setOmsUploadList(data?.data);
        setOmsLoading(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectItemId = (podId, totalPrice, keys) => {
    let currentItemIds = [...bulkItemIds];
    let currentPrice = [...poTotalPrice];
    let currentKeys = [...totalKeys];
    setPodId(podId);
    if (currentItemIds.includes(podId)) {
      currentItemIds = currentItemIds.filter(_ => _ != podId);
    } else {
      if (currentItemIds) {
        currentItemIds.push(podId);
        currentKeys.push(keys);
      } else {
        currentItemIds = [];
        currentKeys = [];
        currentItemIds.push(podId);
        currentKeys.push(keys);
      }
    }
    setTotalKeys(currentKeys);
    setBulkItemIds(currentItemIds);
    let filterData = poTotalPrice.filter(item => item.id == podId);
    if (filterData.length > 0) {
      const index = poTotalPrice.findIndex(x => x.id === filterData[0].id);
      let priceList = [...poTotalPrice];
      priceList.splice(index, 1);
      setPoTotalPrice(priceList);
      setPoTotal(getTotalPrice());
      var arr = [...podIdList];
      const podindex = arr.findIndex(x => x == podId);
      arr.splice(podindex, 1);
      setPodIdList(arr);
    } else {
      let row = {
        id: podId,
        price: totalPrice,
      };
      let priceList = [...poTotalPrice];

      priceList.push(row);
      setPoTotalPrice(priceList);
      setPoTotal(getTotalPrice());
      var arr = [...podIdList];
      arr.push(podId);
      setPodIdList(arr);
    }
  };

  const renderItem = ({ item, index }) => {
    let list = Object.values(item)?.[0];
    let keys = Object.keys(item)?.[0];

    return (
      <InvoiceOmsCard
        msn={list.product_msn}
        quantity={list.quantity}
        taxpercent={list.tax_percent}
        podId={list.item_id}
        totalPrice={list.item_total}
        TpUnit={list.transfer_price}
        productName={list.product_name}
        bulkItemIds={bulkItemIds}
        actionCTA={item.actionCTA}
        keys={keys}
        setBulkItemIds={setBulkItemIds}
        selectItemId={selectItemId}
      />
    );
  };

  const renderListEmptyComponent = () => {
    if (global.List == 0) {
      return (
        <View style={styles.emptyWrap}>
          <Image
            // source={require('../../assets/images/emptyOrders.png')}
            style={{ width: 300, height: 200 }}
          />
          <Text style={styles.emptyTxt}>No Data Available</Text>
        </View>
      );
    }
    return null;
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
      invoiceDate.length &&
      uploadInvoice &&
      uploadInvoice.name &&
      supplierInvoiceTotal.length
    ) {
      try {
        setLoading(true);
        let token = `Bearer ${await AsyncStorage.getItem('token')}`;
        const url = `${BASE_URL}api/order/oms/mapInvoice`;
        const userId = await AsyncStorage.getItem('userId');
        const response = await RNFetchBlob.fetch(
          'POST',
          url,
          {
            'Content-Type': 'multipart/form-data',
            Authorization: `${token}`,
          },

          [
            {
              name: 'invoiceNumber',
              data: String(invoiceNumber),
            },
            {
              name: 'supplierId',
              data: String(userId),
            },
            {
              name: 'itemLists',
              data: podIdList.length > 1 ? podIdList.join(',') : String(podId),
            },
            {
              name: 'invoiceTotal',
              data: String(supplierInvoiceTotal),
            },
            {
              name: 'invoiceDate',
              data: getMinDate(invoiceDate),
            },
            {
              name: 'file',
              filename: uploadInvoice.name,
              type: uploadInvoice.type,
              data: RNFetchBlob.wrap(uploadInvoice.uri),
            },
          ],
        );
        const res = await response.json();
        console.log('Res===>', res);
        if (res.success) {
          setLoading(false);
          // dispatch(fetchOrders(page, search, orderStage, onlineShipmentMode, filters),
          // dispatch(fetchTabCount({
          //   supplierId: await AsyncStorage.getItem('userId'),
          //   tabRef,
          //   onlineShipmentMode,
          // }),
          // );

          Toast.show({
            type: 'success',
            text2: res.message,
            visibilityTime: 4000,
            autoHide: true,
          });
          props.navigation.goBack();
        } else if (res.success == false) {
          setLoading(false);
          Toast.show({
            type: 'error',
            text2: res.message,
            visibilityTime: 5000,
            autoHide: true,
          });
        }
      } catch (err) {
        setLoading(false);
      }
    } else {
      onInvoiceNumberBlur();
      onSupplierInvoiceBlur();
      onInvoiceDateBlur();
      onUploadInvoiceBlur();
    }
  };

  const onCancel = () => {
    props.navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        showBack
        navigation={props.navigation}
        showText={'Upload Invoice'}
      />

      <ScrollView bounces style={styles.ContainerCss}>
        {omsLoading ? (
          <View
            style={{
              flex: 1,
              height: Dimensions.get('window').height,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 50,
            }}>
            <ActivityIndicator
              style={{ alignSelf: 'center', margin: Dimension.margin12 }}
              size={'large'}
              color={colors.BrandColor}
            />
          </View>
        ) : (
          <FlatList
            bounces
            data={OmsUploadList.records}
            renderItem={renderItem}
            ListEmptyComponent={renderListEmptyComponent}
            keyExtractor={(item, index) => `${index}-item`}
            onEndReachedThreshold={0.9}
            showsVerticalScrollIndicator={false}
          />
        )}
        <View style={{ marginTop: Dimension.margin30 }}>
          {FORM_FIELDS.map((field, fieldKey) => (
            <field.component
              {...field}
              key={fieldKey}
              disabled={field.disabled}
            />
          )).toList()}

          {Documents.map(_ => renderInputText(_))
            .toList()
            .toArray()}
        </View>
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
            title={'SUBMIT'}
            loading={loading}
            onPress={onsubmit}
          />
        </View>
      </View>
    </View>
  );
};

export default UploadInvoiceOMSScreen;
