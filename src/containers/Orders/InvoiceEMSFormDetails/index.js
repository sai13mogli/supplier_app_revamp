import React, { useState, useEffect } from "react";
import { OrderedMap } from 'immutable';
import { NavigationActions, StackActions } from 'react-navigation';
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

const InvoiceEMSFormDetailScreen = props => {
    const [loading, setLoading] = useState(false);
    const [warehouseId, setwarehouseId] = useState(props?.route?.params?.warehouseId)
    const [orderRef, setOrderRef] = useState(props?.route?.params?.orderRef);
    const [itemRef, setitemRef] = useState(props?.route?.params?.itemRef)
    const [quantity, setQuantity] = useState(props?.route?.params?.quantity);
    const [HSN, setHSN] = useState(props?.route?.params?.hsn);
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
    const [hsn, setHsn] = useState("");
    const [hsnError, sethsnError] = useState(false);
    const [tax, setTax] = useState("");
    const [taxError, setTaxError] = useState(false);
    const [total, setTotal] = useState("");
    const [totalError, setTotalError] = useState(false);
    const [commentError, setCommentError] = useState(false);
    const [addComment, setAddComment] = useState("");
    const [loadingBaseAmount, setloadingBaseAmount] = useState("");
    const [loadingHsn, setloadingHsn] = useState("");
    const [loadingTax, setloadingTax] = useState("");
    const [loadingTotal, setloadingTotal] = useState("");
    const [misBaseAmount, setMisBaseAmount] = useState("");
    const [misHsn, setMisHsn] = useState("");
    const [misTax, setMisTax] = useState("");
    const [misTotal, setMisTotal] = useState("");
    const [fId, setFId] = useState(null);
    const [phoneErrorMsg, setPhoneErrorMsg] = useState('');


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
            value: invoiceDate,
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
            // onBlur: () => onContactNameBlur(),
            onChangeText: text => setBaseAmount(text),
            component: FloatingLabelInputField,
        },
        hsn: {
            title: 'HSN',
            isImp: false,
            label: 'HSN',
            placeholder: 'HSN',
            errorMessage: 'Enter valid hsn',
            showError: hsnError,
            value: hsn,
            onChangeText: text => setHsn(text),
            component: FloatingLabelInputField,
            // onBlur: () => onGstinBlur(),
        },
        tax: {
            title: 'Tax%',
            isImp: false,
            label: 'Tax%',
            placeholder: 'Tax',
            errorMessage: 'Enter valid tax',
            showError: taxError,
            value: tax,
            onChangeText: text => setTax(text),
            component: FloatingLabelInputField,
            // onBlur: () => onGstinBlur(),
        },
        total: {
            title: 'Total',
            isImp: false,
            label: 'Total',
            keyboardType: 'number-pad',
            placeholder: '',
            errorMessage: 'Enter valid total',
            showError: totalError,
            value: total,
            onChangeText: text => setTotal(text),
            component: FloatingLabelInputField,
            // onBlur: () => onGstinBlur(),
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
            // onBlur: () => onGstinBlur(),
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
            // onBlur: () => onContactNameBlur(),
            onChangeText: text => setloadingBaseAmount(text),
            component: FloatingLabelInputField,
        },
        loadingHsn: {
            title: 'HSN',
            isImp: false,
            label: 'HSN',
            placeholder: 'HSN',
            errorMessage: 'Enter valid hsn',
            showError: hsnError,
            value: loadingHsn,
            onChangeText: text => setloadingHsn(text),
            component: FloatingLabelInputField,
            // onBlur: () => onGstinBlur(),
        },
        loadingTax: {
            title: 'Tax%',
            isImp: false,
            label: 'Tax%',
            placeholder: 'Tax',
            errorMessage: 'Enter valid tax',
            showError: taxError,
            value: loadingTax,
            onChangeText: text => setloadingTax(text),
            component: FloatingLabelInputField,
            // onBlur: () => onGstinBlur(),
        },
        loadingTotal: {
            title: 'Total',
            isImp: false,
            label: 'Total',
            placeholder: 'Total',
            errorMessage: 'Enter valid total',
            keyboardType: 'number-pad',
            showError: totalError,
            value: loadingTotal,
            onChangeText: text => setloadingTotal(text),
            component: FloatingLabelInputField,
            // onBlur: () => onGstinBlur(),
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
            // onBlur: () => onContactNameBlur(),
            onChangeText: text => setMisBaseAmount(text),
            component: FloatingLabelInputField,
        },
        misHsn: {
            title: 'HSN',
            isImp: false,
            label: 'HSN',
            placeholder: 'HSN',
            errorMessage: 'Enter valid hsn',
            showError: hsnError,
            value: misHsn,
            onChangeText: text => setMisHsn(text),
            component: FloatingLabelInputField,
            // onBlur: () => onGstinBlur(),
        },
        misTax: {
            title: 'Tax%',
            isImp: false,
            label: 'Tax%',
            placeholder: 'Tax',
            errorMessage: 'Enter valid tax',
            showError: taxError,
            value: misTax,
            onChangeText: text => setMisTax(text),
            component: FloatingLabelInputField,
            // onBlur: () => onGstinBlur(),
        },
        misTotal: {
            title: 'Total',
            isImp: false,
            label: 'Total',
            keyboardType: 'number-pad',
            placeholder: 'Total',
            errorMessage: 'Enter valid total',
            showError: totalError,
            value: misTotal,
            onChangeText: text => setMisTotal(text),
            component: FloatingLabelInputField,
            // onBlur: () => onGstinBlur(),
        },
    });

    const onInvoiceNumberBlur = () => {
        if (invoiceNumber && invoiceNumber.length) {
            setInvoiceNumberError(false);
        } else {
            setInvoiceNumberError(true);
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

    //upload from fileExp
    const uploadFromFileExp = async () => {
        //Opening Document Picker for selection of one file
        try {
            const res = await DocumentPicker.pick({
                // type: [DocumentPicker],
            });
            console.log('doc', res[0]);
            setFormState(res[0]);
            console.log("kya set ho raha hai", res);
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
        try {
            let token = `Bearer ${await AsyncStorage.getItem('token')}`;
            const url = `${BASE_URL}api/order/mapDropshipInvoice`;
            // setLoading(true);

            let payload =
            {
                supplierId: await AsyncStorage.getItem('userId'),
                invoiceNumber: invoiceNumber,
                invoiceDate: invoiceDate,
                source: 0,
                ewayDate: ewayDate,
                ewayNumber: ewayBillNumber,
                warehouseId: warehouseId,
                orderRef: orderRef,
                itemLists: [{ quantity: quantity, hsnPercentage: 18, itemRef: itemRef, hsn: HSN }],
                igstApplicable: true,
                countryCode: 356,
                "frieght": { charge: "", hsn: "", tax: "", totalAmount: null, remarks: "", countryCode: 356, igst: null, cgst: 0, sgst: 0, vatAmount: 0 },
                "loading": { charge: "", hsn: "", tax: "", totalAmount: null, countryCode: 356, igst: null, cgst: 0, sgst: 0, vatAmount: 0 },
                "misc": { charge: "", hsn: "", tax: "", totalAmount: null, countryCode: 356, igst: null, cgst: 0, sgst: 0, vatAmount: 0 },
                invoiceTotal: 580
            }

            // {
            //     supplierId: await AsyncStorage.getItem('userId'),
            //     invoiceNumber,
            //     invoiceDate,
            //     invoiceTotal: invoiceAmount,
            //     source: 0,
            //     ewayDate,
            //     warehouseId,
            //     orderRef,
            //     "itemLists": [{
            //         quantity,
            //         hsnPercentage: 18,
            //         itemRef,
            //         hsn: HSN
            //     }],
            //     igstApplicable: true,
            //     "frieght": {
            //         hsn,
            //         charge: "",
            //         tax,
            //         totalAmount: invoiceAmount,
            //         countryCode: 356,
            //         remarks: "",
            //         igst: null,
            //         cgst: 0,
            //         sgst: 0,
            //         vatAmount: 0
            //     },
            //     "loading": {
            //         hsn,
            //         charge: "",
            //         tax,
            //         totalAmount: null,
            //         countryCode: 356,
            //         remarks: "",
            //         igst: null,
            //         cgst: 0,
            //         sgst: 0,
            //         vatAmount: 0
            //     },
            //     "misc": {
            //         hsn,
            //         charge: "",
            //         tax,
            //         totalAmount: null,
            //         countryCode: 356,
            //         remarks: "",
            //         igst: null,
            //         cgst: 0,
            //         sgst: 0,
            //         vatAmount: 0
            //     }

            // }
            console.log("Payload====>", payload);

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
            console.log("Respose====>", res, payload);
            if (res.success) {
                Toast.show({
                    type: 'success',
                    text2: res.message,
                    visibilityTime: 2000,
                    autoHide: true,
                });
                props.navigation.goBack();
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
            // console.log("Error", err);
            setLoading(false);
        }
    };


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
                        loading={loading}
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

