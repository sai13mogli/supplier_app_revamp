import React from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';

const deviceWidth = Dimensions.get('window').width;

const MarkOutForDeliveryModal = props => {
  const {isVisible, setModal, onMarkForDelivery} = props;

  return (
    <Modal
      overlayPointerEvents={'auto'}
      isVisible={isVisible}
      onTouchOutside={() => {
        setModal(false);
      }}
      onDismiss={() => {
        setModal(false);
      }}
      coverScreen={true}
      style={{padding: 0, margin: 0}}
      deviceWidth={deviceWidth}
      hasBackdrop={true}
      onBackdropPress={() => setModal(false)}
      onBackButtonPress={() => setModal(false)}>
      <View style={styles.modalContainer}>
        <Text style={{color: '#000'}}>Mark out for Door Delivery</Text>
        <Text style={{color: '#000'}}>
          Are you sure you want to mark out for door delivery
        </Text>
        <View style={styles.ctaContainer}>
          <TouchableOpacity onPress={() => setModal(false)}>
            <Text style={{color: '#000'}}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onMarkForDelivery}>
            <Text style={{color: '#000'}}>Yes</Text>
          </TouchableOpacity>
        </View>
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
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default MarkOutForDeliveryModal;
