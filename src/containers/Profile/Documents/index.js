import React, {useState, useEffect, createRef} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import {OrderedMap, setIn} from 'immutable';
import CustomeIcon from '../../../component/common/CustomeIcon';
import FileUpload from '../../../component/common/FileUpload';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import styles from './style';
import {authToken, BASE_URL} from '../../../redux/constants/index';
import colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import CustomButton from '../../../component/common/Button';
import Modal from 'react-native-modal';
import PDFView from 'react-native-view-pdf';
import Checkbox from '../../../component/common/Checkbox/index';
import {submitProfile, getDocuments} from '../../../services/documents';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProfile} from '../../../redux/actions/profile';

const deviceWidth = Dimensions.get('window').width;

const DocumentsScreen = props => {
  const profileData = useSelector(
    state => (state.profileReducer || {}).data || {},
  );
  const dispatch = useDispatch();

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
  const [imageUrl, setImageUrl] = useState('');
  const [isPDF, setIsPDF] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [uploadDisabled, setUploadDisabled] = useState(false);
  // const source = {uri: imageUrl, cache: true};
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
    fetchDocuments();
  }, []);

  useEffect(() => {
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
    let res = await uploadDocumentService(data);
    console.log('uploadDocument ka res hai bhaiii!', res);
    setDocument(res);
  };

  const fetchDocuments = async () => {
    const {data} = await getDocuments(authToken);
    if (
      data &&
      data.data &&
      data.data.panCard &&
      data.data.gstin &&
      data.data.cancelledCheque &&
      data.data.corporationCertificate &&
      data.data.signature
    ) {
      console.log('bhk bc..');
      setUploadDisabled(true);
    }
    setDocumentsData(data);
  };

  const setDocumentsData = data => {
    console.log('data', data);
    if (data && data.data && data.data.panCard) {
      setPancard({
        ...pancard,
        title: 'pan',
        value: data.data && data.data.panCard,
        loading: false,
        showDoc: true,
        closeDoc: false,
      });
    }
    if (data && data.data && data.data.gstin) {
      setGstIn({
        ...gstin,
        title: 'gst',
        value: data.data && data.data.gstin,
        loading: false,
        showDoc: true,
        closeDoc: false,
      });
    }
    if (data && data.data && data.data.cancelledCheque) {
      setCheque({
        ...cheque,
        title: 'Cancelled Cheque',
        value: data.data && data.data.cancelledCheque,
        loading: false,
        showDoc: true,
        closeDoc: false,
      });
    }

    if (data && data.data && data.data.bankStatement) {
      setBankStatement({
        ...bankStatement,
        title: 'Bank Statement Copy',
        value: data.data && data.data.bankStatement,
        loading: false,
        showDoc: true,
        closeDoc: false,
      });
    }
    if (data && data.data && data.data.corporationCertificate) {
      setCorporateCertificate({
        ...corporateCertificate,
        title: 'Certificate of Corporation',
        value: data.data && data.data.corporationCertificate,
        loading: false,
        showDoc: true,
        closeDoc: false,
      });
    }

    if (data && data.data && data.data.businessAddress) {
      setAddressProof({
        ...addressProof,
        title: 'Business Address Proof',
        value: data.data && data.data.businessAddress,
        loading: false,
        showDoc: true,
        closeDoc: false,
      });
    }

    if (data && data.data && data.data.pickupAddress) {
      setPickupAddressProof({
        ...pickupAddressProof,
        title: 'Pickup Address Proof',
        value: data.data && data.data.pickupAddress,
        loading: false,
        showDoc: true,
        closeDoc: false,
      });
    }

    if (data && data.data && data.data.signature) {
      setSignature({
        ...signature,
        title: 'Signature',
        value: data.data && data.data.signature,
        loading: false,
        showDoc: true,
        closeDoc: false,
      });
    }
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
        Authorization: authToken,
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

  const openDoc = id => {
    switch (id) {
      case 'pancard':
        openDocView(pancard && pancard.value);
        break;
      case 'gst':
        openDocView(gstin && gstin.value);
        break;
      case 'cheque':
        openDocView(cheque && cheque.value);
        break;
      case 'statement':
        openDocView(bankStatement && bankStatement.value);
        break;
      case 'cc':
        openDocView(cheque && cheque.value);
        break;
      case 'bAdd':
        openDocView(addressProof && addressProof.value);
        break;
      case 'pAdd':
        openDocView(pickupAddressProof && pickupAddressProof.value);
        break;
      case 'sign':
        openDocView(signature && signature.value);
        break;
      default:
        break;
    }
  };

  const openDocView = fileKey => {
    setLoader(true);
    setModalVisible(true);
    var myrequest = new XMLHttpRequest();
    myrequest.onreadystatechange = e => {
      if (myrequest.readyState !== 4) {
        return;
      }

      if (myrequest.status === 200) {
      } else {
        console.warn('error');
      }
    };
    myrequest.open(
      'GET',
      `http://apigatewayqa.moglix.com/profile/file?download=0&key=${fileKey}`,
    );
    myrequest.setRequestHeader('Authorization', authToken);
    myrequest.responseType = 'blob';
    myrequest.send();
    myrequest.onload = e => {
      var response = myrequest.response;
      var mimetype = myrequest.getResponseHeader('Content-Type');
      var fields = mimetype.split(';');
      var name = fields[0];
      var isPdf = false;
      if (name == 'application/pdf') {
        isPdf = true;
      }
      if (response) {
        setLoader(false);
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(response);
        fileReaderInstance.onload = () => {
          var fileUrl = fileReaderInstance.result;

          setImageUrl(fileUrl);
          setIsPDF(false);

          // this.setState(imageUrl);
          var fields = fileUrl.slice(37);
          if (isPdf) {
            setIsPDF(true);
            setImageUrl(fields);
          }
        };
      }
    };
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
        disabled={loading || uploadDisabled}>
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
          openDoc={openDoc}
        />
      </TouchableOpacity>
    );
  };

  const noteText = () => (
    <>
      <Text style={{color: 'red'}}>Note</Text>
      {signature && signature.title && signature.value ? (
        <Text style={{color: '#000'}}>
          Please ensure that the im age of the signature is of the signature is
          of an authorised signatory (as endorsed by the tax authorities).Sign
          on a white background,scan the signature and upload.
        </Text>
      ) : (
        noteArr.map((_, i) => (
          <View key={i}>
            <Text style={{color: '#000'}}>{_.note}</Text>
          </View>
        ))
      )}
    </>
  );

  const checkCommonValidation = () => {
    return (
      pancard &&
      pancard.title &&
      pancard.value &&
      gstin &&
      gstin.title &&
      gstin.value &&
      cheque &&
      cheque.title &&
      cheque.value &&
      corporateCertificate &&
      corporateCertificate.title &&
      corporateCertificate.value &&
      signature &&
      signature.title &&
      signature.value &&
      isSelected
    );
  };

  // useEffect(() => {
  //   if (profileData && profileData.documents) {
  //   }
  // }, [profileData]);

  const onSubmit = async () => {
    setSubmitLoader(true);
    const {data} = await submitProfile(
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NjY2MTUiLCJyb2xlIjoiU1VQUExJRVIiLCJpYXQiOjE2NDQzOTE3NjUsImV4cCI6MTY0NDQ3ODE2NX0.taxunFIzboSpwNOxg_OufD00qmUisKG6iTl7ubXz9x8BPJ_VlAoQKpKeGRjKpW8zXy62XDMG1mOVnA8xX7HMyg',
    );
    if (data && data.success) {
      setSubmitLoader(false);
      setConfirmModal(false);
      dispatch(fetchProfile());
      props.navigation.navigate('Profile');
    } else {
      setConfirmModal(false);
      dispatch(fetchProfile());
      props.navigation.navigate('Profile');
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.ContainerCss}>
        {Documents.map(_ => renderInputText(_))
          .toList()
          .toArray()}
        {!uploadDisabled ? noteText() : null}
        {!uploadDisabled ? (
          <Checkbox
            checked={isSelected}
            onPress={() => setSelection(!isSelected)}
            title={'By registering you agree to our'}
          />
        ) : null}
      </ScrollView>
      {!uploadDisabled ? (
        <View style={styles.bottombtnWrap}>
          <CustomButton
            title="SUBMIT"
            buttonColor={
              !checkCommonValidation() ? colors.grayShade1 : colors.BrandColor
            }
            disabled={!checkCommonValidation()}
            borderColor={
              !checkCommonValidation() ? colors.grayShade1 : colors.BrandColor
            }
            TextColor={
              !checkCommonValidation() ? colors.FontColor : colors.WhiteColor
            }
            TextFontSize={Dimension.font16}
            onPress={() => setConfirmModal(true)}
          />
        </View>
      ) : null}

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

      <Modal
        overlayPointerEvents={'auto'}
        isVisible={modalVisible}
        onTouchOutside={() => {
          setModalVisible(false);
        }}
        onDismiss={() => {
          setModalVisible(false);
        }}
        coverScreen={true}
        // style={styles.modalbg}
        deviceWidth={deviceWidth}
        onBackButtonPress={() => {
          setModalVisible(false);
        }}
        onBackdropPress={() => {
          setModalVisible(false);
        }}>
        {loader ? (
          <ActivityIndicator
            size={'small'}
            color={'white'}
            style={{marginRight: 4}}
          />
        ) : isPDF ? (
          <PDFView
            style={{flex: 1}}
            onError={error => console.log('onError', error)}
            onLoad={() => console.log('PDF rendered from base 64 data')}
            resource={`${imageUrl}`}
            resourceType="base64"
          />
        ) : (
          <Image
            source={{uri: imageUrl}}
            style={{height: 200, width: 200, flex: 1}}
          />
        )}
      </Modal>
      <Modal
        overlayPointerEvents={'auto'}
        isVisible={confirmModal}
        onTouchOutside={() => {
          setConfirmModal(false);
        }}
        onDismiss={() => {
          setConfirmModal(false);
        }}
        coverScreen={true}
        deviceWidth={deviceWidth}
        onBackButtonPress={() => {
          setConfirmModal(false);
        }}
        onBackdropPress={() => {
          setConfirmModal(false);
        }}>
        <View>
          <Text style={{color: '#000'}}>
            By confirming the submission of all the details you agree that all
            the details are true and no false details are provided.Once
            validated you'll receive an email regarding the status of your
            profile
          </Text>
          <TouchableOpacity onPress={() => setConfirmModal(false)}>
            <Text style={{color: '#000'}}>CANCEL</Text>
          </TouchableOpacity>
          <CustomButton
            title="SUBMIT"
            buttonColor={colors.BrandColor}
            disabled={submitLoader}
            borderColor={colors.BrandColor}
            TextColor={colors.WhiteColor}
            TextFontSize={Dimension.font16}
            loading={submitLoader}
            loadingColor={colors.WhiteColor}
            onPress={onSubmit}
          />
        </View>
      </Modal>
    </View>
  );
};

export default DocumentsScreen;
