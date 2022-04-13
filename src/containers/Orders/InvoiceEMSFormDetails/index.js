import React, { useState, useEffect } from "react";
import { OrderedMap } from 'immutable';
import { StackActions, NavigationActions } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
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
import { BASE_URL } from '../../../redux/constants';
import Toast from 'react-native-toast-message';
import moment from 'moment';

const InvoiceEMSFormDetailScreen = props => {
    const [loading, setLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState(props?.route?.params?.totalAmount);
    const [warehouseId, setwarehouseId] = useState(props?.route?.params?.warehouseId)
    const [orderRef, setOrderRef] = useState(props?.route?.params?.orderRef);
    const [itemRef, setitemRef] = useState(props?.route?.params?.itemRef)
    const [quantity, setQuantity] = useState(props?.route?.params?.quantity);
    const [hsn, setHsn] = useState(props?.route?.params?.hsn);
    const [invoiceNumber, setInvoiceNumber] = useState();
    const [invoiceNumberError, setInvoiceNumberError] = useState(false);
    const [invoiceDate, setInvoiceDate] = useState("");
    const [invoiceDateError, setInvoiceDateError] = useState(false);
    const [invoiceAmount, setInvoiceAmount] = useState("");
    const [invoiceAmountError, setInvoiceAmountError] = useState(false);
    const [uploadInvoice, setUploadInvoice] = useState({});
    const [uploadInvoiceError, setuploadInvoiceError] = useState(false);
    const [ewayBillNumber, setEwayBillNumber] = useState("");
    const [ewayBillNumberError, setEwayBillNumberError] = useState(false);
    const [ewayDate, setEwayDate] = useState("");
    const [uploadEwayBill, setUploadEwayBill] = useState({});
    const [uploadEwayBillError, setUploadEwayBillError] = useState(false);
    const [uploadDisabled, setUploadDisabled] = useState(false);
    const [baseAmount, setBaseAmount] = useState("");
    const [baseAmountError, setBaseAmountError] = useState(false);
    const [hsnError, sethsnError] = useState(false);
    const [taxPercentage, setTaxPercentage] = useState(props?.route?.params?.taxPercentage);
    const [taxError, setTaxError] = useState(false);
    const [total, setTotal] = useState("");
    const [commentError, setCommentError] = useState(false);
    const [addComment, setAddComment] = useState("");
    const [loadingBaseAmount, setloadingBaseAmount] = useState("");
    const [loadingTotal, setloadingTotal] = useState("");
    const [misBaseAmount, setMisBaseAmount] = useState("");
    const [misTotal, setMisTotal] = useState("");
    const [fId, setFId] = useState(null);


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
            onBlur: () => onUploadInvoiceBlur(),
            errorState: uploadInvoiceError,
            errorText: "Please upload Invoice",
            placeholder: 'Tap to Upload',
        },
        upload_eway_bill: {
            id: 'uploadEwayBill',
            title: 'Upload E-way Bill',
            state: uploadEwayBill,
            value: uploadEwayBill.name,
            errorState: uploadEwayBillError,
            disabled: false,
            documents: {
                name: uploadEwayBill && uploadEwayBill.name,
                doc: uploadEwayBill
            },
            isImp: false,
            errorState: uploadEwayBillError,
            onBlur: () => onUploadEwayBlur(),
            errorText: "Please upload E-way Bill",
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
            label: 'Invoice Date',
            placeholder: 'Invoice Date',
            errorMessage: 'Enter valid Invoice date',
            showError: invoiceDateError,
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
            isImp: true,
            label: 'E-way Bill Number',
            placeholder: 'E-way Bill Number',
            errorMessage: 'Enter valid e-way Bill number *(12) digit',
            value: ewayBillNumber,
            showError: ewayBillNumberError,
            onBlur: () => onEwayBillNumberBlur(),
            onChangeText: text => setEwayBillNumber(text),
            component: FloatingLabelInputField,
        },
        ewayDate: {
            title: 'E-way Date',
            isImp: false,
            label: 'E-way Date',
            placeholder: 'E-way Date',
            errorMessage: 'Enter valid e-way date',
            value: ewayDate,
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
            onChangeText: (text) => calculateTotalFreight(text),
            component: FloatingLabelInputField,
        },
        hsn: {
            title: 'HSN',
            isImp: false,
            label: 'HSN',
            placeholder: 'HSN',
            errorMessage: 'Enter valid hsn',
            showError: hsnError,
            value: baseAmount ? hsn : "",
            onChangeText: text => baseAmount ? setHsn(text) : "",
            component: FloatingLabelInputField,
        },
        taxPercentage: {
            title: 'Tax%',
            isImp: false,
            label: 'Tax%',
            placeholder: 'Tax',
            errorMessage: 'Enter valid tax',
            showError: taxError,
            value: baseAmount ? String(taxPercentage) : "",
            onChangeText: text => setTaxPercentage(text),
            component: FloatingLabelInputField,
        },
        total: {
            title: 'Total',
            isImp: false,
            label: 'Total',
            keyboardType: 'number-pad',
            placeholder: 'Total',
            errorMessage: 'Enter valid total',
            value: total,
            onChangeText: text => setTotal(text),
            component: FloatingLabelInputField,
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
            onChangeText: text => calculateLoadingCharges(text),
            component: FloatingLabelInputField,
        },
        loadingHsn: {
            title: 'HSN',
            isImp: false,
            label: 'HSN',
            placeholder: 'HSN',
            errorMessage: 'Enter valid hsn',
            showError: hsnError,
            value: loadingBaseAmount ? hsn : "",
            onChangeText: text => loadingBaseAmount ? setHsn(text) : "",
            component: FloatingLabelInputField,
        },
        loadingTax: {
            title: 'Tax%',
            isImp: false,
            label: 'Tax%',
            placeholder: 'Tax',
            errorMessage: 'Enter valid tax',
            showError: taxError,
            value: loadingBaseAmount ? String(taxPercentage) : "",
            onChangeText: text => setTaxPercentage(text),
            component: FloatingLabelInputField,
        },
        loadingTotal: {
            title: 'Total',
            isImp: false,
            label: 'Total',
            placeholder: 'Total',
            errorMessage: 'Enter valid total',
            keyboardType: 'number-pad',
            value: loadingTotal,
            onChangeText: text => setloadingTotal(text),
            component: FloatingLabelInputField,
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
            onChangeText: text => calculateMiscCharges(text),
            component: FloatingLabelInputField,
        },
        misHsn: {
            title: 'HSN',
            isImp: false,
            label: 'HSN',
            placeholder: 'HSN',
            errorMessage: 'Enter valid hsn',
            showError: hsnError,
            value: misBaseAmount ? hsn : "",
            onChangeText: text => misBaseAmount ? setHsn(text) : "",
            component: FloatingLabelInputField,
        },
        misTax: {
            title: 'Tax%',
            isImp: false,
            label: 'Tax%',
            placeholder: 'Tax',
            errorMessage: 'Enter valid tax',
            showError: taxError,
            value: misBaseAmount ? String(taxPercentage) : "",
            onChangeText: text => setTaxPercentage(text),
            component: FloatingLabelInputField,
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

    const calculateTotalFreight = (text) => {
        let percentage = ((text / 100) * String(taxPercentage))
        setBaseAmount(text)
        let total = ((percentage) + (text))
        setTotal(total)
    }

    const calculateLoadingCharges = (text) => {
        setloadingBaseAmount(text)
        let percentage = ((text / 100) * taxPercentage)
        let total = ((percentage) + (text))
        setloadingTotal(total)
    }

    const calculateMiscCharges = (text) => {
        setMisBaseAmount(text)
        let percentage = ((text / 100) * taxPercentage)
        let total = ((percentage) + (text))
        setMisTotal(total)
    }

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

    const onEwayBillNumberBlur = () => {
        if (ewayBillNumber && ewayBillNumber.length && ewayBillNumber.length == 12) {
            setEwayBillNumberError(false);
        } else {
            setEwayBillNumberError(true);
        }
    };

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
            case 'uploadEwayBill':
                setUploadEwayBill(data);

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

    const onsubmit = async () => {

        if (
            invoiceNumber &&
            invoiceNumber.length &&
            invoiceDate &&
            invoiceAmount &&
            invoiceAmount.length &&
            ewayBillNumber &&
            ewayBillNumber.length &&
            ewayDate && uploadInvoice
            && uploadEwayBill
        ) {
            try {
                let token = `Bearer ${await AsyncStorage.getItem('token')}`;
                const url = `${BASE_URL}api/order/mapDropshipInvoice`;

                let totalInvoiceAmount = (invoiceAmount + (totalAmount + 7) || invoiceAmount + (totalAmount - 7))
                let payload =
                {
                    supplierId: await AsyncStorage.getItem('userId'),
                    invoiceNumber: invoiceNumber,
                    invoiceDate: moment(invoiceDate).format('YYYY-MM-DD'),
                    source: 0,
                    ewayDate: moment(ewayDate).format('YYYY-MM-DD'),
                    ewayNumber: ewayBillNumber,
                    warehouseId: warehouseId,
                    orderRef: orderRef,
                    itemLists: [{ quantity: quantity, hsnPercentage: String(taxPercentage), itemRef: itemRef, hsn: hsn }],
                    igstApplicable: true,
                    countryCode: 356,
                    "frieght": { charge: "", hsn: "", tax: "", totalAmount: null, remarks: "", countryCode: 356, igst: null, cgst: 0, sgst: 0, vatAmount: 0 },
                    "loading": { charge: "", hsn: "", tax: "", totalAmount: null, countryCode: 356, igst: null, cgst: 0, sgst: 0, vatAmount: 0 },
                    "misc": { charge: "", hsn: "", tax: "", totalAmount: null, countryCode: 356, igst: null, cgst: 0, sgst: 0, vatAmount: 0 },
                    invoiceTotal: totalInvoiceAmount
                }

                const response = await RNFetchBlob.fetch(
                    'POST',
                    url,
                    {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `${token}`,
                    },
                    [
                        {
                            name: "dropshipInvoiceRequest",
                            data: JSON.stringify(payload),
                            type: 'application/json',
                        },
                        {
                            name: 'invoiceFile',
                            filename: uploadInvoice.name,
                            type: uploadInvoice.type,
                            data: RNFetchBlob.wrap(uploadInvoice.uri),
                        },
                        {
                            name: 'ewayBillFile',
                            filename: uploadEwayBill.name,
                            type: uploadEwayBill.type,
                            data: RNFetchBlob.wrap(uploadEwayBill.uri),
                        },
                    ],
                );
                const res = await response.json();
                if (res.success) {
                    Toast.show({
                        type: 'success',
                        text2: res.message,
                        visibilityTime: 2000,
                        autoHide: true,
                    });
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomeApp' }],
                    });

                } else if (res.success == false) {
                    setLoading(false);
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
        } else {
            onInvoiceNumberBlur();
            onEwayBillNumberBlur();
            onInvoiceAmountBlur();
        }
    };

    const onCancel = () => {
        props.navigation.goBack();

    }


    return (
        <View style={{
            flex: 1,
        }}>
            <Header
                showBack
                navigation={props.navigation}
                showText={'Upload Invoice'}
                rightIconName={'business-details'}></Header>
            <ScrollView style={styles.ContainerCss}>

                {FORM_FIELDS.map((field, fieldKey) => (
                    <View>
                        {
                            fieldKey == "baseAmount" ?
                                <Text style={styles.middleTxt}>Freight Charges (if Applicable)</Text> :
                                fieldKey == "loadingBaseAmount" ?
                                    <Text style={styles.middleTxt}>Loading Charges (if Applicable)</Text> :
                                    fieldKey == "misBaseAmount" ?
                                        <Text style={styles.middleTxt}>Misc. Charges (if Applicable)</Text> : null
                        }


                        <field.component
                            {...field}
                            key={fieldKey}
                            disabled={field.disabled}
                        />
                    </View>
                )).toList()}

                {
                    Documents.map(_ => renderInputText(_))
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
    container: {
    },
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
        marginBottom: Dimension.margin5
    },

    bottombtnWrap: {
        padding: Dimension.padding15,
        borderTopColor: colors.grayShade2,
        borderTopWidth: 1,
        backgroundColor: colors.WhiteColor
    },


    ContainerCss: {
        backgroundColor: colors.WhiteColor,
        paddingHorizontal: Dimension.padding5,
        paddingVertical: Dimension.padding20
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
        borderBottomColor: colors.grayShade9


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

