import React, {useState} from 'react';
import {TouchableOpacity, Text, View, Dimensions} from 'react-native';
import {Tab, TabView} from 'react-native-elements';
import AllBrandsScreen from './AllBrands';
import PopularBrandsScreen from './PopularBrands';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../../../component/common/Button';
import styles from './style';
import Colors from '../../../../Theme/Colors';
import Modal from 'react-native-modal';
import MultiSelect from '../../../../component/common/MultiSelect';

const deviceWidth = Dimensions.get('window').width;
const BrandScreen = props => {
  const addedBrand = useSelector(
    state => (state.categorybrandReducer || {}).brandsAdded || [],
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <Tab
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
          icon={{name: 'cart', type: 'ionicon', color: 'white'}}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <PopularBrandsScreen />
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <AllBrandsScreen />
        </TabView.Item>
      </TabView>
      <TouchableOpacity>
        <Text style={{color: '#000'}}>Requested Brands</Text>
        <Text style={{color: '#000'}}>{addedBrand.length}</Text>
      </TouchableOpacity>
      <CustomButton
        title={'SUBMIT'}
        onPress={() => {
          setModalVisible(true);
        }}
        buttonStyle={styles.submit}
        disabled={!addedBrand.length}
        TextColor={Colors.WhiteColor}
        borderColor={Colors.WhiteColor}
        buttonColor={addedBrand.length ? Colors.BrandColor : 'dodgerblue'}
      />
      <Modal
        overlayPointerEvents={'auto'}
        isVisible={modalVisible}
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
        }}>
        <View>
          <Text style={{color: '#000'}}>
            Are you sure you want to create these
            <Text style={{color: 'red'}}>
              {addedBrand.length < 10
                ? `0${addedBrand.length}`
                : addedBrand.length}
            </Text>{' '}
            brands
          </Text>
          <MultiSelect
            data={addedBrand}
            onChangeDataChoosed={data => {
              console.log(data);
            }}
            fromAllBrands={true}
            selectedValues={addedBrand}
            fromBrand={true}
          />
          <CustomButton
            title={'CANCEL'}
            onPress={() => {
              setModalVisible(false);
            }}
            buttonStyle={styles.submit}
            TextColor={Colors.WhiteColor}
            borderColor={Colors.WhiteColor}
            buttonColor={'dodgerblue'}
          />
          <CustomButton
            title={'SUBMIT'}
            onPress={() => {
              setModalVisible(false);
              props.navigation.navigate('CategoryBrand');
            }}
            buttonStyle={styles.submit}
            disabled={!addedBrand.length}
            TextColor={Colors.WhiteColor}
            borderColor={Colors.WhiteColor}
            buttonColor={addedBrand.length ? Colors.BrandColor : 'dodgerblue'}
          />
        </View>
      </Modal>
    </>
  );
};

export default BrandScreen;
