import React, {useState, useEffect, createRef} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {OrderedMap, setIn} from 'immutable';
import CustomeIcon from '../../../component/common/CustomeIcon';
import FileUpload from '../../../component/common/FileUpload';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import styles from '../style';
import {BASE_URL} from '../../../redux/constants/index';
import colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import Checkbox from '../../../component/common/Checkbox/index';
import CustomButton from '../../../component/common/Button';

const DocumentsScreen = props => {
  const [pancard, setPancard] = useState({
    title: '',
    value: '',
    loading: false,
    showDoc: false,
    closeDoc: false,
  });
  const [pancardError, setPancardError] = useState(false);
  const [gstin, setGstIn] = useState({
    title: '',
    value: '',
    loading: false,
    showDoc: false,
    closeDoc: false,
  });
  const [gstinError, setGstInError] = useState(false);
  const [cheque, setCheque] = useState({
    title: '',
    value: '',
    loading: false,
    showDoc: false,
    closeDoc: false,
  });
  const [chequeError, setChequeError] = useState(false);
  const [bankStatement, setBankStatement] = useState({
    title: '',
    value: '',
    loading: false,
    showDoc: false,
    closeDoc: false,
  });
  const [bankStatementError, setBankStatementError] = useState(false);
  const [corporateCertificate, setCorporateCertificate] = useState({
    title: '',
    value: '',
    loading: false,
    showDoc: false,
    closeDoc: false,
  });
  const [corpCertificateError, setCorpCertificateError] = useState(false);
  const [addressProof, setAddressProof] = useState({
    title: '',
    value: '',
    loading: false,
    showDoc: false,
    closeDoc: false,
  });
  const [addressProofError, setAddressProofError] = useState(false);
  const [pickupAddressProof, setPickupAddressProof] = useState({
    title: '',
    value: '',
    loading: false,
    showDoc: false,
    closeDoc: false,
  });
  const [pickupAddressProofError, setpickupAddressProofError] = useState(false);
  const [signature, setSignature] = useState({
    title: '',
    value: '',
    loading: false,
    showDoc: false,
    closeDoc: false,
  });
  const [signatureError, setSignatureError] = useState(false);
  const [fId, setFId] = useState(null);
  // const [loader, setLoader] = useState(false);
  // const [init, setInit] = useState(false);
  // const [eye, setEye] = useState(false);
  // const actionSheetRef = createRef();

  const Documents = new OrderedMap({
    pan_card: {
      id: 'pancard',
      title: 'ID Proof(PAN Card)',
      state: pancard,
      errorState: pancardError,
      disabled: false,
      documents: {
        title: pancard && pancard.title,
        doc: pancard && pancard.value,
      },
      isImp: true,
      showDoc: pancard && pancard.showDoc,
      loading: pancard && pancard.loading,
      closeDoc: pancard && pancard.closeDoc,
      errorText: 'Kindly upload your pan card',
      placeholder: 'Tap to Upload',
    },
    gst_doc: {
      id: 'gst',
      title: 'GSTIN Document',
      state: gstin,
      errorState: gstinError,
      disabled: false,
      documents: {
        title: gstin && gstin.title,
        doc: gstin && gstin.value,
      },
      isImp: true,
      showDoc: gstin && gstin.showDoc,
      loading: gstin && gstin.loading,
      closeDoc: gstin && gstin.closeDoc,
      errorText: 'Kindly upload your GSTIN Document',
      placeholder: 'Tap to Upload',
    },
    cancelled_cheque: {
      id: 'cheque',
      title: 'Cancelled Cheque*',
      state: cheque,
      errorState: chequeError,
      disabled: false,
      documents: {
        title: cheque && cheque.title,
        doc: cheque && cheque.value,
      },
      isImp: true,
      showDoc: cheque && cheque.showDoc,
      loading: cheque && cheque.loading,
      closeDoc: cheque && cheque.closeDoc,
      errorText: 'Kindly upload your Cancelled Cheque',
      placeholder: 'Tap to Upload',
    },
    bank_statement: {
      id: 'statement',
      title: 'Bank Statement Copy',
      state: bankStatement,
      errorState: bankStatementError,
      disabled: false,
      documents: {
        title: bankStatement && bankStatement.title,
        doc: bankStatement && bankStatement.value,
      },
      isImp: false,
      showDoc: bankStatement && bankStatement.showDoc,
      loading: bankStatement && bankStatement.loading,
      closeDoc: bankStatement && bankStatement.closeDoc,
      errorText: 'Kindly upload your Bank Statement Copy',
      placeholder: 'Tap to Upload',
    },
    coroporate_certificate: {
      id: 'cc',
      title: 'Certificate of Corporation*',
      state: corporateCertificate,
      errorState: corpCertificateError,
      disabled: false,
      documents: {
        title: corporateCertificate && corporateCertificate.title,
        doc: corporateCertificate && corporateCertificate.value,
      },
      isImp: true,
      showDoc: corporateCertificate && corporateCertificate.showDoc,
      loading: corporateCertificate && corporateCertificate.loading,
      closeDoc: corporateCertificate && corporateCertificate.closeDoc,
      errorText: 'Kindly upload your Certificate of Corporation',
      placeholder: 'Tap to Upload',
    },
    business_address: {
      id: 'bAdd',
      title: 'Business Address Proof*',
      state: addressProof,
      errorState: addressProofError,
      disabled: false,
      documents: {
        title: addressProof && addressProof.title,
        doc: addressProof && addressProof.value,
      },
      isImp: false,
      showDoc: addressProof && addressProof.showDoc,
      loading: addressProof && addressProof.loading,
      closeDoc: addressProof && addressProof.closeDoc,
      errorText: 'Kindly upload your Business Address Proof',
      placeholder: 'Tap to Upload',
    },
    pickup_address: {
      id: 'pAdd',
      title: 'Pickup Address Proof*',
      state: pickupAddressProof,
      errorState: pickupAddressProofError,
      disabled: false,
      documents: {
        title: pickupAddressProof && pickupAddressProof.title,
        doc: pickupAddressProof && pickupAddressProof.value,
      },
      isImp: false,
      showDoc: pickupAddressProof && pickupAddressProof.showDoc,
      loading: pickupAddressProof && pickupAddressProof.loading,
      closeDoc: pickupAddressProof && pickupAddressProof.closeDoc,
      errorText: 'Kindly upload your Pickup Address Proof',
      placeholder: 'Tap to Upload',
    },
    sign: {
      id: 'sign',
      title: 'Signature*',
      state: signature,
      errorState: signatureError,
      disabled: false,
      documents: {
        title: signature && signature.title,
        doc: signature && signature.value,
      },
      isImp: true,
      showDoc: signature && signature.showDoc,
      loading: signature && signature.loading,
      closeDoc: signature && signature.closeDoc,
      errorText: 'Kindly upload your Signature',
      placeholder: 'Tap to Upload',
    },
  });

  const noteArr = [
    {id: '0', note: 'Each document file should not exceed more than 2MB'},
    {
      id: '1',
      note: 'Please ensure the Image of a signature is on a white background',
    },
  ];

  useEffect(() => {
    console.log('panCard', pancard);
    if (pancard && pancard.key == 'panCard' && pancard.loading) {
      uploadDocument(pancard);
    }
  }, [pancard]);
  useEffect(() => {
    if (gstin && gstin.key == 'gstin' && gstin.loading) {
      uploadDocument(gstin);
    }
  }, [gstin]);
  useEffect(() => {
    if (cheque && cheque.key == 'cancelledCheque' && cheque.loading) {
      uploadDocument(cheque);
    }
  }, [cheque]);
  useEffect(() => {
    if (
      bankStatement &&
      bankStatement.key == 'bankStatement' &&
      bankStatement.loading
    ) {
      uploadDocument(bankStatement);
    }
  }, [bankStatement]);
  useEffect(() => {
    if (
      corporateCertificate &&
      corporateCertificate.key == 'corporationCertificate' &&
      corporateCertificate.loading
    ) {
      uploadDocument(corporateCertificate);
    }
  }, [corporateCertificate]);
  useEffect(() => {
    if (
      addressProof &&
      addressProof.key == 'businessAddress' &&
      addressProof.loading
    ) {
      uploadDocument(addressProof);
    }
  }, [addressProof]);
  useEffect(() => {
    if (
      pickupAddressProof &&
      pickupAddressProof.key == 'pickupAddress' &&
      pickupAddressProof.loading
    ) {
      uploadDocument(pickupAddressProof);
    }
  }, [pickupAddressProof]);
  useEffect(() => {
    if (signature && signature.key == 'signature' && signature.loading) {
      uploadDocument(signature);
    }
  }, [signature]);

  const uploadDocument = async data => {
    console.log(data, 'data');
    let res = await uploadDocumentService(data);
    console.log(res);
    setDocument(res);
  };

  const setDocument = ({fileData, resp}) => {
    switch (resp.data && resp.data.key) {
      case 'panCard':
        setPancard({
          ...pancard,
          title: fileData && fileData.name,
          value: resp.data && resp.data.fileKey,
          loading: false,
          showDoc: true,
          closeDoc: true,
        });

        break;
      case 'gstin':
        setGstIn({
          ...gstin,
          title: fileData && fileData.name,
          value: resp.data && resp.data.fileKey,
          loading: false,
          showDoc: true,
          closeDoc: true,
        });
        break;
      case 'cancelledCheque':
        setCheque({
          ...cheque,
          title: fileData && fileData.name,
          value: resp.data && resp.data.fileKey,
          loading: false,
          showDoc: true,
          closeDoc: true,
        });
        break;
      case 'bankStatement':
        setBankStatement({
          ...bankStatement,
          title: fileData && fileData.name,
          value: resp.data && resp.data.fileKey,
          loading: false,
          showDoc: true,
          closeDoc: true,
        });
        break;
      case 'corporationCertificate':
        setCorporateCertificate({
          ...corporateCertificate,
          title: fileData && fileData.name,
          value: resp.data && resp.data.fileKey,
          loading: false,
          showDoc: true,
          closeDoc: true,
        });
        break;
      case 'businessAddress':
        setAddressProof({
          ...addressProof,
          title: fileData && fileData.name,
          value: resp.data && resp.data.fileKey,
          loading: false,
          showDoc: true,
          closeDoc: true,
        });
        break;
      case 'pickupAddress':
        setPickupAddressProof({
          ...addressProof,
          title: fileData && fileData.name,
          value: resp.data && resp.data.fileKey,
          loading: false,
          showDoc: true,
          closeDoc: true,
        });
        break;
      case 'signature':
        setSignature({
          ...signature,
          title: fileData && fileData.name,
          value: resp.data && resp.data.fileKey,
          loading: false,
          showDoc: true,
          closeDoc: true,
        });
        break;
      default:
        break;
    }
  };

  //upload document logic
  const uploadDocumentService = async data => {
    // setLoader(true);
    const url = `${BASE_URL}profile/file/upload`;
    const response = await RNFetchBlob.fetch(
      'POST',
      url,
      {
        'Content-Type': 'multipart/form-data',
        Authorization:
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NjY2MDkiLCJyb2xlIjoiU1VQUExJRVIiLCJpYXQiOjE2NDQzMDM0NzksImV4cCI6MTY0NDM4OTg3OX0.sizpT3AbsSvaUaj_0sNSbDAbI08kwBnEU85CCZSgRzK9zeaqyz6fBUyxLqWw4gFqPYRTkSk7QTZsQ496HKD_sQ',
      },
      [
        {
          name: 'key',
          data: data.key,
        },
        {
          name: 'code',
          data: '',
        },
        {
          name: 'file',
          filename: data.name,
          type: data.type,
          data: RNFetchBlob.wrap(data.uri),
        },
      ],
    );
    const res = await response.json();
    // setLoader(false);
    return {
      resp: res,
      fileData: data,
    };
  };

  //openSelection
  const openSelection = async selection => {
    switch (selection) {
      case 'Camera':
        await SheetManager.hide('action_sheet');
        uploadFromCamera(false);
        break;

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
      console.log(res[0].uri);

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

  // set Id of a particular doc
  const setFormState = data => {
    switch (fId) {
      case 'pancard':
        setPancard({
          ...pancard,
          ...data,
          loading: true,
          key: 'panCard',
          closeDoc: true,
        });
        break;
      case 'gst':
        setGstIn({...gstin, ...data, loading: true, key: 'gstin'});
        break;
      case 'cheque':
        setCheque({...cheque, ...data, loading: true, key: 'cancelledCheque'});
        break;
      case 'statement':
        setBankStatement({
          ...bankStatement,
          ...data,
          loading: true,
          key: 'bankStatement',
        });
        break;
      case 'cc':
        setCorporateCertificate({
          ...corporateCertificate,
          ...data,
          loading: true,
          key: 'corporationCertificate',
        });
        break;
      case 'bAdd':
        setAddressProof({
          ...addressProof,
          ...data,
          loading: true,
          key: 'businessAddress',
        });
        break;
      case 'pAdd':
        setPickupAddressProof({
          ...pickupAddressProof,
          ...data,
          loading: true,
          key: 'pickupAddress',
        });
        break;
      case 'sign':
        setSignature({...signature, ...data, loading: true, key: 'signature'});
        break;
      default:
        break;
    }
  };

  const onRemove = id => {
    console.log(id, 'id hai bc');
    switch (id) {
      case 'pancard':
        setPancard({
          ...pancard,
          title: '',
          value: '',
          name: '',
          type: '',
          uri: '',
          size: 0,
          showDoc: false,
          closeDoc: false,
        });
        break;
      case 'gst':
        setGstIn({
          ...gstin,
          title: '',
          value: '',
          name: '',
          type: '',
          uri: '',
          size: 0,
          showDoc: false,
          closeDoc: false,
        });
        break;
      case 'cheque':
        setCheque({
          ...cheque,
          title: '',
          value: '',
          name: '',
          type: '',
          uri: '',
          size: 0,
          showDoc: false,
          closeDoc: false,
        });
        break;
      case 'statement':
        setBankStatement({
          ...bankStatement,
          title: '',
          value: '',
          name: '',
          type: '',
          uri: '',
          size: 0,
          showDoc: false,
          closeDoc: false,
        });
        break;
      case 'cc':
        setCorporateCertificate({
          ...corporateCertificate,
          title: '',
          value: '',
          name: '',
          type: '',
          uri: '',
          size: 0,
          showDoc: false,
          closeDoc: false,
        });
        break;
      case 'bAdd':
        setAddressProof({
          ...addressProof,
          title: '',
          value: '',
          name: '',
          type: '',
          uri: '',
          size: 0,
          showDoc: false,
          closeDoc: false,
        });
        break;
      case 'pAdd':
        setPickupAddressProof({
          ...pickupAddressProof,
          title: '',
          value: '',
          name: '',
          type: '',
          uri: '',
          size: 0,
          showDoc: false,
          closeDoc: false,
        });
        break;
      case 'sign':
        setSignature({
          ...signature,
          title: '',
          value: '',
          name: '',
          type: '',
          uri: '',
          size: 0,
          showDoc: false,
          closeDoc: false,
        });
        break;
      default:
        break;
    }
  };

  //render each doc
  const renderInputText = ({
    id,
    title,
    isImp,
    showDoc,
    state,
    errorState,
    disabled,
    errorText,
    placeholder,
    documents,
    loading,
    closeDoc,
  }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          SheetManager.show('action_sheet', id);
        }}
        disabled={loading}>
        <FileUpload
          label={title}
          isImp={isImp}
          value={documents && documents.title}
          documents={documents}
          loading={loading}
          showDoc={showDoc}
          onRemove={onRemove}
          id={id}
          fId={fId}
          closeDoc={closeDoc}
        />
      </TouchableOpacity>
    );
  };

  const noteText = () => (
    <>
      <Text style={{color: 'red'}}>Note</Text>
      {noteArr.map((_, i) => (
        <View key={i}>
          <Text style={{color: '#000'}}>{_.note}</Text>
        </View>
      ))}
    </>
  );
  return (
    <ScrollView style={styles.ContainerCss}>
      {Documents.map(_ => renderInputText(_))
        .toList()
        .toArray()}
      {noteText()}
      <CustomButton title="SUBMIT" buttonColor="gray" disabled={true} />

      <ActionSheet
        id="action_sheet"
        onBeforeShow={data => {
          setFId(data);
        }}>
        <View style={styles.actionSheet}>
          {['Camera', 'File Explorer', 'Cancel'].map(_ => (
            <TouchableOpacity onPress={() => openSelection(_)}>
              <Text style={styles.modalText}>{_}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ActionSheet>
    </ScrollView>
  );
};

export default DocumentsScreen;
