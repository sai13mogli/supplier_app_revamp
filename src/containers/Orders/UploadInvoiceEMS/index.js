import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image, ActivityIndicator } from 'react-native';
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
  const [headerSum, setHeaderSum] = useState(0)
  const [totalSum, setTotalSum] = useState(0)
  const [hsn, sethsn] = useState(props?.route?.params?.hsn);
  const [taxPercentage, setTaxPercentage] = useState(
    props?.route?.params?.taxPercentage,
  );
  const [selectedTab, setSelectedTab] = useState(
    props.route.params.selectedTab || 'PENDING_ACCEPTANCE',
  );
  const [quantity, setQuantity] = useState(props?.route?.params?.quantity);
  const [warehouseId, setwarehouseId] = useState(
    props?.route?.params?.warehouseId,
  );
  const [itemRef, setitemRef] = useState(props?.route?.params?.itemRef);
  const [actionCTA, setaAtionCTA] = useState(props?.route?.params?.actionCTA);
  const [invoiceList, setInvoiceList] = useState([]);

  let EmsOmsFlag = actionCTA;
  let tax = global.hsn

  useEffect(() => {
    setInvoiceLoader(true)
    if (EmsOmsFlag.includes('MAP_INVOICE') || EmsOmsFlag.includes('REMAP_INVOICE')) {
      fetchInvoiceEMSDetails();
    }

  }, []);



  const getTotalPrice = () => {
    let price = 0;

    price = totalPrice.reduce(function (sum, tax) {
      return sum + tax.price;
    }, 0);
    return price;
  };


  const selectItemId = (itemId, totalAmount) => {

    console.log("TotalAmoaunr====>", totalAmount);
    let currentItemIds = [...bulkItemIds];

    if (currentItemIds.includes(itemId)) {
      currentItemIds = currentItemIds.filter(_ => _ != itemId);
    } else {
      if (currentItemIds) {
        currentItemIds.push(itemId);
      } else {
        currentItemIds = [];
        currentItemIds.push(itemId);
      }
    }
    setBulkItemIds(currentItemIds);
    let filterData = totalPrice.filter(item => item.id == itemId);
    if (filterData.length > 0) {
      const index = totalPrice.findIndex(x => x.id === filterData[0].id);
      let priceList = [...totalPrice];
      priceList.splice(index, 1);
      setTotalPrice(priceList);
      // setTotalSum(totalSum - totalAmount)
      console.log("setHeaderSum====>", totalSum, totalAmount);
      // setTotalAmount(getTotalPrice());
    } else {
      let row = {
        id: itemId,
        price: totalAmount,
      };
      let priceList = [...totalPrice];
      priceList.push(row);
      setTotalPrice(priceList);
      // setTotalSum(totalSum + totalAmount)
      // setTotalAmount(getTotalPrice());
      console.log("setHeaderSum2====>", totalSum, totalAmount);

    }
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
        setLoading(false);
        setInvoiceLoader(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateHeaderSum = (value) => {
    let arrSum = totalPrice.length > 0 ? totalPrice.reduce(function (sum, tax) {
      return sum + tax.price;
    }, 0) : 0;

    let totalSum = arrSum + value
    console.log("totalSum===>", totalSum);
    setHeaderSum(totalSum)
    console.log("totalAmoubt", totalSum);
  }

  const renderItem = ({ item }) => {
    return (
      <InvoiceEmsCard
        msn={item.productMsn}
        orderRef={item.orderRef}
        productUom={item.productUom}
        quantity={item.quantity}
        selectedValue={(value) => setTaxPercentage(value)}
        UpdatedQuntity={(value) => setQuantity(value)}
        UpdatedTotalPrice={(value) => (value)}
        transferPrice={item.transferPrice}
        hsn={item.productHsn}
        productName={item.productName}
        totalAmount={item.itemTotal}
        taxPercentage={item.taxPercentage}
        selectedTab={selectedTab}
        itemId={item.id}
        itemIndex={item}

        bulkItemIds={bulkItemIds}
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
              ₹{getTotalPrice(totalAmount)}
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
      {
        invoiceLoader ? (
          <ActivityIndicator
            style={{ alignSelf: 'center', padding: 12 }}
            color={colors.BrandColor}
          />
        ) :
          <FlatList
            data={invoiceList}
            renderItem={renderItem}
            ListEmptyComponent={renderListEmptyComponent}
            keyExtractor={(item, index) => `${index}-item`}
            onEndReachedThreshold={0.9}
            showsVerticalScrollIndicator={false}
          />

      }

      <View>
        <View style={styles.titleWrap}>
          <Text style={styles.TitleLightTxt}>
            Please select the product to start filling invoice details
          </Text>

        </View>

      </View>
      <View style={styles.bottombtnWrap}>
        <CustomButton
          disabled={bulkItemIds && bulkItemIds.length ? false : true}
          buttonColor={
            bulkItemIds && bulkItemIds.length
              ? colors.BrandColor
              : colors.grayShade8
          }
          borderColor={colors.transparent}
          TextColor={
            bulkItemIds && bulkItemIds.length
              ? colors.WhiteColor
              : colors.blackColor
          }
          TextFontSize={Dimension.font16}
          title={'CONTINUE'}
          loading={loading}
          onPress={() => {
            props.navigation.navigate('InvoiceEMSFormDetails', {
              orderRef,
              itemRef,
              warehouseId,
              quantity,
              hsn,
              taxPercentage,
              totalAmount,
              tax,
              selectedTab,
            })

          }
          }
        />
      </View>
    </View>
  );
};

export default UploadInvoiceScreen;
