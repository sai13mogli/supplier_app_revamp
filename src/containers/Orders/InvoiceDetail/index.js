import React, { useState, useEffect } from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import {
    View,
    StyleSheet,
    Text,
    ScrollView
} from 'react-native';
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

    console.log("props====>", props?.route?.params?.data?.ewayNumber);

    const onsubmit = async () => {
        if (!isSelected) {
            Toast.show({
                type: 'error',
                text2: 'Kindly Accept Terms & Conditions',
                visibilityTime: 2000,
                autoHide: true,
            });
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
                    props?.route?.params?.data?.ewayNumber ? [
                        {
                            name: 'dropshipInvoiceRequest',
                            data: JSON.stringify(props?.route?.params?.data),
                            type: 'application/json',
                        },
                        props?.route?.params?.invoiceFileData,
                        props?.route?.params?.ewayFileData,
                    ] : [
                        {
                            name: 'dropshipInvoiceRequest',
                            data: JSON.stringify(props?.route?.params?.data),
                            type: 'application/json',
                        },
                        props?.route?.params?.invoiceFileData,
                    ],
                );
                const res = await response.json();
                console.log('Respose===>', response, res);
                if (res.success) {
                    setLoading(false);
                    // dispatch(fetchOrders(page, search, orderStage, onlineShipmentMode, filters),
                    //   fetchTabCount({
                    //     supplierId: await AsyncStorage.getItem('userId'),
                    //     tabRef,
                    //     onlineShipmentMode,
                    //   }));
                    Toast.show({
                        type: 'success',
                        text2: res.message,
                        visibilityTime: 4000,
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
                console.log("Erreor", err);
                setLoading(false);
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
                showText={'Invoice Detail'}
                rightIconName={'business-details'}></Header>
            <ScrollView style={styles.ContainerCss}>
                <Text style={styles.modalText}>
                    please go though below points to ensure quick invoice approval
                </Text>

                <Text style={styles.modalText}>
                    please go though below points to ensure quick invoice approval
                </Text>
                <Text style={styles.modalText}>
                    please go though below points to ensure quick invoice approval
                </Text>
                <Text style={styles.modalText}>
                    please go though below points to ensure quick invoice approval
                </Text>
                <Text style={styles.modalText}>
                    please go though below points to ensure quick invoice approval
                </Text>
                <Text style={styles.modalText}>
                    please go though below points to ensure quick invoice approval
                </Text>
                <Text style={styles.modalText}>
                    please go though below points to ensure quick invoice approval
                </Text>
                <Text style={styles.modalText}>
                    please go though below points to ensure quick invoice approval
                </Text>
                <Text style={styles.modalText}>
                    please go though below points to ensure quick invoice approval
                </Text>

                <Checkbox
                    checked={isSelected}
                    onPress={() => setSelection(!isSelected)}
                    title={'I have validated all the above metioned points'}
                />
            </ScrollView>


            <View style={[styles.bottombtnWrap, { flexDirection: 'row', marginTop: Dimension.margin5, }]}>
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

    modalText: {
        fontSize: Dimension.font14,
        color: colors.FontColor,
        fontFamily: Dimension.CustomRegularFont,
        marginVertical: Dimension.margin15
    },
    bottombtnWrap: {
        padding: Dimension.padding15,
        borderTopColor: colors.grayShade2,
        borderTopWidth: 1,
        backgroundColor: colors.WhiteColor,
    },





});

export default InvoiceDetailScreen;
