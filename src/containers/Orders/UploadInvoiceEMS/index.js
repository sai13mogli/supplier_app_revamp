import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import Header from '../../../component/common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../../component/common/Button';
import {getInvoiceEMSDetails} from '../../../services/orders';
import colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import styles from './style';
import InvoiceEmsCard from '../../../component/InvoiceEmsCard';

const UploadInvoiceScreen = props => {
  const [loading, setLoading] = useState(false);
  const [bulkItemIds, setBulkItemIds] = useState([]);
  const [orderRef, setOrderRef] = useState(props?.route?.params?.orderRef);
  const [totalAmount, setTotalAmount] = useState(
    props?.route?.params?.totalAmount,
  );
  const [hsn, sethsn] = useState(props?.route?.params?.hsn);
  const [taxPercentage, setTaxPercentage] = useState(
    props?.route?.params?.taxPercentage,
  );
  const [quantity, setquantity] = useState(props?.route?.params?.quantity);
  const [warehouseId, setwarehouseId] = useState(
    props?.route?.params?.warehouseId,
  );
  const [itemRef, setitemRef] = useState(props?.route?.params?.itemRef);
  const [actionCTA, setaAtionCTA] = useState(props?.route?.params?.actionCTA);
  const [invoiceList, setInvoiceList] = useState([]);

  let EmsOmsFlag = actionCTA;

  useEffect(() => {
    if (EmsOmsFlag.includes('MAP_INVOICE')) {
      fetchInvoiceEMSDetails();
    }
  }, []);

  const selectItemId = itemId => {
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
  };

  const fetchInvoiceEMSDetails = async () => {
    try {
      let payload = {
        supplierId: await AsyncStorage.getItem('userId'),
        orderRef: orderRef,
      };
      const {data} = await getInvoiceEMSDetails(payload);
      if (data.success) {
        setInvoiceList(data?.data?.itemList);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <InvoiceEmsCard
        msn={item.productMsn}
        orderRef={item.orderRef}
        productUom={item.productUom}
        quantity={item.quantity}
        transferPrice={item.transferPrice}
        hsn={item.productHsn}
        productName={item.productName}
        totalAmount={item.orderInfo.totalAmount}
        taxPercentage={item.taxPercentage}
        itemId={item.itemId}
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
            style={{width: 300, height: 200}}
          />
          <Text style={styles.emptyTxt}>No Data Available</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.outerView}>
      <Header
        showBack
        navigation={props.navigation}
        showText={'Upload Invoice'}
        // rightIconName={'business-details'}
      />
      <FlatList
        data={invoiceList}
        renderItem={renderItem}
        ListEmptyComponent={renderListEmptyComponent}
        keyExtractor={(item, index) => `${index}-item`}
        onEndReachedThreshold={0.9}
        showsVerticalScrollIndicator={false}
      />
      <View>
        <Text style={styles.TitleLightTxt}>
          Please select the product to start filling invoice details
        </Text>
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
          onPress={() =>
            props.navigation.navigate('InvoiceEMSFormDetails', {
              orderRef,
              itemRef,
              warehouseId,
              quantity,
              hsn,
              totalAmount,
              taxPercentage,
            })
          }
        />
      </View>
    </View>
  );
};

export default UploadInvoiceScreen;
