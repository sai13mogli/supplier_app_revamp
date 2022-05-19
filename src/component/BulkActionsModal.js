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
    if (downloadType == 'Invoice') {
      setInvoiceLoader(true);
    } else {
      setShipmentLoader(true);
    }
    const {config, fs} = RNFetchBlob;
    let currbulkItems = [...bulkDownloadItems];
    currbulkItems = (currbulkItems || []).map(_ => ({
      itemId: _.itemId,
      downloadType: downloadType,
      url: downloadType == 'shipment' ? _.invoiceUrl : _.invoiceUrl,
    }));
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted) {
      let folder =
        RNFetchBlob.fs.dirs.SDCardDir +
        '/Android/data/com.moglix.supplier/files/' +
        new Date().getTime();
      await RNFetchBlob.fs.mkdir(folder);
      await Promise.all(
        currbulkItems.map(async _ => {
          let options = {
            fileCache: true,
            addAndroidDownloads: {
              //Related to the Android only
              useDownloadManager: true,
              notification: true,
              path:
                folder +
                '/' +
                Math.floor(new Date().getTime() + new Date().getSeconds() / 2) +
                '.pdf',
              description: 'PDF',
            },
          };
          config(options)
            .fetch('GET', _.url, {'Cache-Control': 'no-store'})
            .then(res => {
              //Showing alert after successful downloading
              console.log('res -> ', JSON.stringify(res));
              return;
            });
        }),
      );
      if (downloadType == 'Invoice') {
        setInvoiceLoader(false);
      } else {
        setShipmentLoader(false);
      }

      Toast.show({
        type: 'success',
        text2: 'Files downloaded successfully!',
        visibilityTime: 2000,
        autoHide: true,
      });
      // setBulkActionsModal(false);
    }
    // RNFetchBlob.fetch(
    //   'POST',
    //   'http://apigatewayqa.moglix.com/api/order/oms/bulkDownload',
    //   {
    //     'Content-Type': 'application/json',
    //     Authorization: token,
    //   },
    //   JSON.stringify(currbulkItems),
    // ).then(async res => {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //   );
    //   if (granted) {
    //     let pdfLocation =
    //       RNFetchBlob.fs.dirs.SDCardDir +
    //       '/Android/data/com.moglix.supplier/files/' +
    //       `${new Date().getTime()}` +
    //       `${currbulkItems.length == 1 ? '.pdf' : '.zip'}`;
    //     RNFetchBlob.fs.writeFile(
    //       pdfLocation,
    //       RNFetchBlob.base64.encode(res.data),
    //       'base64',
    //     );
    //   }
    // });

    // console.log('payload', [...currbulkItems]);
    // var myrequest = new XMLHttpRequest();
    // myrequest.onreadystatechange = e => {
    //   if (myrequest.readyState !== 4) {
    //     return;
    //   }

    //   if (myrequest.status === 200) {
    //   } else {
    //     console.warn('error');
    //   }
    // };
    // myrequest.responseType = 'blob';
    // myrequest.onload = e => {
    //   var response = myrequest.response;
    //   console.log('responseOnLoad', response);
    //   var mimetype = myrequest.getResponseHeader('Content-Type');
    //   var fields = mimetype.split(';');
    //   var name = fields[0];
    //   if (response) {
    //     const fileReaderInstance = new FileReader();
    //     fileReaderInstance.readAsDataURL(response);
    //     fileReaderInstance.onload = async () => {
    //       var fileUrl = fileReaderInstance.result;
    //       console.log(fileUrl);
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //       );
    //       if (granted) {
    //         console.log(
    //           currbulkItems.length == 1
    //             ? fileUrl.replace('octet-stream', 'pdf')
    //             : fileUrl,
    //         );
    //         let pdfLocation =
    //           RNFetchBlob.fs.dirs.SDCardDir +
    //           '/Android/data/com.moglix.supplier/files/' +
    //           `${new Date().getTime()}` +
    //           `${currbulkItems.length == 1 ? '.pdf' : '.zip'}`;
    //         RNFetchBlob.fs.writeFile(
    //           pdfLocation,
    //           RNFetchBlob.base64.encode(
    //             currbulkItems.length == 1
    //               ? fileUrl.replace('octet-stream', 'pdf')
    //               : fileUrl,
    //           ),
    //           'base64',
    //         );
    //       }
    //     };
    //   } else {
    //     console.log(error.response.data);
    //   }
    // };

    // myrequest.open(
    //   'POST',
    //   `http://apigatewayqa.moglix.com/api/order/oms/bulkDownload`,
    // );
    // myrequest.setRequestHeader('Content-Type', 'application/json');
    // myrequest.setRequestHeader('Authorization', token);
    // myrequest.send(JSON.stringify([...currbulkItems]));
  };
  // overlayPointerEvents={'auto'}
  // isVisible={bulkActionsModal}
  // onTouchOutside={() => {
  //   setBulkActionsModal(false);
  // }}
  // onDismiss={() => {
  //   setBulkActionsModal(false);
  // }}
  // coverScreen={true}
  // style={{padding: 0, margin: 0}}
  // deviceWidth={deviceWidth}
  // hasBackdrop={true}
  // onBackdropPress={() => setBulkActionsModal(false)}
  // onBackButtonPress={() => setBulkActionsModal(false)}

  return (
    <View>
      <View style={styles.modalContainer}>
        <View style={styles.topbdr}></View>

        <View style={styles.headerTxtWrap}>
          <Text style={styles.headerTxt}>Bulk Actions</Text>
          <CustomeIcon
            name={'close'}
            size={Dimension.font22}
            color={Colors.FontColor}
            onPress={() => {
              setBulkActionsModal(false);
            }}
          />
        </View>
        <View style={styles.midWrapper}>
          <TouchableOpacity
            onPress={() => downloadFile('Invoice')}
            style={styles.ActionWrap}>
            <View style={styles.iconWrapper}>
              {invoiceLoader ? (
                <ActivityIndicator
                  color={Colors.BrandColor}
                  style={{alignSelf: 'center'}}
                />
              ) : (
                <CustomeIcon
                  name={'download'}
                  color={Colors.blackColor}
                  size={Dimension.font20}></CustomeIcon>
              )}
            </View>

            <Text style={styles.btnTxt}>Invoice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => downloadFile('shipment')}
            style={styles.ActionWrap}>
            <View style={styles.iconWrapper}>
              {shipmentLoader ? (
                <ActivityIndicator
                  color={Colors.BrandColor}
                  style={{alignSelf: 'center'}}
                />
              ) : (
                <CustomeIcon
                  name={'download'}
                  color={Colors.blackColor}
                  size={Dimension.font20}></CustomeIcon>
              )}
            </View>

            <Text style={styles.btnTxt}>Shipment Label</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={bulkCreateManifest}
            style={styles.ActionWrap}>
            <View style={styles.iconWrapper}>
              {bulkActionsLoader ? (
                <ActivityIndicator
                  color={Colors.BrandColor}
                  style={{alignSelf: 'center'}}
                />
              ) : (
                <CustomeIcon
                  name={'pencil-line'}
                  color={Colors.blackColor}
                  size={Dimension.font20}></CustomeIcon>
              )}
            </View>

            <Text style={styles.btnTxt}>Create Manifest</Text>
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
    </View>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  ActionWrap: {
    flex: 1,
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
    marginVertical: Dimension.margin10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginVertical: Dimension.margin10,
    flexDirection: 'row',

    marginHorizontal: Dimension.margin12,
    justifyContent: 'center',
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
