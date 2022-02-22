import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
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
import {Tab, TabView} from 'react-native-elements';
const deviceWidth = Dimensions.get('window').width;

const TABS = [
  {
    name: 'PopularBrands',
    key: 'popularbrands',
    component: PopularBrandsScreen,
  },
  {
    name: 'AllBrands',
    key: 'allbrands',
    component: AllBrandsScreen,
  },
];

const BrandScreen = props => {
  const addedBrand = useSelector(
    state => (state.categorybrandReducer || {}).brandsAdded || [],
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const renderItem = ({item}) => (
    <Text style={{color: '#000'}}>{item.name}</Text>
  );

  return (
    <>
    <Header
        howBack
        showText={'Brand Selection'}
        rightIconName={'category--brand'}></Header>
      <Tabs data={TABS.map(_ => ({..._}))} />
      {/* <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'red',
          height: 3,
        }}
        variant="primary">
        <Tab.Item
          title="Popular Brands"
          titleStyle={{fontSize: 12}}
          icon={{name: 'timer', type: 'ionicon', color: 'white'}}
        />
        <Tab.Item
          title="All Brands"
          titleStyle={{fontSize: 12}}
          icon={{name: 'timer', type: 'ionicon', color: 'white'}}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{width: '100%'}}>
          <PopularBrandsScreen />
        </TabView.Item>
        <TabView.Item style={{width: '100%'}}>
          <AllBrandsScreen />
        </TabView.Item>
      </TabView> */}

      <View style={styles.bottombtnWrap}>
        <TouchableOpacity style={styles.BrandNumWrap}>
          <Text style={styles.BrandNumTitle}>Requested Brands</Text>
          <Text
            style={
              addedBrand.length == 0 ? styles.BrandNumTxt : styles.BrandNumTxt1
            }>
            {addedBrand.length}
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <CustomButton
            title={'SUBMIT'}
            onPress={() => {
              setModalVisible(true);
            }}
            disabled={!addedBrand.length}
            TextColor={addedBrand.length ? Colors.WhiteColor : Colors.FontColor}
            borderColor={
              addedBrand.length ? Colors.BrandColor : Colors.grayShade1
            }
            buttonColor={
              addedBrand.length ? Colors.BrandColor : Colors.grayShade1
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
                {addedBrand.length < 10
                  ? `0${addedBrand.length}`
                  : addedBrand.length}
              </Text>{' '}
              brands
            </Text>
          </View>
          <MultiSelect
            data={addedBrand}
            onChangeDataChoosed={data => {
              console.log(data);
            }}
            fromAllBrands={true}
            selectedValues={addedBrand}
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
                  props.navigation.navigate('CategoryBrand');
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
