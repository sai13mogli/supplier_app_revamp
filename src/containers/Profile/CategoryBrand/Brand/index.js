import React, {useEffect, useState, createRef} from 'react';
import {TouchableOpacity, Text, View, Dimensions, FlatList} from 'react-native';
import AllBrandsScreen from './AllBrands';
import PopularBrandsScreen from './PopularBrands';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../../../component/common/Button';
import styles from './style';
import Colors from '../../../../Theme/Colors';
import Dimension from '../../../../Theme/Dimension';
import Modal from 'react-native-modal';
import MultiSelect from '../../../../component/common/MultiSelect';
import {TOP_BRANDS_SCREENS} from '../../../../constants';
import Tabs from '../../../../component/common/Tabs';
import Header from '../../../../component/common/Header';
const deviceWidth = Dimensions.get('window').width;

const TABS = [
  {
    name: 'Popular Brands',
    key: 'popularbrands',
    component: PopularBrandsScreen,
    ref: createRef(),
    idx: 0,
  },
  {
    name: 'All Brands',
    key: 'allbrands',
    component: AllBrandsScreen,
    ref: createRef(),
    idx: 1,
  },
];

const BrandScreen = props => {
  const userBrands = useSelector(
    state => (state.categorybrandReducer || {}).userBrands || [],
  );
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const onConfirm = () => {
    props.navigation.navigate('CategoryBrand');
  };

  return (
    <>
      <Header
        showBack
        navigation={props.navigation}
        showText={'Brand Selection'}
        rightIconName={'category--brand'}
      />

      <Tabs data={TABS.map(_ => ({..._}))} />

      <View style={styles.bottombtnWrap}>
        <TouchableOpacity style={styles.BrandNumWrap}>
          <Text style={styles.BrandNumTitle}>Requested Brands</Text>
          <Text
            style={
              userBrands.length == 0 ? styles.BrandNumTxt : styles.BrandNumTxt1
            }>
            {userBrands.length}
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <CustomButton
            title={'SUBMIT'}
            onPress={() => {
              setModalVisible(true);
            }}
            disabled={!userBrands.length}
            TextColor={userBrands.length ? Colors.WhiteColor : Colors.FontColor}
            borderColor={
              userBrands.length ? Colors.BrandColor : Colors.grayShade1
            }
            buttonColor={
              userBrands.length ? Colors.BrandColor : Colors.grayShade1
            }
            TextFontSize={Dimension.font16}
          />
        </View>
      </View>

      <Modal
        overlayPointerEvents={'auto'}
        isVisible={modalVisible}
        ///isVisible={true}
        onTouchOutside={() => {
          setModalVisible(false);
        }}
        onDismiss={() => {
          setModalVisible(false);
        }}
        coverScreen={true}
        deviceWidth={deviceWidth}
        onBackButtonPress={() => {
          setModalVisible(false);
        }}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        deviceHeight={Dimensions.get('window').height * 0.9}
        style={{
          padding: 0,
          margin: 0,
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.topbdr}></View>
          <View style={styles.headingWrapper}>
            <Text style={styles.ModalheadingTxt}>
              Are you sure you want to create these
              <Text style={styles.redTxt}>
                {' '}
                {userBrands.length < 10
                  ? `0${userBrands.length}`
                  : userBrands.length}
              </Text>{' '}
              brands
            </Text>
          </View>
          <MultiSelect
            data={userBrands}
            onChangeDataChoosed={data => {
              console.log(data);
            }}
            fromAllBrands={true}
            selectedValues={userBrands}
            fromBrand={true}
          />
          <View style={styles.ModalBtnWrap}>
            <View style={{flex: 1}}>
              <CustomButton
                title="CANCEL"
                buttonColor={Colors.WhiteColor}
                borderColor={Colors.WhiteColor}
                TextColor={Colors.FontColor}
                TextFontSize={Dimension.font16}
                onPress={() => {
                  setModalVisible(false);
                }}></CustomButton>
            </View>
            <View style={{flex: 1}}>
              <CustomButton
                title="CONFIRM"
                buttonColor={Colors.BrandColor}
                borderColor={Colors.BrandColor}
                TextColor={Colors.WhiteColor}
                TextFontSize={Dimension.font16}
                loadingColor={'#fff'}
                onPress={() => {
                  setModalVisible(false);
                  onConfirm();
                }}></CustomButton>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const tabBarOptions = {
  activeTintColor: '#D9232D',
  inactiveTintColor: '#C4C4C4',
  showLabel: false,
  lazy: false,
  style: styles.tabBar,
  safeAreaInsets: {bottom: 0},
};

export default BrandScreen;
