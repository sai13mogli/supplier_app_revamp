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
import {addMultipleBrands} from '../../../../redux/actions/categorybrand';
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
    let currbrands = [...userBrands];
    currbrands = (currbrands || []).map(_ => ({
      ..._,
      brandName: _.brandName || _.brandCode,
      confirmed: _.confirmed || false,
      localbrand: _.localbrand || false,
    }));
    dispatch(addMultipleBrands(currbrands));
    props.navigation.navigate('CategoryBrand');
  };

  const onCancel = () => {
    let currbrands = [...userBrands];
    currbrands = (currbrands || []).filter(_ => _.isRaiseRequest == 'false');
    dispatch(addMultipleBrands(currbrands));
    props.navigation.navigate('CategoryBrand');
  };

  const onBrandsSubmit = () => {
    let isbrands = (userBrands || []).filter(
      _ => _.isRaiseRequest == 'true' && !_.confirmed,
    ).length;
    if (isbrands) {
      setModalVisible(true);
    } else {
      onConfirm();
    }
  };

  return (
    <>
      <Header
        showBack
        showBell
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
            onPress={onBrandsSubmit}
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
                {(userBrands || []).filter(
                  _ => _.isRaiseRequest == 'true' && !_.confirmed,
                ).length < 10
                  ? `0${
                      (userBrands || []).filter(
                        _ => _.isRaiseRequest == 'true' && !_.confirmed,
                      ).length
                    }`
                  : (userBrands || []).filter(
                      _ => _.isRaiseRequest == 'true' && !_.confirmed,
                    ).length}
              </Text>{' '}
              brands
            </Text>
          </View>
          <MultiSelect
            data={(userBrands || []).filter(
              _ => _.isRaiseRequest == 'true' && !_.confirmed,
            )}
            onChangeDataChoosed={data => {}}
            fromAllBrands={true}
            notSure={false}
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
                onPress={onCancel}></CustomButton>
            </View>
            <View style={{flex: 1}}>
              <CustomButton
                title="CONFIRM"
                disabled={
                  (userBrands || []).filter(
                    _ => _.isRaiseRequest == 'true' && !_.confirmed,
                  ).length
                    ? false
                    : true
                }
                buttonColor={
                  (userBrands || []).filter(
                    _ => _.isRaiseRequest == 'true' && !_.confirmed,
                  ).length
                    ? Colors.BrandColor
                    : Colors.DisableStateColor
                }
                borderColor={
                  (userBrands || []).filter(
                    _ => _.isRaiseRequest == 'true' && !_.confirmed,
                  ).length
                    ? Colors.BrandColor
                    : Colors.DisableStateColor
                }
                TextColor={
                  (userBrands || []).filter(
                    _ => _.isRaiseRequest == 'true' && !_.confirmed,
                  ).length
                    ? Colors.WhiteColor
                    : Colors.FontColor
                }
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

export default BrandScreen;
