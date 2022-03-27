import React, { useEffect, useState, } from 'react';
import { Text, View, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import colors from "../../../../Theme/Colors"
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import Dimension from "../../../../Theme/Dimension";
import CustomButton from '../../../../component/common/Button';
import CustomeIcon from '../../../../component/common/CustomeIcon';
import { fetchDeleteAddresses, fetchAddressDetails } from '../../../../redux/actions/profile';
import { STATE_STATUS } from '../../../../redux/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';


const Billing = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const profileData = useSelector(state => state.profileReducer.data || {});
  const addressesDetailsStatus = useSelector(state => (state.profileReducer.addressesDetails.status || STATE_STATUS.FETCHING));
  const addressesData = useSelector(state => state.profileReducer.addressesDetails.data || {});
  const { navigate } = useNavigation()
  const navigation = useNavigation()
  const dispatch = useDispatch();

  const filterById = (obj) => {
    if (obj.type == 3) {
      return true
    }
    return false;
  }

  var BillingAddressData = addressesData.filter(filterById);

  useEffect(() => {
    if (loading && addressesDetailsStatus == STATE_STATUS.UPDATED) {
      alert("hi", addressesDetailsStatus == STATE_STATUS.UPDATED)

      dispatch(fetchAddressDetails());
    }
  });

  // var sortedData = BillingAddressData.sort(function (x) {
  //   return (x.default == 'true') ? 0 : x ? -1 : 1;
  // });

  const removeAddresses = async (item) => {
    const data = {
      supplierId: await AsyncStorage.getItem('userId'),
      id: item.id
    }
    dispatch(fetchDeleteAddresses(data));
  }
  const renderItems = ({ item }) => (
    <View style={{ flex: 1, }}>
      <View style={styles.wrap}>
        <View style={styles.nameWrap}>
          <Text style={styles.UserNameCss}>{(profileData.userInfo || {}).contactName}</Text>
          {
            item.isDefault ?
              <Text style={styles.AddressType}>default</Text> : null
          }
        </View>
        <Text style={styles.AddressTxt}>{item.address1},{item.address2},{item.city}</Text>
        <Text style={styles.AddressTxt}>{item.state},{item.pincode}</Text>
        <View style={styles.buttonWrap}>
          <View style={{ marginRight: 15, flex: 1 }}>
            <CustomButton
              title={"REMOVE"}
              buttonColor={colors.WhiteColor}
              onPress={() => removeAddresses(item)}
              TextColor={colors.FontColor}
              borderColor={colors.grayShade1}
              TextFontSize={Dimension.font14}
            >

            </CustomButton>
          </View>
          <View style={{ flex: 1 }}>
            <CustomButton
              title={"EDIT"}
              buttonColor={colors.WhiteColor}
              onPress={() =>
                props.navigation.navigate('EditAddress',
                  {
                    editID: item.id,
                    addressesDetails: item
                  })
              }
              TextColor={colors.BrandColor}
              borderColor={colors.BrandColor}
              TextFontSize={Dimension.font14}
            />
          </View>

        </View>

      </View>
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.ContainerCss}>
        <View style={styles.TopWrap}>
          <Text style={styles.Pageheading}>
            {BillingAddressData.length} Billing Address
          </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('EditAddress')}
          >
            <View style={{ flexDirection: "row" }}>
              <CustomeIcon name={'add-circle'} size={Dimension.font18} color={colors.BrandColor} />
              <Text style={styles.addnewtxt}>
                Add new
              </Text>
            </View>
          </TouchableOpacity>

        </View>

        <FlatList
          data={BillingAddressData}
          renderItem={renderItems}
          keyExtractor={(item, index) => index.toString()}
        // keyExtractor={(item, index) => `${index}_item`}
        />
      </ScrollView>
      <View style={styles.bottombtnWrap}>
        <CustomButton
          buttonColor={colors.BrandColor}
          borderColor={colors.BrandColor}
          TextColor={colors.WhiteColor}
          TextFontSize={Dimension.font16}
          title={'NEXT'}
          loading={loading}
        //  onPress={onSubmit}
        />


      </View>
    </View>

  );
};

export default Billing;