import React, {useEffect,useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../component/common/Header';
import {logout} from '../../redux/actions/profile';
import Dimension from '../../Theme/Dimension';
import Colors from '../../Theme/Colors';
import CustomeIcon from '../../component/common/CustomeIcon';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import CustomButton from '../../component/common/Button';
import Modal from 'react-native-modal';
const SettingsScreen = props => {
  const [showLogoutModal, setshowLogoutModal] = useState(false);
  const token = useSelector(state => (state.profileReducer || {}).token || '');
  const dispatch = useDispatch();
  console.log( " logout" ,showLogoutModal);
  const onLogout = async () => {
    await AsyncStorage.removeItem('onlineShipmentMode');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('fcmToken');
    await AsyncStorage.removeItem('onlineFlag');
    await AsyncStorage.removeItem('enterpriseFlag');
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
    props.route.params.setIsLoggedIn(false);
    dispatch(logout(token));
  };

  useEffect(() => {
    GoogleSignin.configure({});
  }, []);

  return (
    <>
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <AppHeader
        showText={'Settings'}
        navigation={props.navigation}
        showBack
        showBell
      />
      <View style={styles.bgWrapper}>
        <Text style={styles.headingtxt}>SMS PREFERENCES</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: Dimension.margin10,
          }}>
          <Text style={styles.nrmtxt}>
            Orders related SMS cannot be disabled as the are Critical to provide
            Services
          </Text>
        </View>
      </View>
      <View style={styles.bgWrapper}>
        <Text style={styles.headingtxt}>NOTIFICATION SETTINGS</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: Dimension.margin10,
          }}>
          <Text style={styles.nrmtxt}>Order Related in app Notifications</Text>
          <CustomeIcon
            name={'toggle-line'}
            color={Colors.SuccessStateColor}
            size={Dimension.font22}></CustomeIcon>
        </View>
      </View>
      <View style={styles.logoutBtnWrap}>
        <TouchableOpacity onPress={() => setshowLogoutModal(true)} style={styles.logoutBtn}>
          <Text style={styles.logoutBtnTxt}>LOGOUT</Text>
          <CustomeIcon
            name={'shut-down'}
            color={Colors.FontColor}
            size={Dimension.font22}></CustomeIcon>
        </TouchableOpacity>
      </View>
    </View>
    <Modal
   // animationType="slide"
   // overlayPointerEvents={'auto'}
    isVisible={showLogoutModal}
    onTouchOutside={() => setshowLogoutModal(false)}
    //transparent={transparent}
    hasBackdrop={true}
    backdropOpacity={0.4}
    style={{padding:0,margin:0}}
    >
    <View
      style={{
        flex: 1,
        backgroundColor: '#0000004D',
      }}>
      <View style={styles.modalContainer}>
      <View style={styles.topbdr}></View>
        <View style={styles.ModalheadingWrapper}>
          <TouchableOpacity onPress={() => setshowLogoutModal(false)}>
            <CustomeIcon
              name={'close'}
              size={Dimension.font22}
              color={Colors.FontColor}
              style={{alignSelf:"flex-end"}}
            />
          </TouchableOpacity>
          <Text style={styles.ModalHeading}>
          Are you sure you want to logout?
          </Text>
        </View>
        <View style={styles.midWrap}>
        <Text style={styles.midText}>By logging out you might miss your Orders to which need approval</Text>
     
        </View>
        </View>
      <View style={styles.bottombtnWrap}>
        <View style={{flex:1}}>
        <CustomButton
          buttonColor={Colors.WhiteColor}
          borderColor={Colors.WhiteColor}
          TextColor={Colors.FontColor}
          TextFontSize={Dimension.font16}
          title={'CONFIRM'}
         // loading={loading}
          onPress={onLogout}
        />
        </View>
        <View style={{flex:1}}>
        <CustomButton
          buttonColor={Colors.BrandColor}
          borderColor={Colors.BrandColor}
          TextColor={Colors.WhiteColor}
          TextFontSize={Dimension.font16}
          title={'CANCEL'}
         // loading={loading}
          onPress={() => setshowLogoutModal(false)}
        />
        </View>
      </View>
    </View>
  </Modal>
  </>
  );
};

const styles = StyleSheet.create({
  logoutBtnWrap: {
    paddingHorizontal: Dimension.padding20,
    paddingVertical: Dimension.paddng15,
    backgroundColor: Colors.WhiteColor,
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Dimension.padding20,
    paddingVertical: Dimension.padding12,
    borderRadius: 4,
    backgroundColor: Colors.grayShade1,
  },
  logoutBtnTxt: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  bgWrapper: {
    borderRadius: 4,
    backgroundColor: Colors.grayShade1,
    padding: Dimension.padding10,
    marginHorizontal: Dimension.margin20,
    marginBottom: Dimension.margin20,
  },
  headingtxt: {
    fontSize: Dimension.font12,
    color: Colors.eyeIcon,
    fontFamily: Dimension.CustomMediumFont,
    marginBottom: Dimension.margin5,
  },
  nrmtxt: {
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  modalContainer: {
    backgroundColor: Colors.WhiteColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    marginTop: 'auto',
    paddingTop: Dimension.padding20,
  },
  bottombtnWrap: {
    padding: Dimension.padding15,
    borderTopColor: Colors.grayShade2,
    borderTopWidth: 1,
    backgroundColor: Colors.WhiteColor,
    flexDirection:"row"
  },
  ModalheadingWrapper: {
   
    paddingHorizontal: Dimension.padding15,
    marginBottom: Dimension.margin20,
  },
  midWrap:{
    paddingHorizontal: Dimension.padding15,
    marginBottom:Dimension.margin50
  },
  midText:{
    fontSize: Dimension.font16,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  ModalHeading: {
    fontSize: Dimension.font16,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginBottom: Dimension.margin20,
  },
  topbdr: {
    alignSelf: 'center',
    height: 3,
    backgroundColor: Colors.modalBorder,
    borderRadius: 2,
    width: Dimension.width70,
  },
});

export default SettingsScreen;
