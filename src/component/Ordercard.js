import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {getImageUrl, markOutForOrderApi, getItemInfo} from '../services/orders';
import Dimension from '../Theme/Dimension';
import Colors from '../Theme/Colors';
import CustomeIcon from './common/CustomeIcon';
import Modal from 'react-native-modal';
import {
  acceptOrder,
  getpoChallan,
  rejectOrder,
  createManifestApi,
} from '../services/orders';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PackNowModal from '../component/PackNowModal';
import RejectModal from '../component/RejectModal';
import MarkOutForDeliveryModal from '../component/MarkOutForDeliveryModal';
import ViewLSPModal from '../component/ViewLSPModal';
import SplitHistoryModal from '../component/SplitHistoryModal';
import ProofOfDeliveryModal from '../component/ProofOfDeliveryModal';
import AcceptModal from './AcceptModal';
import AddView from './AddView';
import SplitQuantityModal from './SplitQuantityModal';
import {useNavigation} from '@react-navigation/native';

const deviceWidth = Dimensions.get('window').width;

const Ordercard = props => {
  const {
    msn,
    quantity,
    orderRef,
    createdAt,
    itemRef,
    pickupDate,
    transferPrice,
    hsn,
    productName,
    orderTypeString,
    shipmentMode,
    isVmi,
    shipmentModeString,
    actionCTA,
    taxPercentage,
    totalAmount,
    itemId,
    fetchOrdersFunc,
    supplierId,
    selectedTab,
    fetchTabCountFunc,
    invoiceUrl,
    bulkItemIds,
    setBulkItemIds,
    selectItemId,
    shipmentType,
    shipmentUrl,
    warehouseId,
    podUrl,
    selectItemData,
    bulkDownloadItems,
  } = props;

  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [orderImage, setOrderImage] = useState(null);
  const [showLspDetails, setShowLspDetails] = useState(null);
  const [showMoreTxt, setShowMoreTxt] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const [isOrderVisible, setIsOrderVisible] = useState(false);
  const [poLoader, setPoLoader] = useState(false);
  const [invoiceLoader, setInvoiceLoader] = useState(false);
  const [rejectLoader, setRejectLoader] = useState(false);
  const [markForDelivery, setMarkForDelivery] = useState(false);
  const [viewSplitHistory, setViewSplitHistory] = useState(false);
  const [showMoreCTA, setShowMoreCTA] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [proofOfDelivery, setProofOfDelivery] = useState(false);
  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [packNow, setPackNow] = useState(false);
  const [addViewModal, setAddViewModal] = useState(false);
  const [splitQuantityModal, setSplitQuantityModal] = useState(false);
  const [manifestLoader, setManifestLoader] = useState(false);
  const [shipmentLoader, setShipmentLoader] = useState(false);
  const [podLoader, setPodLoader] = useState(false);
  const [debitLoader, setDebitLoader] = useState(false);
  const {navigate} = useNavigation();
  const navigation = useNavigation();

  useEffect(() => {
    fetchImage();
    if (actionCTA && actionCTA.length > 2) {
      setShowMoreCTA(true);
    }
  }, []);

  const fetchImage = async () => {
    const {data} = await getImageUrl(msn);
    let imageUrl =
      'https://cdn.moglix.com/' +
      (data &&
        data.productBO &&
        data.productBO.productPartDetails &&
        data.productBO.productPartDetails[msn] &&
        data.productBO.productPartDetails[msn].images &&
        data.productBO.productPartDetails[msn].images[0] &&
        data.productBO.productPartDetails[msn].images[0].links.medium);
    let validUrl = imageUrl.split('/');
    if (!validUrl.includes('null')) {
      setOrderImage(imageUrl);
    }
  };

  const getTime = (time, acceptrejectOrder) => {
    let months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];
    let date = new Date(Number(time));
    if (acceptrejectOrder) {
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }
    return `${months[date.getMonth()]} ${date.getDate()},${date.getFullYear()}`;
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length > 1);
  }, []);

  const toggleShowMoreTxt = () => {
    setShowMoreTxt(!showMoreTxt);
  };

  const onPackNowSuccess = () => {
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
    props.setLoadingTabs(true);
  };

  const getPOInvoice = (fromPO, invoiceUrl, isInvoice) => {
    if (Platform.OS == 'android') {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ).then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Storage Permission Granted.');
            downloadPDF(fromPO, invoiceUrl, isInvoice);
          } else {
          }
        });
      } catch (err) {
        //To handle permission related issue
        console.warn(err);
      }
    } else {
      downloadPDF(fromPO, invoiceUrl);
    }
  };

  const getShipmentLabel = pdfUrl => {
    if (Platform.OS == 'android') {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ).then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Storage Permission Granted.');
            downloadShipmentLabel(pdfUrl);
          } else {
          }
        });
      } catch (err) {
        //To handle permission related issue
        console.warn(err);
      }
    } else {
      downloadShipmentLabel(pdfUrl);
    }
  };

  const downloadPDF = async (isPO, pdfUrl, isInvoice) => {
    //Main function to download the image
    let date = new Date(); //To add the time suffix in filename

    try {
      let image_URL = '';
      if (isInvoice) {
        setInvoiceLoading(true);
      }
      if (isPO) {
        if (!isInvoice) {
          setPoLoader(true);
        }
        const {data} = await getpoChallan(orderRef);
        if (data && data.success) {
          //Image URL which we want to download
          image_URL = data.responseMessage;
        }
      } else {
        //Image URL which we want to download
        if (!isInvoice) {
          setInvoiceLoader(true);
        }
        image_URL = pdfUrl;
      }
      //Getting the extention of the file
      let ext = getExtention(image_URL);
      ext = '.' + ext[0];
      //Get config and fs from RNFetchBlob
      //config: To pass the downloading related options
      //fs: To get the directory path in which we want our image to download
      const {config, fs} = RNFetchBlob;
      let PictureDir =
        Platform.OS == 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          //Related to the Android only
          useDownloadManager: true,
          notification: true,
          path:
            PictureDir +
            '/PDF_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: 'PDF',
        },
      };
      config(options)
        .fetch('GET', image_URL, {'Cache-Control': 'no-store'})
        .then(res => {
          //Showing alert after successful downloading
          setInvoiceLoading(false);
          if (isPO) {
            setPoLoader(false);
          } else {
            setInvoiceLoader(false);
          }
          Toast.show({
            type: 'success',
            text2: pdfUrl ? 'Invoice Downloaded' : 'PO Downloaded',
            visibilityTime: 2000,
            autoHide: true,
          });
        });
    } catch (error) {
      console.log(error);
      setInvoiceLoading(false);
      if (isPO) {
        setPoLoader(false);
      } else {
        setInvoiceLoader(false);
      }
      Toast.show({
        type: 'error',
        text2: 'Something went wrong',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const downloadShipmentLabel = async url => {
    //Main function to download the image
    let date = new Date(); //To add the time suffix in filename
    try {
      let image_URL = '';
      //Image URL which we want to download
      setShipmentLoader(true);
      image_URL = url;
      //Getting the extention of the file
      let ext = getExtention(image_URL);
      ext = '.' + ext[0];
      //Get config and fs from RNFetchBlob
      //config: To pass the downloading related options
      //fs: To get the directory path in which we want our image to download
      const {config, fs} = RNFetchBlob;
      let PictureDir =
        Platform.OS == 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          //Related to the Android only
          useDownloadManager: true,
          notification: true,
          path:
            PictureDir +
            '/PDF_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: 'PDF',
        },
      };
      config(options)
        .fetch('GET', image_URL, {'Cache-Control': 'no-store'})
        .then(res => {
          //Showing alert after successful downloading
          setShipmentLoader(false);
          Toast.show({
            type: 'success',
            text2: 'Shipment Label Downloaded',
            visibilityTime: 2000,
            autoHide: true,
          });
        });
    } catch (error) {
      setShipmentLoader(false);
      Toast.show({
        type: 'success',
        text2: 'Something went wrong',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const getExtention = filename => {
    //To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  // const onUploadInvoice = () => {
  //   { () => props.navigation.navigate("UploadInvoiceScreen") }
  // }

  const createManifest = async () => {
    try {
      setManifestLoader(true);
      const {data} = await createManifestApi({
        supplierId: await AsyncStorage.getItem('userId'),
        itemList: [`${itemId}`],
        source: 0,
      });
      if (data && data.success) {
        setManifestLoader(false);
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
        props.setLoadingTabs(true);
        Toast.show({
          type: 'success',
          text2: data.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      } else {
        setManifestLoader(false);
        Toast.show({
          type: 'error',
          text2: data.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      setManifestLoader(false);
      console.log(error);
    }
  };

  const getPodCopy = podcopyUrl => {
    if (Platform.OS == 'android') {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ).then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            downloadPodCopyUrl(podcopyUrl);
          } else {
          }
        });
      } catch (err) {
        //To handle permission related issue
        console.warn(err);
      }
    } else {
      downloadPodCopyUrl(podcopyUrl);
    }
  };

  const downloadPodCopyUrl = async url => {
    //Main function to download the image
    let date = new Date(); //To add the time suffix in filename
    try {
      let image_URL = '';
      //Image URL which we want to download
      setPodLoader(true);
      image_URL = url;
      //Getting the extention of the file
      let ext = getExtention(image_URL);
      ext = '.' + ext[0];
      //Get config and fs from RNFetchBlob
      //config: To pass the downloading related options
      //fs: To get the directory path in which we want our image to download
      const {config, fs} = RNFetchBlob;
      let PictureDir =
        Platform.OS == 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          //Related to the Android only
          useDownloadManager: true,
          notification: true,
          path:
            PictureDir +
            '/PDF_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: 'PDF',
        },
      };
      config(options)
        .fetch('GET', image_URL, {'Cache-Control': 'no-store'})
        .then(res => {
          //Showing alert after successful downloading
          setPodLoader(false);
          Toast.show({
            type: 'success',
            text2: 'POD copy Downloaded',
            visibilityTime: 2000,
            autoHide: true,
          });
        });
    } catch (error) {
      console.log(error);
      setPodLoader(false);
      Toast.show({
        type: 'error',
        text2: 'Something went wrong',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const getDebitNoteUrl = async () => {
    try {
      setDebitLoader(true);
      const {data} = await getItemInfo(supplierId, `${itemRef}`);
      if (data.success) {
        getDebitNoteFn(
          data &&
            data.data &&
            data.data.records &&
            data.data.records[0] &&
            data.data.records[0].dnUrl,
        );
      } else {
        setDebitLoader(false);
        Toast.show({
          type: 'error',
          text2: data.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      setDebitLoader(false);
    }
  };

  const getDebitNoteFn = dnUrl => {
    if (Platform.OS == 'android') {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ).then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            downloadDnUrl(dnUrl);
          } else {
          }
        });
      } catch (err) {
        //To handle permission related issue
        console.warn(err);
      }
    } else {
      downloadDnUrl(dnUrl);
    }
  };

  const downloadDnUrl = async url => {
    //Main function to download the image
    let date = new Date(); //To add the time suffix in filename
    try {
      let image_URL = '';
      //Image URL which we want to download
      image_URL = url;
      //Getting the extention of the file
      let ext = getExtention(image_URL);
      ext = '.' + ext[0];
      //Get config and fs from RNFetchBlob
      //config: To pass the downloading related options
      //fs: To get the directory path in which we want our image to download
      const {config, fs} = RNFetchBlob;
      let PictureDir =
        Platform.OS == 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          //Related to the Android only
          useDownloadManager: true,
          notification: true,
          path:
            PictureDir +
            '/PDF_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: 'PDF',
        },
      };
      config(options)
        .fetch('GET', image_URL, {'Cache-Control': 'no-store'})
        .then(res => {
          //Showing alert after successful downloading
          setDebitLoader(false);
          Toast.show({
            type: 'success',
            text2: 'Debit Note Downloaded',
            visibilityTime: 2000,
            autoHide: true,
          });
        });
    } catch (error) {
      console.log(error);
      setDebitLoader(false);
      Toast.show({
        type: 'error',
        text2: 'Something went wrong',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const renderCTAs = (cta, url, fromCTA, fromPartial, podcopy) => {
    const ctaLength = actionCTA.filter(number => number % 2 !== 0);
    return (
      <>
        {cta == 'REJECT' ? (
          <TouchableOpacity
            disabled={rejectLoader}
            onPress={() => setRejectModal(true)}
            style={styles.rejectCtabtn}>
            <Text style={styles.rejectCtaTxt}>{cta}</Text>
            {rejectLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : cta == 'ACCEPT' ? (
          <TouchableOpacity
            // disabled={acceptLoader}
            onPress={() => setDisplayCalendar(true)}
            style={styles.acceptCtabtn}>
            <Text style={styles.acceptCtaTxt}>{cta}</Text>
          </TouchableOpacity>
        ) : cta == 'OMS_PICKUP_DATE' ? (
          <TouchableOpacity
            // disabled={acceptLoader}
            onPress={() => setDisplayCalendar(true)}
            style={styles.acceptCtabtn}>
            <Text style={styles.acceptCtaTxt}>RESCHEDULE PICKUP</Text>
          </TouchableOpacity>
        ) : cta == 'EMS_PICKUP_DATE' ? (
          <TouchableOpacity
            // disabled={acceptLoader}
            onPress={() => setDisplayCalendar(true)}
            style={styles.acceptCtabtn}>
            <Text style={styles.acceptCtaTxt}>CHOOSE PICKUP</Text>
          </TouchableOpacity>
        ) : cta == 'DOWNLOAD_INVOICE' ? (
          <TouchableOpacity
            disabled={invoiceLoading}
            onPress={() => getPOInvoice(false, url, true)}
            style={[
              styles.DownloadPoBtn,
              {
                // flex: actionCTA.length > 1 ? 5 : 1,
                // flexBasis: actionCTA.length > 1 ? '50%' : '100%',
                height: Dimension.height33,
                flex: ctaLength.length ? 4 : 1,
                flexBasis: ctaLength.length ? '45%' : '100%',
              },
            ]}>
            <Text style={styles.rejectCtaTxt}>DOWNLOAD INVOICE</Text>
            {invoiceLoading && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : cta == 'DOWNLOAD_PO_EMS' ? (
          <TouchableOpacity
            disabled={poLoader}
            onPress={() => getPOInvoice(true, '')}
            style={[
              styles.DownloadPoBtn,
              {
                // flex: actionCTA.length > 1 ? 5 : 1,
                // flexBasis: actionCTA.length > 1 ? '50%' : '100%',
                height: Dimension.height34,
                flex: ctaLength.length ? 5 : 1,
                flexBasis: ctaLength.length ? '45%' : '100%',
              },
            ]}>
            <Text style={styles.rejectCtaTxt}>DOWNLOAD PO</Text>
            {poLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : cta == 'REMAP_INVOICE' ? (
          <TouchableOpacity
            disabled={poLoader}
            onPress={() =>
              navigation.navigate('UploadInvoiceEMS', {
                orderRef,
                actionCTA,
                itemRef,
                warehouseId,
                hsn,
                quantity,
                totalAmount,
              })
            }
            style={styles.DownloadPoBtn}>
            <Text style={styles.rejectCtaTxt}>REMAP INVOICE</Text>
            {poLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : cta == 'MAP_PO_TO_INVOICE' ? (
          <TouchableOpacity
            disabled={poLoader}
            onPress={() =>
              navigation.navigate('UploadInvoiceOMS', {
                orderRef,
                actionCTA,
                itemRef,
              })
            }
            style={[
              styles.DownloadPoBtn,
              {
                flex: ctaLength.length ? 5 : 1,
                flexBasis: ctaLength.length ? '45%' : '100%',
              },
            ]}>
            <Text style={styles.rejectCtaTxt}>UPLOAD INVOICE</Text>
            {poLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : cta == 'DOWNLOAD_PO_OMS' ? (
          <TouchableOpacity
            disabled={invoiceLoader}
            onPress={() => getPOInvoice(false, url)}
            style={[
              styles.DownloadPoBtn,
              {
                // flex: actionCTA.length > 1 ? 5 : 1,
                // flexBasis: actionCTA.length > 1 ? '50%' : '100%',
                height: Dimension.height33,
                flex: ctaLength.length ? 5 : 1,
                flexBasis: ctaLength.length ? '45%' : '100%',
              },
            ]}>
            <Text style={styles.rejectCtaTxt}>DOWNLOAD PO</Text>
            {invoiceLoader && (
              <ActivityIndicator
                color={Colors.FontColor}
                style={{alignSelf: 'center'}}
              />
            )}
          </TouchableOpacity>
        ) : cta == 'DOWNLOAD_POD_COPY' ? (
          <TouchableOpacity
            disabled={podLoader}
            onPress={() => getPodCopy(podcopy)}
            style={[
              styles.DownloadPoBtn,
              {
                // flex: actionCTA.length > 1 ? 5 : 1,
                // flexBasis: actionCTA.length > 1 ? '50%' : '100%',
                flex: ctaLength.length ? 5 : 1,
                flexBasis: ctaLength.length ? '45%' : '100%',
              },
            ]}>
            <Text style={styles.rejectCtaTxt}>DOWNLOAD POD COPY</Text>
            {podLoader && (
              <ActivityIndicator color={'red'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : cta == 'DOWNLOAD_DEBIT_NOTE' ? (
          <TouchableOpacity
            disabled={debitLoader}
            onPress={() => getDebitNoteUrl()}
            style={[
              styles.DownloadPoBtn,
              {
                // flex: actionCTA.length > 1 ? 5 : 1,
                // flexBasis: actionCTA.length > 1 ? '50%' : '100%',
                flex: ctaLength.length ? 5 : 1,
                flexBasis: ctaLength.length ? '45%' : '100%',
              },
            ]}>
            <Text style={styles.rejectCtaTxt}>DOWNLOAD DEBIT NOTE</Text>
            {debitLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : cta == 'MAP_INVOICE' ? (
          <TouchableOpacity
            disabled={invoiceLoader}
            onPress={() =>
              navigation.navigate('UploadInvoiceEMS', {
                orderRef,
                actionCTA,
                itemRef,
                warehouseId,
                hsn,
                quantity,
                totalAmount,
                taxPercentage,
              })
            }
            style={[
              styles.DownloadPoBtn,
              {
                // flex: actionCTA.length > 1 ? 5 : 1,
                // flexBasis: actionCTA.length > 1 ? '50%' : '100%',
                flex: ctaLength.length ? 5 : 1,
                flexBasis: ctaLength.length ? '45%' : '100%',
              },
            ]}>
            <Text style={styles.rejectCtaTxt}>UPLOAD INVOICE</Text>
            {invoiceLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : cta == 'MARK_OUT_FOR_DOOR_DELIVERY' ? (
          <TouchableOpacity
            disabled={invoiceLoader}
            onPress={() => setMarkForDelivery(true)}
            style={[
              styles.DownloadPoBtn,
              {
                flex: actionCTA.length > 1 ? 5 : 1,
                flexBasis: actionCTA.length > 1 ? '48%' : '100%',
              },
            ]}>
            <Text style={styles.rejectCtaTxt}>MARK OUT FOR DELIVERY</Text>
            {invoiceLoader && (
              <ActivityIndicator
                color={Colors.FontColor}
                style={{alignSelf: 'center'}}
              />
            )}
          </TouchableOpacity>
        ) : cta == 'VIEW_TREE_MODAL' ? (
          <TouchableOpacity
            disabled={invoiceLoader}
            onPress={() => setViewSplitHistory(true)}
            style={[
              styles.DownloadPoBtn,
              {
                flex: actionCTA.length > 1 ? 5 : 1,
                flexBasis: actionCTA.length > 1 ? '48%' : '100%',
              },
            ]}>
            <Text style={styles.rejectCtaTxt}>VIEW SPLIT HISTORY</Text>
            {invoiceLoader && (
              <ActivityIndicator
                color={Colors.FontColor}
                style={{alignSelf: 'center'}}
              />
            )}
          </TouchableOpacity>
        ) : cta == 'VIEW_SHIPPED_DETAILS' ? (
          <TouchableOpacity
            disabled={invoiceLoader}
            onPress={() => setShowLspDetails(true)}
            style={[
              styles.DownloadPoBtn,
              {
                // flex: actionCTA.length > 1 ? 5 : 1,
                // flexBasis: actionCTA.length > 1 ? '50%' : '100%',
                flex: ctaLength.length ? 5 : 1,
                flexBasis: ctaLength.length ? '45%' : '100%',
              },
            ]}>
            <Text style={styles.rejectCtaTxt}>VIEW LSP DETAILS</Text>
            {invoiceLoader && (
              <ActivityIndicator
                color={Colors.FontColor}
                style={{alignSelf: 'center'}}
              />
            )}
          </TouchableOpacity>
        ) : cta == 'PACK_ORDER' ? (
          <TouchableOpacity
            disabled={invoiceLoader}
            onPress={() => setPackNow(true)}
            style={[
              styles.DownloadPoBtn,
              {
                flex: actionCTA.length > 1 ? 5 : 1,
                flexBasis: actionCTA.length > 1 ? '48%' : '100%',
              },
            ]}>
            <Text style={styles.rejectCtaTxt}>PACK NOW</Text>
            {/* {invoiceLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )} */}
          </TouchableOpacity>
        ) : cta == 'ADD_SERIAL_NUMBER' ? (
          <TouchableOpacity
            style={[
              styles.DownloadPoBtn,
              {
                flex: actionCTA.length > 1 ? 5 : 1,
                flexBasis: actionCTA.length > 1 ? '48%' : '100%',
              },
            ]}
            onPress={() => setAddViewModal(true)}>
            <Text style={styles.rejectCtaTxt}>ADD SERIAL NUMBER</Text>
          </TouchableOpacity>
        ) : cta == 'VIEW_SERIAL_NUMBER' ? (
          <TouchableOpacity
            style={[
              styles.DownloadPoBtn,
              {
                // flex: actionCTA.length > 1 ? 5 : 1,
                // flexBasis: actionCTA.length > 1 ? '50%' : '100%',
                flex: ctaLength.length ? 5 : 1,
                flexBasis: ctaLength.length ? '45%' : '100%',
              },
            ]}
            onPress={() => setAddViewModal(true)}>
            <Text style={styles.rejectCtaTxt}>VIEW SERIAL NUMBER</Text>
          </TouchableOpacity>
        ) : cta == 'SPLIT_QUANTITY' ? (
          <TouchableOpacity
            style={[
              styles.DownloadPoBtn,
              {
                // flex: actionCTA.length > 1 ? 5 : 1,
                // flexBasis: actionCTA.length > 1 ? '50%' : '100%',
                flex: ctaLength.length ? 5 : 1,
                flexBasis: ctaLength.length ? '45%' : '100%',
              },
            ]}
            onPress={() => setSplitQuantityModal(true)}>
            <Text style={styles.rejectCtaTxt}>SPLIT QUANTITY</Text>
          </TouchableOpacity>
        ) : cta == 'MARK_OUT_FOR_DOOR_DELIVERY_WITH_POD' ? (
          <TouchableOpacity
            disabled={invoiceLoader}
            onPress={() => setProofOfDelivery(true)}
            style={[
              styles.DownloadPoBtn,
              {
                flex: actionCTA.length > 1 ? 5 : 1,
                flexBasis: actionCTA.length > 1 ? '48%' : '100%',
              },
            ]}>
            <Text style={styles.rejectCtaTxt}>PROOF OF DELIVERY</Text>
            {invoiceLoader && (
              <ActivityIndicator
                color={Colors.FontColor}
                style={{alignSelf: 'center'}}
              />
            )}
          </TouchableOpacity>
        ) : cta == 'MAP_PO_TO_INVOICE_DISABLED' ? (
          <>
            <TouchableOpacity
              disabled={true}
              style={[
                styles.disabledbtn,
                {
                  flex: actionCTA.length > 1 ? 5 : 1,
                  flexBasis: actionCTA.length > 1 ? '48%' : '100%',
                },
              ]}>
              <Text style={styles.disabledBtntxt}>Map PO to Invoice</Text>
            </TouchableOpacity>
            {/* <Text style={{fontSize: 12, fontWeight: 'bold', color: 'blue'}}>
              Shipment lable not created
            </Text> */}
          </>
        ) : cta == 'MAP_INVOICE_PENDING' ? (
          <>
            <View style={{flexDirection: 'column', flex: 35}}>
              <TouchableOpacity
                disabled={true}
                style={[
                  styles.disabledbtn,
                  {
                    // flex: actionCTA.length > 1 ? 5 : 1,
                    // flexBasis: actionCTA.length > 1 ? '50%' : '100%',
                    flex: ctaLength.length ? 0 : 1,
                    flexBasis: ctaLength.length ? '45%' : '100%',
                  },
                ]}>
                <Text style={styles.disabledBtntxt}>Upload Invoice</Text>
              </TouchableOpacity>
              <Text style={styles.shipmentLbelTxt}>
                Invoice Approval pending
              </Text>
            </View>
          </>
        ) : cta == 'PACK_ORDER_DISABLED' ? (
          <>
            <TouchableOpacity
              disabled={true}
              style={[
                styles.disabledbtn,
                {
                  flex: actionCTA.length > 1 ? 5 : 1,
                  flexBasis: actionCTA.length > 1 ? '48%' : '100%',
                },
              ]}>
              <Text style={styles.disabledBtntxt}>Pack Order</Text>
            </TouchableOpacity>
            {/* <Text style={{fontSize: 12, fontWeight: 'bold', color: 'blue'}}>
              Shipment lable not created
            </Text> */}
          </>
        ) : cta == 'PACK_ORDER_INVOICE_DISABLED' ? (
          <>
            <TouchableOpacity
              disabled={true}
              style={[
                styles.disabledbtn,
                {
                  flex: actionCTA.length > 1 ? 5 : 1,
                  flexBasis: actionCTA.length > 1 ? '48%' : '100%',
                },
              ]}>
              <Text style={styles.disabledBtntxt}>Pack Order Invoice</Text>
            </TouchableOpacity>
            {/* <Text style={{fontSize: 12, fontWeight: 'bold', color: 'blue'}}>
              Shipment lable not created
            </Text> */}
          </>
        ) : cta == 'CREATE_MANIFEST_DISABLED' ? (
          <>
            <View style={{flexDirection: 'column', flex: 0, flexBasis: '50%'}}>
              <TouchableOpacity
                disabled={true}
                style={[
                  styles.disabledbtn,
                  {
                    // flex: actionCTA.length > 1 ? 5 : 1,
                    // flexBasis: actionCTA.length > 1 ? '50%' : '100%',
                    flex: ctaLength.length ? 5 : 1,
                    flexBasis: ctaLength.length ? '45%' : '100%',
                  },
                ]}>
                <Text style={styles.disabledBtntxt}>Create Manifest</Text>
              </TouchableOpacity>
              <Text numberOfLines={2} style={styles.shipmentLbelTxt}>
                Shipment lable not created
              </Text>
            </View>
          </>
        ) : cta == 'CREATE_MANIFEST' ? (
          <TouchableOpacity
            onPress={createManifest}
            style={[
              styles.DownloadPoBtn,
              {
                // flex: actionCTA.length > 1 ? 5 : 1,
                // flexBasis: actionCTA.length > 1 ? '50%' : '100%',
                flex: ctaLength.length ? 0 : 1,
                flexBasis: ctaLength.length ? '45%' : '100%',
              },
            ]}
            disabled={manifestLoader}>
            <Text style={styles.rejectCtaTxt}>Create Manifest</Text>
            {manifestLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : cta == 'DOWNLOAD_SHIPMENT_LABEL' ? (
          <TouchableOpacity
            onPress={() => getShipmentLabel(shipmentUrl)}
            style={[
              styles.DownloadPoBtn,
              {
                flex: ctaLength.length ? 5 : 1,
                flexBasis: ctaLength.length ? '49%' : '100%',
                // flex: actionCTA.length > 1 ? 5 : 1,
                // flexBasis: actionCTA.length > 1 ? '50%' : '100%',
              },
            ]}
            disabled={manifestLoader}>
            <Text style={styles.rejectCtaTxt}>Download Shipment Label</Text>
            {manifestLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : null}
      </>
    );
    // }
  };

  const renderPartialCTAs = (url, fromCTA, podurl) => {
    return (actionCTA || []).map((_, i) => {
      if (i < 2) {
        return renderCTAs(_, url, fromCTA, true, podurl);
      }
    });
  };

  const renderFurtherCTAs = (url, fromCTA, podurl) => {
    return (actionCTA || []).map((_, i) => {
      if (i > 1) {
        return renderCTAs(_, url, fromCTA, true, podurl);
      }
    });
  };

  const toggleMoreCTAs = () => {
    setShowMoreCTA(!showMoreCTA);
  };

  const toggleOrder = () => {
    setIsOrderVisible(!isOrderVisible);
  };

  const onMarkForDelivery = async () => {
    const {data} = await markOutForOrderApi(supplierId, itemId);
    if (data.success) {
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
      props.setLoadingTabs(true);
    }
    setMarkForDelivery(false);
  };

  const onProofOfDeliveryDone = () => {
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
    props.setLoadingTabs(true);
  };

  const renderOrderDetails = (fromModal, fromCTA) => {
    return (
      <>
        <View
          style={[
            fromModal
              ? styles.orderCardwrapInnerModal
              : styles.orderCardwrapInner,
          ]}>
          {!fromModal &&
          (selectedTab == 'PENDING_ACCEPTANCE' || selectedTab == 'SHIPMENT') ? (
            <CustomeIcon
              name={
                (bulkItemIds || []).includes(itemId)
                  ? 'checkbox-tick'
                  : 'checkbox-blank'
              }
              color={
                (bulkItemIds || []).includes(itemId)
                  ? Colors.BrandColor
                  : Colors.FontColor
              }
              size={Dimension.font22}
              onPress={() =>
                selectedTab == 'SHIPMENT'
                  ? selectItemData({
                      itemId,
                      shipmentUrl,
                      invoiceUrl: podUrl || invoiceUrl,
                    })
                  : selectItemId(itemId)
              }
              style={{
                position: 'absolute',
                right: 0,
                zIndex: 9999,
              }}></CustomeIcon>
          ) : null}
          <View style={[fromModal ? styles.LeftpartModal : styles.leftpart]}>
            <Image
              // source={{
              //   uri:
              //     orderImage ||
              //     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
              // }}
              source={require('../assets/images/Prd.png')}
              style={[fromModal ? styles.imgStyleModal : styles.imgStyle]}
            />

            {!fromModal ? (
              <View style={styles.quantityTxt}>
                <Text style={styles.TitleLightTxt}>
                  Qty - <Text style={styles.TitleBoldTxt}>{quantity}</Text>
                </Text>
              </View>
            ) : null}
          </View>
          <View style={styles.rightPart}>
            <Text
              style={[
                fromModal
                  ? {color: Colors.FontColor}
                  : {color: Colors.BrandColor},
                styles.msnName,
              ]}>
              {msn}
            </Text>
            <View style={styles.productnameWrap}>
              {!fromModal ? (
                <Text
                  onTextLayout={onTextLayout}
                  numberOfLines={showMoreTxt ? undefined : 1}
                  style={styles.productName}>
                  {productName}
                </Text>
              ) : (
                <Text style={styles.productName}>{productName}</Text>
              )}
              {lengthMore && !fromModal ? (
                <Text onPress={toggleShowMoreTxt} style={styles.readMoretxt}>
                  {showMoreTxt ? 'Read less' : 'Read more'}
                </Text>
              ) : null}
            </View>
            {fromModal ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: Dimension.margin20,
                }}>
                <Text style={styles.TotalamounTxt}>
                  {' '}
                  <Text style={styles.rupeeSign}>₹ </Text>
                  {Math.floor(totalAmount)}
                </Text>
                <Text style={styles.taxpercentageTxt}>{taxPercentage}%</Text>
              </View>
            ) : null}
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: Dimension.margin20}}>
                <Text style={styles.TitleLightTxt}>
                  PO ID - <Text style={styles.TitleBoldTxt}>{orderRef}</Text>
                </Text>
                <Text style={styles.TitleLightTxt}>
                  PO Date -{' '}
                  <Text style={styles.TitleBoldTxt}>
                    {getTime(createdAt, false)}
                  </Text>
                </Text>
                <Text style={styles.TitleLightTxt}>
                  PO Item ID -{' '}
                  <Text style={styles.TitleBoldTxt}>{itemRef}</Text>
                </Text>
              </View>

              <View>
                <Text style={styles.TitleLightTxt}>
                  TP/Unit -{' '}
                  <Text style={styles.TitleBoldTxt}>
                    ₹{Math.floor(transferPrice)}
                  </Text>
                </Text>
                <Text style={styles.TitleLightTxt}>
                  Product HSN - <Text style={styles.TitleBoldTxt}>{hsn}</Text>
                </Text>
                <Text style={styles.TitleLightTxt}>
                  Date -{' '}
                  <Text style={styles.TitleBoldTxt}>
                    {getTime(pickupDate, false)}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: Dimension.margin10}}>
              <Text style={styles.GstWrapTxt}>{orderTypeString}</Text>
              <Text style={styles.shipmentModeWrap}>
                {shipmentMode == 2
                  ? 'Dropship'
                  : shipmentMode == 3
                  ? 'Door Delivery'
                  : shipmentType}
              </Text>
              {isVmi ? <Text style={styles.VMIWrap}>VMI</Text> : null}
              <Text style={styles.shipmentModeStringWrap}>
                {shipmentModeString}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={
            fromModal
              ? {
                  flexDirection: 'row',
                  flex: 1,
                  marginTop: Dimension.margin30,
                  padding: Dimension.padding15,
                  borderTopColor: Colors.grayShade1,
                  borderTopWidth: 1,
                }
              : {flexDirection: 'row', flex: 1, marginTop: Dimension.margin15}
          }>
          <View style={{flex: 9, flexDirection: 'row', flexWrap: 'wrap'}}>
            {renderPartialCTAs(invoiceUrl, fromCTA, podUrl)}
            {!showMoreCTA
              ? renderFurtherCTAs(invoiceUrl, fromCTA, podUrl)
              : null}
          </View>

          {actionCTA && actionCTA.length > 2 ? (
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={toggleMoreCTAs}
                style={styles.showMoreCta}>
                <Icon
                  name={showMoreCTA ? 'dots-horizontal' : 'close'}
                  color={Colors.FontColor}
                  size={Dimension.font20}></Icon>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </>
    );
  };

  return (
    <>
      <TouchableOpacity style={styles.orderCardwrap} onPress={toggleOrder}>
        {renderOrderDetails(false, '')}
        {isOrderVisible && (
          <Modal
            overlayPointerEvents={'auto'}
            isVisible={isOrderVisible}
            onTouchOutside={() => {
              setIsOrderVisible(false);
            }}
            onDismiss={() => {
              setIsOrderVisible(false);
            }}
            coverScreen={true}
            style={{padding: 0, margin: 0}}
            deviceWidth={deviceWidth}
            hasBackdrop={true}
            onBackdropPress={() => setIsOrderVisible(false)}
            onBackButtonPress={() => setIsOrderVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.topbdr}></View>
              <View style={styles.ModalheadingWrapper}>
                <CustomeIcon
                  name={'close'}
                  size={Dimension.font22}
                  color={Colors.FontColor}
                  onPress={() => setIsOrderVisible(false)}></CustomeIcon>
              </View>
              {renderOrderDetails(true, '')}
            </View>
          </Modal>
        )}
        {markForDelivery && (
          <MarkOutForDeliveryModal
            setModal={setMarkForDelivery}
            isVisible={markForDelivery}
            onMarkForDelivery={onMarkForDelivery}
          />
        )}
        {viewSplitHistory && (
          <SplitHistoryModal
            {...props}
            setModal={setViewSplitHistory}
            isVisible={viewSplitHistory}
          />
        )}
        {proofOfDelivery && (
          <ProofOfDeliveryModal
            {...props}
            setModal={setProofOfDelivery}
            onProofOfDeliveryDone={onProofOfDeliveryDone}
            isVisible={proofOfDelivery}
          />
        )}
        {showLspDetails && (
          <ViewLSPModal
            {...props}
            setModal={setShowLspDetails}
            isVisible={showLspDetails}
          />
        )}
        {packNow && (
          <PackNowModal
            onPackNowSuccess={onPackNowSuccess}
            {...props}
            setModal={setPackNow}
            isVisible={packNow}
          />
        )}
        {rejectModal && (
          <RejectModal
            rejectModal={rejectModal}
            setRejectModal={setRejectModal}
            selectedTab={selectedTab}
            shipmentType={shipmentType}
            itemId={itemId}
            fetchOrdersFunc={fetchOrdersFunc}
            fetchTabCountFunc={fetchTabCountFunc}
            setLoadingTabs={props.setLoadingTabs}
            msn={msn}
            quantity={quantity}
            orderRef={orderRef}
            itemRef={itemRef}
            createdAt={createdAt}
            transferPrice={transferPrice}
            hsn={hsn}
            pickupDate={pickupDate}
            productName={productName}
            orderTypeString={orderTypeString}
            shipmentMode={shipmentMode}
            isVmi={isVmi}
            shipmentModeString={shipmentModeString}
            actionCTA={actionCTA}
            taxPercentage={taxPercentage}
            totalAmount={totalAmount}
            invoiceUrl={invoiceUrl}
            orderImage={orderImage}
          />
        )}
      </TouchableOpacity>
      {displayCalendar && (
        <AcceptModal
          selectedTab={selectedTab}
          fetchOrdersFunc={fetchOrdersFunc}
          setLoadingTabs={props.setLoadingTabs}
          fetchTabCountFunc={fetchTabCountFunc}
          itemId={itemId}
          shipmentType={shipmentType}
          displayCalendar={displayCalendar}
          setDisplayCalendar={setDisplayCalendar}
          pickupDate={pickupDate}
        />
      )}
      {addViewModal && (
        <AddView
          addViewModal={addViewModal}
          setAddViewModal={setAddViewModal}
          selectedTab={selectedTab}
          itemId={itemId}
          fetchOrdersFunc={fetchOrdersFunc}
          fetchTabCountFunc={fetchTabCountFunc}
          setLoadingTabs={props.setLoadingTabs}
          msn={msn}
          quantity={quantity}
          orderRef={orderRef}
          itemRef={itemRef}
          createdAt={createdAt}
          transferPrice={transferPrice}
          hsn={hsn}
          pickupDate={pickupDate}
          productName={productName}
          orderTypeString={orderTypeString}
          shipmentMode={shipmentMode}
          isVmi={isVmi}
          shipmentModeString={shipmentModeString}
          actionCTA={actionCTA}
          taxPercentage={taxPercentage}
          totalAmount={totalAmount}
          invoiceUrl={invoiceUrl}
          orderImage={orderImage}
        />
      )}

      {splitQuantityModal && (
        <SplitQuantityModal
          splitQuantityModal={splitQuantityModal}
          setSplitQuantityModal={setSplitQuantityModal}
          selectedTab={selectedTab}
          itemId={itemId}
          fetchOrdersFunc={fetchOrdersFunc}
          fetchTabCountFunc={fetchTabCountFunc}
          setLoadingTabs={props.setLoadingTabs}
          msn={msn}
          quantity={quantity}
          orderRef={orderRef}
          itemRef={itemRef}
          createdAt={createdAt}
          transferPrice={transferPrice}
          hsn={hsn}
          pickupDate={pickupDate}
          productName={productName}
          orderTypeString={orderTypeString}
          shipmentMode={shipmentMode}
          isVmi={isVmi}
          shipmentModeString={shipmentModeString}
          actionCTA={actionCTA}
          taxPercentage={taxPercentage}
          totalAmount={totalAmount}
          invoiceUrl={invoiceUrl}
          orderImage={orderImage}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  TitleLightTxt: {
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    marginBottom: Dimension.margin5,
  },
  TitleBoldTxt: {
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomBoldFont,
  },
  msnName: {
    fontSize: Dimension.font12,
    // color: Colors.BrandColor,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  productnameWrap: {
    marginBottom: Dimension.margin10,
  },
  productName: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    marginTop: Dimension.margin5,
  },
  readMoretxt: {
    fontSize: Dimension.font12,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  GstWrapTxt: {
    paddingVertical: Dimension.padding4,
    paddingHorizontal: Dimension.padding10,
    fontSize: Dimension.font10,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
    backgroundColor: Colors.LightBrandColor,
    borderRadius: 2,
    marginRight: Dimension.margin5,
  },
  shipmentModeWrap: {
    paddingVertical: Dimension.padding4,
    paddingHorizontal: Dimension.padding10,
    fontSize: Dimension.font10,
    color: Colors.oneShipTxt,
    fontFamily: Dimension.CustomMediumFont,
    backgroundColor: Colors.oneShipLight,
    borderRadius: 2,
    marginRight: Dimension.margin5,
  },
  shipmentModeStringWrap: {
    paddingVertical: Dimension.padding4,
    paddingHorizontal: Dimension.padding10,
    fontSize: Dimension.font10,
    color: Colors.ApproveStateColor,
    fontFamily: Dimension.CustomMediumFont,
    backgroundColor: Colors.pickupLight,
    borderRadius: 2,
    marginRight: Dimension.margin5,
  },
  VMIWrap: {
    paddingVertical: Dimension.padding4,
    paddingHorizontal: Dimension.padding10,
    fontSize: Dimension.font10,
    color: Colors.VmiTxt,
    fontFamily: Dimension.CustomMediumFont,
    backgroundColor: Colors.VmiLight,
    borderRadius: 2,
    marginRight: Dimension.margin5,
  },
  orderCardwrap: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.BoxBorderColor,
    backgroundColor: Colors.WhiteColor,
    marginBottom: Dimension.margin8,
    paddingHorizontal: Dimension.padding12,
    paddingVertical: Dimension.padding12,
    flex: 1,

    marginHorizontal: Dimension.margin5,
  },
  orderCardwrapInner: {
    flexDirection: 'row',
    flex: 1,
  },
  leftpart: {
    flex: 2,
    marginRight: Dimension.margin12,
  },
  rightPart: {
    flex: 8,
  },
  imgStyle: {
    borderRadius: 4,
    backgroundColor: Colors.WhiteColor,
    padding: 2,
    width: Dimension.width50,
    height: Dimension.height50,
    //alignSelf:'center'
  },

  imgStyleModal: {
    borderRadius: 4,
    backgroundColor: Colors.WhiteColor,
    padding: 2,
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  quantityTxt: {
    alignSelf: 'center',
    backgroundColor: '#E2E2E2',
    borderRadius: 2,
    marginTop: Dimension.margin8,
    width: '100%',
    alignItems: 'center',
    paddingVertical: Dimension.padding5,
  },
  modalContainer: {
    backgroundColor: Colors.WhiteColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingTop: Dimension.padding10,
  },
  acceptCtabtn: {
    flex: 5,
    backgroundColor: Colors.BrandColor,
    borderRadius: 4,
    flexBasis: '48%',
    paddingVertical: Dimension.padding8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Dimension.margin10,
  },
  acceptCtaTxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.WhiteColor,
    fontSize: Dimension.font12,
  },
  rejectCtabtn: {
    flex: 5,
    backgroundColor: Colors.grayShade12,
    borderRadius: 4,
    flexBasis: '48%',
    paddingVertical: Dimension.padding8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectCtaTxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.FontColor,
    fontSize: Dimension.font12,
  },
  rejectCtaTxtDisabled: {
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.eyeIcon,
    fontSize: Dimension.font12,
  },
  DownloadPoBtn: {
    flex: 5,
    backgroundColor: Colors.WhiteColor,
    borderRadius: 4,
    paddingVertical: Dimension.padding8,
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '48%',
    marginTop: Dimension.margin10,
    borderColor: Colors.grayShade15,
    borderWidth: 1,
    marginHorizontal: Dimension.margin5,
    flexDirection: 'row',
  },
  disabledbtn: {
    flex: 5,
    backgroundColor: Colors.grayshade16,
    borderRadius: 4,
    paddingVertical: Dimension.padding8,
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '48%',
    marginTop: Dimension.margin10,
    borderColor: Colors.BoxBorderColor,
    borderWidth: 1,
  },
  disabledBtntxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.eyeIcon,
    fontSize: Dimension.font12,
  },
  shipmentLbelTxt: {
    fontFamily: Dimension.CustomMediumFont,
    color: Colors.BlueShade,
    fontSize: Dimension.font10,
    flexBasis: '100%',
    marginTop: Dimension.margin5,
  },
  // DownloadPoBtn: {
  //   flex: 1,
  //   backgroundColor: Colors.grayShade12,
  //   borderRadius: 4,
  //   paddingVertical: Dimension.padding8,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexBasis: '100%',
  //   marginTop: Dimension.margin10,
  // },
  DownloadPoBtnDisabled: {
    flex: 1,
    backgroundColor: Colors.grayshade16,
    borderRadius: 4,
    paddingVertical: Dimension.padding8,
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '100%',
    marginTop: Dimension.margin10,
    borderColor: Colors.BoxBorderColor,
    borderWidth: 1,
  },
  showMoreCta: {
    marginLeft: Dimension.margin10,
    paddingVertical: Dimension.padding6,
  },
  LeftpartModal: {flex: 1},
  orderCardwrapInnerModal: {paddingHorizontal: Dimension.padding15},
  rupeeSign: {
    fontFamily: Dimension.CustomRobotoBold,
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    marginRight: Dimension.margin5,
  },
  TotalamounTxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    fontSize: Dimension.font12,
    color: Colors.FontColor,
  },
  taxpercentageTxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    fontSize: Dimension.font12,
    color: Colors.greenShade,
    marginLeft: Dimension.margin5,
  },
  topbdr: {
    alignSelf: 'center',
    height: 3,
    backgroundColor: Colors.modalBorder,
    borderRadius: 2,
    width: Dimension.width70,
  },
  ModalheadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: Dimension.padding15,
  },
});
export default React.memo(Ordercard);
