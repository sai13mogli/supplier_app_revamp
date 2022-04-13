import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import Dimension from '../Theme/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import Colors from '../Theme/Colors';
import Toast from 'react-native-toast-message';
import {createManifestApi, bulkDownloadApi} from '../services/orders';
import CustomeIcon from './common/CustomeIcon';
const deviceWidth = Dimensions.get('window').width;
import {config, fs} from '';
import RNFetchBlob from 'rn-fetch-blob';
import {BASE_URL} from '../redux/constants';
import {WebView} from 'react-native-webview';
// import Base64Downloader from 'react-base64-downloader';

const BulkActionsModal = props => {
  const {
    bulkActionsModal,
    setBulkActionsModal,
    bulkItemIds,
    fetchOrdersFunc,
    fetchTabCountFunc,
    selectedTab,
    shipmentType,
    bulkDownloadItems,
  } = props;
  const [bulkActionsLoader, setBulkAcceptLoader] = useState(false);
  const [shipmentLoader, setShipmentLoader] = useState(false);
  const [invoiceLoader, setInvoiceLoader] = useState(false);
  const [isWebView, setIsWebView] = useState(false);
  const [base64, setBase64] = useState('');
  let webview = useRef();

  const downloadZip = data => {
    console.log(data, window, 'data hai dost');
    let fp = `console.log(window)
      const a = document.createElement('a');
       a.href = ${base64}
      // the filename you want
      a.download = 'supplier_files.zip';
      document.body.appendChild(a);
      a.click();`;
    webview.current.injectJavaScript(fp);
  };

  const bulkCreateManifest = async () => {
    try {
      setBulkAcceptLoader(true);
      let currbulkItemIds = [...bulkItemIds];
      currbulkItemIds = (currbulkItemIds || []).map(_ => `${_}`);
      const {data} = await createManifestApi({
        supplierId: await AsyncStorage.getItem('userId'),
        itemList: [...currbulkItemIds],
        source: 0,
      });
      if (data && data.success) {
        setBulkAcceptLoader(false);
        fetchOrdersFunc(0, '', selectedTab, shipmentType, {
          pickupFromDate: '',
          pickupToDate: '',
          poFromDate: '',
          poToDate: '',
          orderType: [],
          deliveryType: [],
          orderRefs: [],
        });
        fetchTabCountFunc(selectedTab, shipmentType);
        Toast.show({
          type: 'success',
          text2: data.message,
          visibilityTime: 2000,
          autoHide: true,
        });
        setBulkActionsModal(false);
      } else {
        setBulkAcceptLoader(false);
        Toast.show({
          type: 'error',
          text2: data.message,
          visibilityTime: 2000,
          autoHide: true,
        });
        setBulkActionsModal(false);
      }
    } catch (error) {
      console.log(error);
      setBulkAcceptLoader(false);
      Toast.show({
        type: 'error',
        text2: 'something went wrong!!',
        visibilityTime: 2000,
        autoHide: true,
      });
      setBulkActionsModal(false);
    }
  };

  const downloadFile = async downloadType => {
    const {config, fs} = RNFetchBlob;
    let currbulkItems = [...bulkDownloadItems];
    console.log(currbulkItems);
    currbulkItems = (currbulkItems || []).map(_ => ({
      itemId: _.itemId,
      downloadType: downloadType,
      url: downloadType == 'shipment' ? _.invoiceUrl : _.invoiceUrl,
    }));
    console.log('payload', [...currbulkItems]);
    let token = `Bearer ${await AsyncStorage.getItem('token')}`;
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
    myrequest.responseType = 'blob';
    myrequest.onload = e => {
      var response = myrequest.response;
      console.log('responseOnLoad', response);
      var mimetype = myrequest.getResponseHeader('Content-Type');
      var fields = mimetype.split(';');
      var name = fields[0];
      if (response) {
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(response);
        fileReaderInstance.onload = async () => {
          var fileUrl = fileReaderInstance.result;
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );
          if (granted) {
            try {
              console.log(
                RNFetchBlob.fs.dirs.MainBundleDir + '/' + 'supplier_app.zip',
              );
              let pdfLocation =
                RNFetchBlob.fs.dirs.MainBundleDir + '/' + 'supplier_app.zip';
              RNFetchBlob.fs.writeFile(
                pdfLocation,
                RNFetchBlob.base64.encode(fileUrl),
                'base64',
              );
            } catch (e) {
              console.log(e);
            }
          }
        };
      } else {
        alert('error', JSON.stringify(response));
      }
    };

    myrequest.open(
      'POST',
      `http://apigatewayqa.moglix.com/api/order/oms/bulkDownload`,
    );
    myrequest.setRequestHeader('Content-Type', 'application/json');
    myrequest.setRequestHeader('Authorization', token);
    myrequest.send(JSON.stringify([...currbulkItems]));
  };

  return (
    <Modal
      overlayPointerEvents={'auto'}
      isVisible={bulkActionsModal}
      onTouchOutside={() => {
        setBulkActionsModal(false);
      }}
      onDismiss={() => {
        setBulkActionsModal(false);
      }}
      coverScreen={true}
      style={{padding: 0, margin: 0}}
      deviceWidth={deviceWidth}
      hasBackdrop={true}
      onBackdropPress={() => setBulkActionsModal(false)}
      onBackButtonPress={() => setBulkActionsModal(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.topbdr}></View>
        <View style={styles.closeIconWrap}>
          <CustomeIcon
            name={'close'}
            size={Dimension.font22}
            color={Colors.FontColor}
            onPress={() => {
              setBulkActionsModal(false);
            }}
          />
        </View>
        <View style={styles.headerTxtWrap}>
          <Text style={styles.headerTxt}>Bulk Actions</Text>
        </View>
        <View style={styles.midWrapper}>
          <TouchableOpacity onPress={() => downloadFile('Invoice')}>
            <View style={styles.iconWrapper}>
              <CustomeIcon
                name={'pencil-line'}
                color={Colors.blackColor}
                size={Dimension.font20}></CustomeIcon>
            </View>

            <Text style={styles.btnTxt}>Invoice</Text>
            {bulkActionsLoader && (
              <ActivityIndicator
                color={Colors.BrandColor}
                style={{alignSelf: 'center'}}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => downloadFile('shipment')}>
            <View style={styles.iconWrapper}>
              <CustomeIcon
                name={'pencil-line'}
                color={Colors.blackColor}
                size={Dimension.font20}></CustomeIcon>
            </View>

            <Text style={styles.btnTxt}>Shipment Label</Text>
            {bulkActionsLoader && (
              <ActivityIndicator
                color={Colors.BrandColor}
                style={{alignSelf: 'center'}}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={bulkCreateManifest}>
            <View style={styles.iconWrapper}>
              <CustomeIcon
                name={'pencil-line'}
                color={Colors.blackColor}
                size={Dimension.font20}></CustomeIcon>
            </View>

            <Text style={styles.btnTxt}>Create Manifest</Text>
            {bulkActionsLoader && (
              <ActivityIndicator
                color={Colors.BrandColor}
                style={{alignSelf: 'center'}}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {isWebView && (
        <WebView
          ref={webview}
          originWhitelist={['*']}
          source={{html: '<html><body></body></html>'}}
          style={{width: 1, height: 1}}
          onLoad={downloadZip}
        />
      )}
    </Modal>
    // <WebView
    //   ref={webview}
    //   originWhitelist={['*']}
    //   source={{html: '<html><body></body></html>'}}
    //   style={{width: 1, height: 1}}
    //   onLoad={downloadZip}
    // />
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.WhiteColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingTop: Dimension.padding10,
  },
  iconWrapper: {
    backgroundColor: Colors.grayShade1,
    padding: Dimension.padding12,
    borderRadius: 4,
    alignSelf: 'center',
  },
  closeIconWrap: {
    alignItems: 'flex-end',
    paddingHorizontal: Dimension.padding15,
  },
  headerTxtWrap: {
    paddingHorizontal: Dimension.padding15,
    marginBottom: Dimension.margin20,
  },

  headerTxt: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    // marginLeft:Dimension.margin10,
  },
  topbdr: {
    alignSelf: 'center',
    height: 3,
    backgroundColor: Colors.modalBorder,
    borderRadius: 2,
    width: Dimension.width70,
  },
  midWrapper: {
    marginVertical: Dimension.margin30,
  },
  btnTxt: {
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomMediumFont,
    color: Colors.FontColor,
    alignSelf: 'center',
    marginTop: Dimension.margin5,
  },
});

export default BulkActionsModal;
