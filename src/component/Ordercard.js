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
import {getImageUrl, markOutForOrderApi} from '../services/orders';
import Dimension from '../Theme/Dimension';
import Colors from '../Theme/Colors';
import CustomeIcon from './common/CustomeIcon';
import Modal from 'react-native-modal';
import {acceptOrder, getpoChallan, rejectOrder} from '../services/orders';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PackNowModal from '../component/PackNowModal';
import RejectModal from '../component/RejectModal';
import MarkOutForDeliveryModal from '../component/MarkOutForDeliveryModal';
import ViewLSPModal from '../component/ViewLSPModal';
import SplitHistoryModal from '../component/SplitHistoryModal';
import ProofOfDeliveryModal from '../component/ProofOfDeliveryModal';
import AcceptModal from './AcceptModal';
import AddView from './AddView';
import SplitQuantityModal from './SplitQuantityModal';

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
  } = props;
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
  };

  const getPOInvoice = (fromPO, invoiceUrl) => {
    if (Platform.OS == 'android') {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ).then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Storage Permission Granted.');
            downloadPDF(fromPO, invoiceUrl);
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

  const downloadPDF = async (isPO, pdfUrl) => {
    //Main function to download the image
    let date = new Date(); //To add the time suffix in filename

    try {
      let image_URL = '';
      if (isPO) {
        setPoLoader(true);
        const {data} = await getpoChallan(orderRef);
        if (data && data.success) {
          //Image URL which we want to download
          image_URL = data.responseMessage;
        }
      } else {
        //Image URL which we want to download
        setInvoiceLoader(true);
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
          console.log('res -> ', JSON.stringify(res));
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
      if (isPO) {
        setPoLoader(false);
      } else {
        setInvoiceLoader(false);
      }
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

  const renderCTAs = (cta, url, fromCTA) => {
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
        ) : cta == 'DOWNLOAD_PO_EMS' ? (
          <TouchableOpacity
            disabled={poLoader}
            onPress={() => getPOInvoice(true, '')}
            style={styles.DownloadPoBtn}>
            <Text style={styles.rejectCtaTxt}>DOWNLOAD PO</Text>
            {poLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : cta == 'DOWNLOAD_PO_OMS' ? (
          <TouchableOpacity
            disabled={invoiceLoader}
            onPress={() => getPOInvoice(false, url)}
            style={styles.DownloadPoBtn}>
            <Text style={styles.rejectCtaTxt}>DOWNLOAD Invoice</Text>
            {invoiceLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : cta == 'MAP_INVOICE' ? (
          <TouchableOpacity
            disabled={invoiceLoader}
            style={styles.DownloadPoBtn}>
            <Text style={styles.rejectCtaTxt}>UPLOAD INVOICE</Text>
            {invoiceLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : cta == 'MARK_OUT_FOR_DOOR_DELIVERY' ? (
          <TouchableOpacity
            disabled={invoiceLoader}
            onPress={() => setMarkForDelivery(true)}
            style={styles.DownloadPoBtn}>
            <Text style={styles.rejectCtaTxt}>MARK OUT FOR DELIVERY</Text>
            {invoiceLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : cta == 'VIEW_TREE_MODAL' ? (
          <TouchableOpacity
            disabled={invoiceLoader}
            onPress={() => setViewSplitHistory(true)}
            style={styles.DownloadPoBtn}>
            <Text style={styles.rejectCtaTxt}>VIEW SPLIT HISTORY</Text>
            {invoiceLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : cta == 'VIEW_SHIPPED_DETAILS' ? (
          <TouchableOpacity
            disabled={invoiceLoader}
            onPress={() => setShowLspDetails(true)}
            style={styles.DownloadPoBtn}>
            <Text style={styles.rejectCtaTxt}>VIEW LSP DETAILS</Text>
            {invoiceLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : cta == 'PACK_ORDER' ? (
          <TouchableOpacity
            disabled={invoiceLoader}
            onPress={() => setPackNow(true)}
            style={styles.DownloadPoBtn}>
            <Text style={styles.rejectCtaTxt}>PACK NOW</Text>
            {invoiceLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : cta == 'ADD_SERIAL_NUMBER' ? (
          <TouchableOpacity
            style={styles.DownloadPoBtn}
            onPress={() => setAddViewModal(true)}>
            <Text style={styles.rejectCtaTxt}>ADD SERIAL NUMBER</Text>
          </TouchableOpacity>
        ) : cta == 'VIEW_SERIAL_NUMBER' ? (
          <TouchableOpacity
            style={styles.DownloadPoBtn}
            onPress={() => setAddViewModal(true)}>
            <Text style={styles.rejectCtaTxt}>VIEW SERIAL NUMBER</Text>
          </TouchableOpacity>
        ) : cta == 'SPLIT_QUANTITY' ? (
          <TouchableOpacity
            style={styles.DownloadPoBtn}
            onPress={() => setSplitQuantityModal(true)}>
            <Text style={styles.rejectCtaTxt}>SPLIT QUANTITY</Text>
          </TouchableOpacity>
        ) : cta == 'MARK_OUT_FOR_DOOR_DELIVERY_WITH_POD' ? (
          <TouchableOpacity
            disabled={invoiceLoader}
            onPress={() => setProofOfDelivery(true)}
            style={styles.DownloadPoBtn}>
            <Text style={styles.rejectCtaTxt}>PROOF OF DELIVERY</Text>
            {invoiceLoader && (
              <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
            )}
          </TouchableOpacity>
        ) : null}
      </>
    );
    // }
  };

  const renderPartialCTAs = (url, fromCTA) => {
    return (actionCTA || []).map((_, i) => {
      if (i < 2) {
        return renderCTAs(_, url, fromCTA);
      }
    });
  };

  const renderFurtherCTAs = (url, fromCTA) => {
    return (actionCTA || []).map((_, i) => {
      if (i > 1) {
        return renderCTAs(_, url, fromCTA);
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
    // console.log(itemId, supplierId);
    const {data} = await markOutForOrderApi(supplierId, itemId);
    console.log(data);
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
          {!fromModal && selectedTab == 'PENDING_ACCEPTANCE' ? (
            
            <CustomeIcon
                  name={
                    (bulkItemIds || []).includes(itemId) ? 'checkbox-tick'
                      : 'checkbox-blank'
                  }
                  color={(bulkItemIds || []).includes(itemId) ? Colors.BrandColor : Colors.FontColor}
                  size={Dimension.font22}
                  onPress={() => selectItemId(itemId)}
                  style={{position:'absolute',right:0,zIndex:9999}}
                  
                  >

                  </CustomeIcon>
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
            {renderPartialCTAs(invoiceUrl, fromCTA)}
            {!showMoreCTA ? renderFurtherCTAs(invoiceUrl, fromCTA) : null}
          </View>
          <View style={{flex: 1}}>
            {actionCTA && actionCTA.length > 2 ? (
              // <Text onPress={toggleMoreCTAs} style={styles.readMoretxt}>
              //   {showMoreCTA ? 'Dots' : 'Close'}
              // </Text>
              <TouchableOpacity
                onPress={toggleMoreCTAs}
                style={styles.showMoreCta}>
                <Icon
                  name={showMoreCTA ? 'dots-horizontal' : 'close'}
                  color={Colors.FontColor}
                  size={Dimension.font20}></Icon>
              </TouchableOpacity>
            ) : null}
          </View>
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
          fetchTabCountFunc={fetchTabCountFunc}
          itemId={itemId}
          shipmentType={shipmentType}
          displayCalendar={displayCalendar}
          setDisplayCalendar={setDisplayCalendar}
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
  productName: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    marginBottom: Dimension.margin10,
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
    paddingVertical: Dimension.padding8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectCtaTxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.FontColor,
    fontSize: Dimension.font12,
  },
  DownloadPoBtn: {
    flex: 1,
    backgroundColor: Colors.grayShade12,
    borderRadius: 4,
    paddingVertical: Dimension.padding8,
    justifyContent: 'center',
    alignItems: 'center',

    flexBasis: '100%',
    marginTop: Dimension.margin10,
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
