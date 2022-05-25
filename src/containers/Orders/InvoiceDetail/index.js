import React, { useState, useEffect, useRef } from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dimension from '../../../Theme/Dimension';
import colors from '../../../Theme/Colors';
import CustomButton from '../../../component/common/Button';
import Checkbox from '../../../component/common/Checkbox/index';
import Header from '../../../component/common/Header';
import { BASE_URL } from '../../../redux/constants';
import Toast from 'react-native-toast-message';

const InvoiceDetailScreen = props => {
  const [loading, setLoading] = useState(false);
  const [isSelected, setSelection] = useState(false);

  const scrollRef = useRef();
  const moveToBottom = () => {
    scrollRef.current?.scrollTo({
      y: 20,
      x: 0,
      animated: true,
    });
  };


  console.log("DetialProps====>", props);

  const onsubmit = async () => {
    if (isSelected) {
      try {
        setLoading(true);
        let token = `Bearer ${await AsyncStorage.getItem('token')}`;
        const url = `${BASE_URL}api/order/mapDropshipInvoice`;
        const response = await RNFetchBlob.fetch(
          'POST',
          url,
          {
            'Content-Type': 'multipart/form-data',
            Authorization: `${token}`,
          },
          props?.route?.params?.data?.ewayNumber

            ? [{
              name: 'dropshipInvoiceRequest',
              data: JSON.stringify(props?.route?.params?.data),
              type: 'application/json',
            },
            props?.route?.params?.invoiceFileData,
            props?.route?.params?.ewayFileData,
            ]
            : [
              {
                name: 'dropshipInvoiceRequest',
                data: JSON.stringify(props?.route?.params?.data),
                type: 'application/json',
              },
              props?.route?.params?.invoiceFileData,
            ],
        );
        const res = await response.json();
        console.log("Response=====>", res);
        if (res.success) {
          setLoading(false);
          Toast.show({
            type: 'success',
            text2: res.message,
            visibilityTime: 5000,
            autoHide: true,
          });
          props.navigation.navigate('Orders', {
            selectedTab: 'UPLOAD_INVOICE',
          });
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
        console.log('Error', err);
        setLoading(false);
      }
    } else {
      moveToBottom();
      Toast.show({
        type: 'error',
        text2: 'Please select the checkbox first to proceed.',
        visibilityTime: 2000,
        autoHide: true,
      });
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
        showText={'Invoice Detail'}
        rightIconName={'business-details'}></Header>
      <ScrollView bounces style={styles.ContainerCss} ref={scrollRef}>
        <Text style={styles.boldTxt}>
          Please go through below points to ensure quick invoice approval:
        </Text>
        <View style={styles.row}>
          <Text style={styles.numberWrap}>01</Text>
          <Text style={styles.modalText}>
            Company name should be Mogli Labs (India) Pvt Ltd. India must be in braces.
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.numberWrap}>02</Text>
          <Text style={styles.modalText}>
            Ensure that Moglix GSTIN is properly mentioned on the invoice as per Supplier PO.
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.numberWrap}>03</Text>
          <Text style={styles.modalText}>
            Mogli labs PAN & supplier PAN on invoice is mandatory where “Total invoice amount” (incl. tax) is more than or equal to Rs. 2 Lacs
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.numberWrap}>04</Text>
          <Text style={styles.modalText}>
            Each Tax Invoice should have heading “Tax Invoice” and duly signed & stamped properly by the supplier either digital or manual. If vendor turnover is more than 20 crore, E-invoicing is compulsory.
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.numberWrap}>05</Text>
          <Text style={styles.modalText}>
            GST type is verified with the GSTIN (If seller & Moglix have same Business state -CGST & SGST otherwise IGST). In Bill to Ship to cases (Dropship), supplier have to raise bill as per supplier PO, not ship to location
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.numberWrap}>06</Text>
          <Text style={styles.modalText}>
            Clear Invoice copy is uploaded on Supplier Central ensuring that no data is getting cropped.
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.numberWrap}>07</Text>
          <Text style={styles.modalText}>
            Invoicing amount in Supplier Central & Supplier Tax Invoice amount should be exactly the same. Note: (We do not accept invoices with TCS charged by vendor)
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.numberWrap}>08</Text>
          <Text style={styles.modalText}>
            The Invoice Number mentioned on the Tax Invoice & Invoice Number uploaded on Supplier Central & GST portal should be exactly the same. Also, invoice number should not exceed 16 characters, containing alphabets or numerals or special characters.
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.numberWrap}>09</Text>
          <Text style={styles.modalText}>
            The Invoice date & financial year should be correct.
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.numberWrap}>10</Text>
          <Text style={styles.modalText}>
            Moglix address in supplier invoice under heading “bill to” should match as per Moglix PO.
          </Text>
        </View>
        <Checkbox
          checked={isSelected}
          onPress={() => setSelection(!isSelected)}
          title={'I have validated all the above mentioned points'}
        />
      </ScrollView>

      <View
        style={[
          styles.bottombtnWrap,
          { flexDirection: 'row', marginTop: Dimension.margin5 },
        ]}>
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

const styles = StyleSheet.create({
  ContainerCss: {
    paddingHorizontal: Dimension.padding15,
    backgroundColor: colors.WhiteColor,
    overflow: 'visible',
  },
  boldTxt: {
    fontSize: Dimension.font14,
    color: colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginVertical: Dimension.margin15,
  },
  modalText: {
    fontSize: Dimension.font12,
    color: colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    //marginVertical: Dimension.margin15
  },
  bottombtnWrap: {
    padding: Dimension.padding15,
    borderTopColor: colors.grayShade2,
    borderTopWidth: 1,
    backgroundColor: colors.WhiteColor,
  },

  row: { flexDirection: 'row', marginBottom: Dimension.margin10, width: '92%' },
  numberWrap: {
    width: Dimension.width20,
    fontSize: Dimension.font12,
    color: colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    borderRadius: 2,
    backgroundColor: '#DDDDDD',
    textAlign: 'center',
    marginRight: Dimension.margin8,
    textAlignVertical: 'center',
    paddingVertical: Dimension.padding4,
    height: Dimension.height20,
  },
});

export default InvoiceDetailScreen;
