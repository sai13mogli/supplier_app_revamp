import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image, ActivityIndicator, Dimensions, Alert } from 'react-native';
import Header from '../../../component/common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../../component/common/Button';
import { getInvoiceEMSDetails } from '../../../services/orders';
import colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import styles from './style';
import InvoiceEmsCard from '../../../component/InvoiceEmsCard';
import Toast from 'react-native-toast-message';

const UploadInvoiceScreen = props => {
  const [loading, setLoading] = useState(false);
  const [invoiceLoader, setInvoiceLoader] = useState(false);
  const [orderRef, setOrderRef] = useState(props?.route?.params?.orderRef);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState([]);
  const [podIdList, setPodIdList] = useState([]);
  const [selectedTab, setSelectedTab] = useState(
    props.route.params.selectedTab || 'PENDING_ACCEPTANCE',
  );
  const [quantity, setQuantity] = useState(props?.route?.params?.quantity);
  const [warehouseId, setwarehouseId] = useState(
    props?.route?.params?.warehouseId,
  );
  const [actionCTA, setaAtionCTA] = useState(props?.route?.params?.actionCTA);
  const [invoiceList, setInvoiceList] = useState([]);

  let EmsOmsFlag = actionCTA;
  let tax = global.hsn;

  useEffect(() => {
    setInvoiceLoader(true);
    if (
      EmsOmsFlag.includes('MAP_INVOICE') ||
      EmsOmsFlag.includes('REMAP_INVOICE')
    ) {
      fetchInvoiceEMSDetails();
    }
  }, []);

  const getTotalPrice = () => {
    let price = 0;
    price = totalPrice.filter(_ => _.checked).reduce(function (sum, tax) {
      return sum + tax.price;
    }, 0);
    return price.toFixed(2);
  };

  const selectItemId = (itemId, totalAmount, keys,) => {
    let updatedTotalPrice = [...totalPrice]
    updatedTotalPrice = updatedTotalPrice.map((_) => ({
      ..._,
      checked: _.id == itemId ? !_.checked : _.checked

    }))
    setTotalPrice([...updatedTotalPrice])
  };

  const fetchInvoiceEMSDetails = async () => {
    try {
      let payload = {
        supplierId: await AsyncStorage.getItem('userId'),
        orderRef: orderRef,
      };
      const { data, } = await getInvoiceEMSDetails(payload);
      console.log("await", data?.message);
      if (data.success) {
        setInvoiceList(data?.data?.itemList);
        setTotalPrice(data?.data?.itemList.map((_) => ({
          quantity: _.quantity,
          hsn: _.productHsn,
          hsnPercentage: _.taxPercentage,
          itemRef: _.itemRef,
          id: _.id,
          price: _.itemTotal,
          checked: false,
        })))
        setLoading(false);
        setInvoiceLoader(false);
      } else if (data.success == false) {
        setInvoiceLoader(false);
        setLoading(false);
        Toast.show({
          type: 'success',
          text2: data?.message,
          visibilityTime: 5000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setInvoiceLoader(false);
    }
  };

  const calculateHeaderSum = (id, price, valueType, value) => {
    let data = [...totalPrice].map((item) => ({
      ...item,
      quantity: valueType == "quantity" ? item.id == id ? value : item.quantity : item.quantity,
      hsnPercentage: valueType == "hsnPercentage" ? item.id == id ? value : item.hsnPercentage : item.hsnPercentage,
      price: item.id == id ? price : item.price,
    }))
    setTotalPrice([...data])
  };

  const onUpdateArr = () => {
    let updated = [...podIdList]
    props.navigation.navigate('InvoiceEMSFormDetails', {
      orderRef,
      updated,
      warehouseId,
      itemLists: totalPrice.filter((_) => _.checked),
      totalAmount,
      tax,
      selectedTab,
    });
  }

  const renderItem = ({ item }) => {
    let keys = item?.itemRef
    console.log("okkk===>", item);
    return (
      <InvoiceEmsCard
        msn={item.productMsn}
        orderRef={item.orderRef}
        productUom={item.productUom}
        quantity={item.quantity}
        UpdatedHsn={(value, id) => updatedHsn(value, id)}
        UpdatedQuntity={(value, id) => updateQty(value, id)}
        UpdatedTotalPrice={(id, price, valueType, value) => calculateHeaderSum(id, price, valueType, value)}
        transferPrice={item.transferPrice}
        hsn={item.productHsn}
        productName={item.productName}
        totalAmount={item.itemTotal}
        taxPercentage={(totalPrice.find(_ => _.id == item.id) || {}).hsnPercentage || item.taxPercentage}
        selectedTab={selectedTab}
        itemId={item.id}
        keys={keys}
        itemIndex={item}
        checked={(totalPrice.find(_ => _.id == item.id) || {}).checked || false}
        selectItemId={selectItemId}
      />
    );
  };

  const renderOrderHeaderDetail = () => {
    return (
      <>
        <View style={styles.headerView}>
          <Text style={[styles.TitleBoldTxt]}>
            PO ID - <Text style={styles.TitleBoldTxt}>{orderRef}</Text>
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
              ₹{getTotalPrice()}
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
    <View style={styles.outerView}>
      <Header
        showBack
        navigation={props.navigation}
        showText={'Upload Invoice'}
        showBell
      />
      {renderOrderHeaderDetail()}
      {invoiceLoader ? (
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
          data={invoiceList}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-item`}
          onEndReachedThreshold={0.9}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View>
        <View style={styles.titleWrap}>
          <Text style={styles.TitleLightTxt}>
            Please select the product to start filling invoice details
          </Text>
        </View>
      </View>
      <View style={styles.bottombtnWrap}>
        <CustomButton
          disabled={!totalPrice.filter((_) => _.checked).length}
          buttonColor={
            totalPrice.filter((_) => _.checked).length
              ? colors.BrandColor
              : colors.grayShade8
          }
          borderColor={colors.transparent}
          TextColor={
            totalPrice.filter((_) => _.checked).length
              ? colors.WhiteColor
              : colors.blackColor
          }
          TextFontSize={Dimension.font16}
          title={'CONTINUE'}
          loading={loading}
          onPress={onUpdateArr}
        />
      </View>
    </View>
  );
};

export default UploadInvoiceScreen;
