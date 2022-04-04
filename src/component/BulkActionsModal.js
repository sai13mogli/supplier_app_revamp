import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback, useEffect, useRef} from 'react';
import Dimension from '../Theme/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import Colors from '../Theme/Colors';
import Toast from 'react-native-toast-message';
import {createManifestApi} from '../services/orders';
const deviceWidth = Dimensions.get('window').width;

const BulkActionsModal = props => {
  const {
    bulkActionsModal,
    setBulkActionsModal,
    bulkItemIds,
    fetchOrdersFunc,
    fetchTabCountFunc,
    selectedTab,
    shipmentType,
  } = props;
  const [bulkActionsLoader, setBulkAcceptLoader] = useState(false);
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
        <TouchableOpacity
          onPress={bulkCreateManifest}
          style={{width: 200, height: 50, backgroundColor: 'red'}}>
          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#000'}}>
            Create Manifest
          </Text>
          {bulkActionsLoader && (
            <ActivityIndicator color={'#fff'} style={{alignSelf: 'center'}} />
          )}
        </TouchableOpacity>
      </View>
    </Modal>
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

  rejectCtabtn: {
    flex: 5,
    backgroundColor: Colors.BrandColor,
    borderRadius: 4,
    paddingVertical: Dimension.padding8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledrejectCtabtn: {
    flex: 5,
    backgroundColor: 'gray',
    borderRadius: 4,
    paddingVertical: Dimension.padding8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectCtaTxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.WhiteColor,
    fontSize: Dimension.font12,
  },
  disabledrejectCtaTxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    color: '#000',
    fontSize: Dimension.font12,
  },
  cancelBtn: {
    flex: 5,
    backgroundColor: Colors.WhiteColor,
    borderRadius: 4,
    paddingVertical: Dimension.padding8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  canceltxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.FontColor,
    fontSize: Dimension.font12,
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
  btnWrap: {
    flex: 1,
    flexDirection: 'row',
    padding: Dimension.padding15,
    borderTopWidth: 1,
    borderTopColor: Colors.grayShade1,
  },
});

export default BulkActionsModal;
