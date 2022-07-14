import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Image, Dimensions, ScrollView,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FileUpload from '../../../component/common/FileUpload';
import styles from '../Documents/style';
import promoterStyle from './style';
import CustomButton from '../../../component/common/Button';
import Checkbox from '../../../component/common/Checkbox/index';
import colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import DocumentPicker from 'react-native-document-picker';
import {BASE_URL} from '../../../redux/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import Modal from 'react-native-modal';
import PDFView from 'react-native-view-pdf';
import {submitDocuments, submitProfile} from '../../../services/documents';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProfile} from '../../../redux/actions/profile';
//import { Colors } from 'react-native/Libraries/NewAppScreen';

const deviceWidth = Dimensions.get('window').width;

const PromoterDocuments = props => {
  const dispatch = useDispatch();
  const profileData = useSelector(
    state => (state.profileReducer || {}).data || {},
  );
  const [promoters, setPromoters] = useState([
    {
      id: Date.now(),
      aadharCardKey: {},
      panCardKey: {},
    },
  ]);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [confirmModal, setConfirmModal] = useState(false);
  const [isPDF, setIsPDF] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if ((profileData?.documents?.promotersDetails || []).length) {
      setIsSave(true);
    } else {
      setIsSave(false);
    }
    setPromoters(
      (profileData?.documents?.promotersDetails || []).map(_ => ({
        id: _.id,
        panCardKey: {
          uri: _.panCard,
          title: 'pan',
        },
        aadharCardKey: {
          uri: _.aadharCard,
          title: 'adhaar',
        },
      })),
    );
  }, [profileData?.documents?.promotersDetails?.length]);

  const addPromoter = () => {
    let promoter =
      promoters.find(_ => !_.aadharCardKey.uri || !_.panCardKey.uri) || {};
    if (!promoter.aadharCardKey) {
      setPromoters([
        ...promoters,
        {
          id: Date.now(),
          aadharCardKey: {},
          panCardKey: {},
        },
      ]);
    } else {
      Toast.show({
        type: 'error',
        text2: 'Please upload all required documents to add more',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const onSubmit = async () => {
    try {
      if (isSave) {
        setConfirmModal(true);
      } else {
        let promoter =
          promoters.find(_ => !_.aadharCardKey.uri || !_.panCardKey.uri) || {};
        if (promoter.aadharCardKey) {
          Toast.show({
            type: 'error',
            text2: 'Please upload all required documents',
            visibilityTime: 2000,
            autoHide: true,
          });
        } else {
          setSubmitLoader(true);
          let body = promoters.map(_ => ({
            id: _.id,
            aadharCardKey: _.aadharCardKey.uri,
            panCardKey: _.panCardKey.uri,
          }));
          const {data} = await submitDocuments(body, profileData.userId);
          setIsSave(true);
          if (data.success) {
            setConfirmModal(true);
          }
          setSubmitLoader(false);
        }
      }
    } catch (e) {
      setSubmitLoader(false);
    }
  };

  const onConfirm = async () => {
    try {
      setSubmitLoader(true);
      let token = `Bearer ${await AsyncStorage.getItem('token')}`;
      const {data} = await submitProfile(token);
      if (data && data.success) {
        setSubmitLoader(false);
        setConfirmModal(false);
        dispatch(fetchProfile());
        Toast.show({
          type: 'success',
          text2: data.message || 'Profile submitted successfully!',
          visibilityTime: 2000,
          autoHide: true,
        });
        props.navigation.goBack();
      } else {
        setSubmitLoader(false);
        setConfirmModal(false);
        Toast.show({
          type: 'error',
          text2: data.message,
          visibilityTime: 2000,
          autoHide: true,
        });

        // dispatch(fetchProfile());
        props.navigation.goBack();
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  const removePromoter = id => {
    setIsSave(false);
    if (promoters.length > 1) {
      setPromoters([...promoters].filter(_ => _.id !== id));
    }
  };

  const selectDoc = async (id, type) => {
    const res = await DocumentPicker.pick({
      // type: [DocumentPicker],
    });
    if (res && res[0]) {
      const response = await uploadDocument(res[0], id, type);
      if (response && response.fileData && response.resp) {
        let promotersData = [...promoters];
        promotersData = promoters.map(_ => {
          if (_.id == id) {
            return {
              ..._,
              panCardKey:
                type == 'panCardKey'
                  ? {
                      title: response.fileData.name,
                      uri: response.resp.data.fileKey,
                      loading: false,
                    }
                  : _.panCardKey,
              aadharCardKey:
                type == 'aadharCardKey'
                  ? {
                      title: response.fileData.name,
                      uri: response.resp.data.fileKey,
                      loading: false,
                    }
                  : _.aadharCardKey,
            };
          }
          return {..._};
        });
        setPromoters([...promotersData]);
      }
    }
  };

  const uploadDocument = async (data, id, type) => {
    try {
      setIsSave(false);
      let promotersData = [...promoters];
      promotersData = promoters.map(_ => {
        if (_.id == id) {
          return {
            ..._,
            panCardKey:
              type == 'panCardKey'
                ? {
                    ..._.panCardKey,
                    loading: true,
                  }
                : _.panCardKey,
            aadharCardKey:
              type == 'aadharCardKey'
                ? {
                    ..._.aadharCardKey,
                    loading: true,
                  }
                : _.aadharCardKey,
          };
        }
        return {..._};
      });
      setPromoters([...promotersData]);
      console.log('Uploading......');
      let token = `Bearer ${await AsyncStorage.getItem('token')}`;
      const url = `${BASE_URL}profile/file/upload`;
      const response = await RNFetchBlob.fetch(
        'POST',
        url,
        {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
        [
          {
            name: 'key',
            data:
              type == 'panCardKey' ? 'promoterPanCard' : 'promoterAadharCard',
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
      console.log('Uploading......', res);
      return {
        resp: res,
        fileData: data,
      };
    } catch (error) {
      let promotersData = [...promoters];
      promotersData = promoters.map(_ => {
        if (_.id == id) {
          return {
            ..._,
            panCardKey:
              type == 'panCardKey'
                ? {
                    ..._.panCardKey,
                    loading: false,
                  }
                : _.panCardKey,
            aadharCardKey:
              type == 'aadharCardKey'
                ? {
                    ..._.aadharCardKey,
                    loading: false,
                  }
                : _.aadharCardKey,
          };
        }
        return {..._};
      });
      setPromoters([...promotersData]);
      console.log(error);
    }
  };

  const openDocView = async fileKey => {
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
      `http://apigatewayqa.moglix.com/profile/file?download=0&key=${fileKey}`, //`https://apigateway.moglix.com/profile/file?download=0&key=${fileKey}`,
    );
    let token = `Bearer ${await AsyncStorage.getItem('token')}`;
    myrequest.setRequestHeader('Authorization', token);
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
        // alert('success', JSON.stringify(response));
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
      } else {
        alert('error', JSON.stringify(response));
      }
    };
  };

  return (
    <View style={{flex: 1,position:"relative",marginTop:Dimension.margin30}}>
      <ScrollView style={styles.ContainerCss} contentContainerStyle={{paddingBottom:180}}>
      {promoters.map((promoter, promoterKey) => (
        <View key={promoterKey} style={promoterStyle.promoterWrap}>
          <View
            style={promoterStyle.promoterheaderWrap}>
            <Text style={promoterStyle.headingTxt}>
              Promoter{' '}
              {String(promoterKey).length > 1
                ? promoterKey + 1
                : `0${promoterKey + 1}`}
            </Text>
            {promoters.length == 1 ||
            (profileData && profileData.verificationStatus >= 10) ? null : (
              <Icon
                onPress={() => removePromoter(promoter.id)}
                name={'trash-can'}
                size={20}
                color={colors.FontColor}
                style={{marginTop:3}}
              />
            )}
          </View>
          <FileUpload
            label={'Adhaar Card'}
            isImp={true}
            value={
              promoter && promoter.aadharCardKey && promoter.aadharCardKey.title
                ? 'adhaar'
                : ''
            }
            documents={promoter.aadharCardKey}
            loading={
              promoter &&
              promoter.aadharCardKey &&
              promoter.aadharCardKey.loading
            }
            onRemove={removePromoter}
            // id={id}
            // fId={fId}
            // closeDoc={closeDoc}
            // openDoc={openDoc}
            openDoc={() => openDocView(promoter.aadharCardKey.uri)}
            fileUpload={2}
            showDoc={
              promoter && promoter.aadharCardKey && promoter.aadharCardKey.title
            }
            // errorState={errorState}
            // errorText={errorText}
            // onPress={() => (setUpload ? onPress(id) : openDoc(id))}
            // disabled={uploadDisabled}
            uploadDocument={() => selectDoc(promoter.id, 'aadharCardKey')}
            setUpload={true}
          />
          <FileUpload
            label={'PAN Card'}
            isImp={true}
            value={
              promoter && promoter.panCardKey && promoter.panCardKey.title
                ? 'pan'
                : ''
            }
            documents={promoter.panCardKey}
            loading={
              promoter && promoter.panCardKey && promoter.panCardKey.loading
            }
            onRemove={removePromoter}
            // id={id}
            // fId={fId}
            // closeDoc={closeDoc}
            openDoc={() => openDocView(promoter.panCardKey.uri)}
            fileUpload={2}
            showDoc={
              promoter && promoter.panCardKey && promoter.panCardKey.title
            }
            // errorState={errorState}
            // errorText={errorText}
            // onPress={() => (setUpload ? onPress(id) : openDoc(id))}
            // disabled={uploadDisabled}
            uploadDocument={() => selectDoc(promoter.id, 'panCardKey')}
            setUpload={true}
          />
        </View>
     
      ))}
      <View>
      <Text style={styles.Notetxt}>NOTE :</Text>
      <View style={styles.rowCss}>
            <View style={styles.bullet}></View>
            <Text style={styles.NoteData}>
            Each document file size should not exceed more then 2 MB.
            </Text>
          </View>
      </View>
      
         </ScrollView>
      {/* {profileData && profileData.verificationStatus < 10 ? ( */}
      <View style={promoterStyle.BtnWrap}>
        <View style={{flex: 1,marginRight:Dimension.margin10}}>
          <CustomButton
            title="ADD MORE"
            buttonColor={colors.blackColor}
            disabled={submitLoader}
            borderColor={colors.blackColor}
            TextColor={colors.WhiteColor}
            TextFontSize={Dimension.font16}
            onPress={addPromoter}></CustomButton>
        </View>
        <View style={{flex: 1,marginLeft:Dimension.margin10}}>
          <CustomButton
            title={isSave ? 'SUBMIT' : 'SAVE & SUBMIT'}
            buttonColor={colors.BrandColor}
            disabled={submitLoader}
            borderColor={colors.BrandColor}
            TextColor={colors.WhiteColor}
            TextFontSize={Dimension.font16}
            onPress={onSubmit}
            loading={submitLoader}
            loadingColor={'#fff'}
          />
        </View>
      </View>
      {/* ) : null} */}
      <Modal
        overlayPointerEvents={'auto'}
        isVisible={modalVisible}
        // isVisible={true}
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
        }}
        style={styles.ModalCss}>
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
          // <Text style={{color: 'red', fontSize: 16, fontWeight: 'bold'}}>
          //   No Image Found!!
          // </Text>
          <Image
            source={{uri: imageUrl}}
            style={{height: '100%', width: '100%', flex: 1}}
          />
        )}
      </Modal>
      <Modal
        overlayPointerEvents={'auto'}
        isVisible={confirmModal}
        //isVisible={true}
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
        }}
        style={styles.ModalCss}>
         
        <View style={promoterStyle.modalContainer}>
          <View style={promoterStyle.modalTopWrap}>
        <View style={promoterStyle.topbdr}></View>
          <Text style={promoterStyle.ModalHeading}>Confirm Submission</Text>
          <Text style={styles.Modaltext}>
            By confirming the submission of all the details you agree that all
            the details are true and no false details are provided. Once
            validated you'll receive an email regarding the status of your
            profile
          </Text>
          <View style={{marginLeft:-Dimension.margin10}}>
          <Checkbox
            checked={true}
            title={'By registering you agree to our'}
          />
          <TouchableOpacity>
            <Text style={promoterStyle.termsText}>Terms & Condition</Text>
          </TouchableOpacity>
        </View>
          
          {/* <TouchableOpacity onPress={() => setConfirmModal(false)}>
            <Text style={{color: '#000'}}>CANCEL</Text>
          </TouchableOpacity> */}
        </View>
        <View style={promoterStyle.ModalBtnWrap}>
            <View style={{flex: 1}}>
              <CustomButton
                title="CANCEL"
                buttonColor={colors.WhiteColor}
                borderColor={colors.WhiteColor}
                TextColor={colors.FontColor}
                TextFontSize={Dimension.font16}
                onPress={() => setConfirmModal(false)}></CustomButton>
            </View>
            <View style={{flex: 1}}>
              <CustomButton
                title="CONFIRM"
                buttonColor={colors.BrandColor}
                disabled={submitLoader}
                borderColor={colors.BrandColor}
                TextColor={colors.WhiteColor}
                TextFontSize={Dimension.font16}
                onPress={onConfirm}
                loading={submitLoader}
                loadingColor={'#fff'}
              />
            </View>
          </View>
          </View>
      </Modal>
    </View>
  );
};

export default PromoterDocuments;
