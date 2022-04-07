import React, { useState, useEffect } from "react";
import { OrderedMap } from 'immutable';
import { View, StyleSheet, Text, TouchableOpacity, Modal, ScrollView, FlatList } from "react-native";
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dimension from "../../../Theme/Dimension";
import colors from "../../../Theme/Colors"
import CustomButton from '../../../component/common/Button';
import FloatingLabelInputField from '../../../component/common/FloatingInput';
import FileUpload from '../../../component/common/FileUpload';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import Header from '../../../component/common/Header';
import CustomeDatePicker from '../../../component/common/Datepicker';
import { getInvoiceOMSDetails, uploadOMSInvoice } from '../../../services/orders';
import styles from './style';
import InvoiceOmsCard from '../../../component/InvoiceOmsCard';
import { BASE_URL } from '../../../redux/constants';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-toast-message';

const UploadInvoiceOMSScreen = (props) => {

    const [loading, setLoading] = useState(false);
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [invoiceNumberError, setInvoiceNumberError] = useState(false);
    const [invoiceDate, setInvoiceDate] = useState("");
    const [uploadInvoice, setUploadInvoice] = useState({});
    const [uploadInvoiceError, setuploadInvoiceError] = useState(false);
    const [supplierInvoiceTotal, setSupplierInvoiceTotal] = useState("");
    const [poTotal, setPoTotal] = useState("");
    const [poTotalError, setpoTotalError] = useState(false);
    const [uploadDisabled, setUploadDisabled] = useState(false);
    const [OmsUploadList, setOmsUploadList] = useState([]);
    const [bulkItemIds, setBulkItemIds] = useState([]);
    const [fId, setFId] = useState(null);
    const [phoneErrorMsg, setPhoneErrorMsg] = useState('');
    const [actionCTA, setaAtionCTA] = useState(props?.route?.params?.actionCTA)

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
                doc: uploadInvoice
            },
            isImp: true,
            errorState: uploadInvoiceError,
            errorText: "Please upload Invoice",
            placeholder: 'Tap to Upload',
        },

    });

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
            isImp: false,
            keyboardType: 'number-pad',
            label: 'Supplier Invoice Total',
            placeholder: 'Supplier Invoice Total',
            errorMessage: 'Enter valid supplier invoice total ',
            value: supplierInvoiceTotal,
            onChangeText: text => setSupplierInvoiceTotal(text),
            component: FloatingLabelInputField,
        },
        invoiceDate: {
            title: 'Invoice Date',
            isImp: true,
            label: 'Invoice Date',
            placeholder: 'Invoice Date',
            errorMessage: 'Enter valid Invoice date',
            value: invoiceDate,
            onChange: invoiceDate => setInvoiceDate(invoiceDate),
            component: CustomeDatePicker,
        },
        poTotal: {
            title: 'Po Total',
            disabled: true,
            isImp: true,
            label: 'Po Total',
            keyboardType: 'number-pad',
            placeholder: 'Po Total',
            errorMessage: 'Enter valid po total amount',
            showError: poTotalError,
            value: poTotal,
            onBlur: () => onPoTotalBlur(),
            onChangeText: text => setPoTotal(text),
            component: FloatingLabelInputField,
        },
    });



    let EmsOmsFlag = actionCTA

    useEffect(() => {
        if (EmsOmsFlag.includes("MAP_PO_TO_INVOICE")) {
            fetchInvoiceOMSDetails()
        }
    }, []);

    const onInvoiceNumberBlur = () => {
        if (invoiceNumber && invoiceNumber.length) {
            setInvoiceNumberError(false);
        } else {
            setInvoiceNumberError(true);
        }
    };

    const onPoTotalBlur = () => {
        if (poTotal && poTotal.length) {
            setpoTotalError(false);
        } else {
            setpoTotalError(true);
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
            const res = await DocumentPicker.pick({
            });
            console.log('doc', res[0]);
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
        console.log("IFIDDD", fId);

        switch (fId) {
            case 'uploadInvoice':
                setUploadInvoice(data);
                break;
            default:
                break;
        }
    };

    const onRemove = id => {
        switch (id) {
            case 'uploadInvoice':
                setUploadInvoice({});
                break;
            case 'uploadEwayBill':
                setUploadEwayBill({});
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
                onRemove={onRemove}
                id={id}
                fId={fId}
                fileUpload={2}
                errorState={errorState}
                errorText={errorText}
                onPress={() => (onPress(id))}
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
            console.log("data===>", data);
            if (data.success) {
                setOmsUploadList(data?.data?.records);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);

        }
    };

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

    const renderItem = ({ item, index }) => {
        let list = Object.values(item)?.[0]
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

    const onsubmit = async () => {
        try {
            let token = `Bearer ${await AsyncStorage.getItem('token')}`;
            const url = `${BASE_URL}api/order/oms/mapInvoice`;
            const response = await RNFetchBlob.fetch(
                'POST',
                url,
                {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `${token}`,
                },

                [{
                    name: 'invoiceNumber',
                    data: invoiceNumber,
                },
                {
                    name: 'supplierId',
                    data: await AsyncStorage.getItem('userId'),
                },
                {
                    name: 'itemLists',
                    data: 927212,
                },
                {
                    name: 'invoiceTotal',
                    data: 1000,
                },
                {
                    name: 'invoiceDate',
                    data: invoiceDate,
                },
                {
                    name: 'file',
                    filename: uploadInvoice.name,
                    type: uploadInvoice.type,
                    data: RNFetchBlob.wrap(uploadInvoice.uri),
                }]
            );
            const res = await response.json();
            console.log("Response====>", res);
            if (res.success) {
                Toast.show({
                    type: 'success',
                    text2: res.message,
                    visibilityTime: 2000,
                    autoHide: true,
                });
                props.navigation.goBack();
            } else if (res.success == false) {
                Toast.show({
                    type: 'success',
                    text2: res.message,
                    visibilityTime: 2000,
                    autoHide: true,
                });

            }
        }
        catch (err) {
            console.log("Error", err);
            setLoading(false);
        }

    };


    return (
        <View style={{ flex: 1 }}>
            <Header
                showBack
                navigation={props.navigation}
                showText={'Upload OMS Invoice'}
                rightIconName={'business-details'} />

            <ScrollView style={styles.ContainerCss}>
                <FlatList
                    data={OmsUploadList}
                    renderItem={renderItem}
                    ListEmptyComponent={renderListEmptyComponent}
                    keyExtractor={(item, index) => `${index}-item`}
                    onEndReachedThreshold={0.9}
                    showsVerticalScrollIndicator={false}
                />
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
                    // loading={loading}
                    // onPress={onContinue}
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