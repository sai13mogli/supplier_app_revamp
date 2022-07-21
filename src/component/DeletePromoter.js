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
import CustomeIcon from './common/CustomeIcon';
import CustomButton from '../component/common/Button';
const deviceWidth = Dimensions.get('window').width;

const DeletePromoter = props => {
  const {isVisible, setModal, onDelete} = props;

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
        <View style={styles.topbdr}></View>
        <View style={styles.closeIconWrap}>
          <CustomeIcon
            name={'close'}
            size={Dimension.font22}
            color={Colors.FontColor}
            onPress={() => {
              setModal(false);
            }}
          />
        </View>
        <View style={styles.headerTxtWrap}>
          <Text style={styles.headerTxt}>Are you sure?</Text>
        </View>

        <Text style={styles.MidTxt}>
          Are you sure you want to delete this promoter ID?
        </Text>
        <View style={styles.bottomAction}>
          <View style={{flex: 1}}>
            <CustomButton
              title="NO"
              buttonColor={Colors.WhiteColor}
              borderColor={Colors.WhiteColor}
              TextColor={Colors.blackColor}
              TextFontSize={Dimension.font16}
              onPress={() => setModal(false)}
            />
          </View>
          <View style={{flex: 1}}>
            <CustomButton
              title="YES"
              // loading={loading}
              //disabled={loading}
              buttonColor={Colors.BrandColor}
              borderColor={Colors.BrandColor}
              TextColor={Colors.WhiteColor}
              TextFontSize={Dimension.font16}
              onPress={onDelete}
            />
          </View>

          {/* <TouchableOpacity onPress={() => setModal(false)}>
            <Text style={{color: '#000'}}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onMarkForDelivery}>
            <Text style={{color: '#000'}}>Yes</Text>
          </TouchableOpacity> */}
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
  topbdr: {
    alignSelf: 'center',
    height: 3,
    backgroundColor: Colors.modalBorder,
    borderRadius: 2,
    width: Dimension.width70,
  },
  closeIconWrap: {
    alignItems: 'flex-end',
    paddingHorizontal: Dimension.padding15,
  },
  headerTxtWrap: {
    paddingHorizontal: Dimension.padding15,
    marginBottom: Dimension.margin20,
  },
  MidTxt: {
    fontSize: Dimension.font16,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    paddingTop: Dimension.padding20,
    paddingBottom: Dimension.padding50,
    paddingHorizontal: Dimension.padding15,
  },
  headerTxt: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    // marginLeft:Dimension.margin10,
  },

  bottomAction: {
    borderTopWidth: 1,
    borderTopColor: Colors.grayShade2,
    padding: Dimension.padding15,
    backgroundColor: Colors.WhiteColor,
    //position: 'absolute',
    width: '100%',
    //bottom: 0,
    flexDirection: 'row',
  },
});

export default DeletePromoter;
