import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image, ActivityIndicator, Dimensions } from 'react-native';
import Header from '../../../component/common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../../component/common/Button';
import { getInvoiceEMSDetails } from '../../../services/orders';
import colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import styles from './style';
import InvoiceEmsCard from '../../../component/InvoiceEmsCard';

const UploadInvoiceScreen = props => {
  const [loading, setLoading] = useState(false);
  const [invoiceLoader, setInvoiceLoader] = useState(false);
  const [bulkItemIds, setBulkItemIds] = useState([]);
  const [orderRef, setOrderRef] = useState(props?.route?.params?.orderRef);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState([]);
  const [totalKeys, setTotalKeys] = useState([]);
  const [podIdList, setPodIdList] = useState([]);
  const [data, setData] = useState('');
  const [hsn, sethsn] = useState(props?.route?.params?.hsn);
  const [taxPercentage, setTaxPercentage] = useState(
    props?.route?.params?.taxPercentage
  );
  const [selectedTab, setSelectedTab] = useState(
    props.route.params.selectedTab || 'PENDING_ACCEPTANCE',
  );
  const [quantity, setQuantity] = useState(props?.route?.params?.quantity);
  const [warehouseId, setwarehouseId] = useState(
    props?.route?.params?.warehouseId,
  );
  const [itemRefs, setitemRef] = useState(props?.route?.params?.itemRef);
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

    price = totalPrice.reduce(function (sum, tax) {
      return sum + tax.price;
    }, 0);
    console.log("Priceq====>", price, totalPrice);

    return price.toFixed(2);
  };



  // console.log("Okk===>", taxPercentage, hsn, quantity, podIdList);

  const selectItemId = (itemId, totalAmount, keys,) => {
    let updatedTotalPrice = [...totalPrice]
    updatedTotalPrice = updatedTotalPrice.map((_) => ({
      ..._,
      checked: _.id == itemId ? !_.checked : _.checked

    }))
    setTotalPrice([...updatedTotalPrice])
    // console.log("okk====>", quantity, taxPercentage);
    // let currentItemIds = [...bulkItemIds];
    // let currentKeys = [...totalKeys];
    // try {
    //   setitemRef(itemId);
    //   if (currentItemIds.includes(itemId)) {
    //     currentItemIds = currentItemIds.filter(_ => _ != itemId);
    //   } else {
    //     if (currentItemIds) {
    //       var obj = {
    //         quantity: quantity,
    //         hsn: hsn,
    //         hsnPercentage: taxPercentage,
    //         itemRef: keys,
    //         id: itemId,
    //       }
    //       currentItemIds.push(itemId);
    //       currentKeys.push(obj);
    //     } else {
    //       currentItemIds = [];
    //       currentKeys = [];
    //       var obj = {
    //         quantity: quantity,
    //         hsn: hsn,
    //         hsnPercentage: taxPercentage,
    //         itemRef: keys,
    //         id: itemId,
    //       }
    //       currentItemIds.push(itemId);
    //       currentKeys.push(obj);
    //     }
    //   }
    //   setBulkItemIds(currentItemIds);
    //   setTotalKeys(currentKeys);
    //   let filterData = totalPrice.filter(item => item.id == itemId);
    //   if (filterData.length > 0) {
    //     const index = totalPrice.findIndex(x => x.id === filterData[0].id);
    //     let priceList = [...totalPrice];
    //     priceList.splice(index, 1);
    //     setTotalPrice(priceList);
    //     // let arr = [...podIdList];
    //     // const podindex = arr.findIndex(x => x == keys);
    //     // arr.splice(podindex, 1);
    //     // setPodIdList(arr);
    //   } else {
    //     let row = {
    //       id: itemId,
    //       price: totalAmount,
    //       quantity: quantity,
    //       hsn: hsn,
    //       hsnPercentage: taxPercentage,
    //       itemRef: keys,
    //     };
    //     let priceList = [...totalPrice];
    //     priceList.push(row);
    //     setTotalPrice(priceList);
    //     // let obj = {
    //     //   quantity: quantity,
    //     //   hsn: hsn,
    //     //   hsnPercentage: taxPercentage,
    //     //   itemRef: keys,
    //     //   id: itemId,
    //     // }
    //     // let arr = [...podIdList];
    //     // arr.push(obj)
    //     // setPodIdList(arr);
    //   }
    // }
    // catch (error) {
    //   console.log("Error", error);
    // }
  };

  const fetchInvoiceEMSDetails = async () => {
    try {
      let payload = {
        supplierId: await AsyncStorage.getItem('userId'),
        orderRef: orderRef,
      };
      const { data } = await getInvoiceEMSDetails(payload);
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
      }
    } catch (error) {
      console.log(error);
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

  // const updatedHsn = (value, id) => {
  //   let data = [...totalPrice].map((item) => ({
  //     ...item,
  //     hsn: item.id == id ? value : item.hsn
  //   }))
  //   setTotalPrice([...data])

  // }

  // const updateQty = (value, id) => {
  //   console.log("ValuesQnty", value, id);
  //   let data = [...totalPrice].map((item) => ({
  //     ...item,
  //     quantity: item.id == id ? value : item.quantity
  //   }))
  //   setTotalPrice([...data])

  // }

  const onUpdateArr = () => {
    let updated = [...podIdList]


    props.navigation.navigate('InvoiceEMSFormDetails', {
      orderRef,
      updated,
      warehouseId,
      itemLists: totalPrice.filter((_) => _.checked),
      // quantity,
      // hsn,
      // taxPercentage,
      totalAmount,
      tax,
      selectedTab,
    });
  }



  const renderItem = ({ item }) => {
    let keys = item?.itemRef

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
        taxPercentage={item.taxPercentage}
        selectedTab={selectedTab}
        itemId={item.id}
        keys={keys}
        itemIndex={item}
        checked={(totalPrice.find(_ => _.id == item.id) || {}).checked || false}
        // bulkItemIds={bulkItemIds}
        // setBulkItemIds={setBulkItemIds}
        selectItemId={selectItemId}
      />
    );
  };

  // const renderListEmptyComponent = () => {
  //   if (global.List == 0) {
  //     return (
  //       <View style={styles.emptyWrap}>
  //         <Image
  //           style={{ width: 300, height: 200 }}
  //         />
  //         <Text style={styles.emptyTxt}>No Data Available</Text>
  //       </View>
  //     );
  //   }
  //   return null;
  // };

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
          // ListEmptyComponent={renderListEmptyComponent}
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
