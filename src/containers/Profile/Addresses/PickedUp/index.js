import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import colors from '../../../../Theme/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDeleteAddresses } from '../../../../redux/actions/profile';
import Dimension from '../../../../Theme/Dimension';
import CustomButton from '../../../../component/common/Button';
import CustomeIcon from '../../../../component/common/CustomeIcon';
import styles from './styles';
import { STATE_STATUS } from '../../../../redux/constants';
import { fetchProfile } from '../../../../redux/actions/profile';

const PickedUp = props => {
  const profileData = useSelector(state => state.profileReducer.data || {});
  const addressesResponse = useSelector(
    state => state.profileReducer.addressesDetails || [],
  );
  const [pickedUp, setPickedUp] = useState('PickedUp');
  const addressesDetailsStatus = useSelector(
    state =>
      state.profileReducer.addressesDetails.status || STATE_STATUS.FETCHING,
  );
  const addressesData = addressesResponse?.data;

  const dispatch = useDispatch();

  const filterById = obj => {
    if (obj.type == 4) {
      return true;
    }
    return false;
  };

  let PickupAddressData = addressesData.filter(filterById);
  const removeAddresses = async item => {
    const data = {
      id: item.id,
    };
    dispatch(fetchDeleteAddresses(data));
  };

  const onsubmit = () => {
    props.navigation.navigate("Profile")
    dispatch(fetchProfile())
  }

  const renderItems = ({ item }) => (
    <View style={{ flex: 1 }}>
      <View style={styles.wrap}>
        <View style={styles.nameWrap}>
          <Text style={styles.UserNameCss}>
            {(profileData.userInfo || {}).contactName}
          </Text>
          {item.isDefault ? (
            <Text style={styles.AddressType}>default</Text>
          ) : null}
        </View>
        <Text style={styles.AddressTxt}>
          {item.address1} ,{item.address2},{item.city}
        </Text>
        <Text style={styles.AddressTxt}>
          {item.state},{item.pincode}
        </Text>
        <View style={styles.buttonWrap}>
          {item.isDefault ? null : (
            <View style={{ marginRight: 15, flex: 1 }}>
              <CustomButton
                title={'REMOVE'}
                onPress={() => removeAddresses(item)}
                buttonColor={colors.WhiteColor}
                TextColor={colors.FontColor}
                borderColor={colors.grayShade1}
                TextFontSize={Dimension.font14}></CustomButton>
            </View>
          )}
          {profileData && profileData.verificationStatus !== 15 ? (
            <View style={{ flex: 1 }}>
              <CustomButton
                title={'EDIT'}
                buttonColor={colors.WhiteColor}
                onPress={() =>
                  props.navigation.navigate('EditAddress', {
                    editID: item.id,
                    addressesDetails: item,
                  })
                }
                TextColor={colors.BrandColor}
                borderColor={colors.BrandColor}
                TextFontSize={Dimension.font14}></CustomButton>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 0.9 }}>
      {addressesDetailsStatus == STATE_STATUS.FETCHING ? (
        <ActivityIndicator style={{ alignSelf: 'center', marginTop: 150 }} />
      ) : (
        <ScrollView style={styles.ContainerCss}>
          <View style={styles.TopWrap}>
            <Text style={styles.Pageheading}>
              {PickupAddressData.length} Pickup Addresses
            </Text>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('EditAddress', { tabState: pickedUp })
              }>
              {profileData && profileData.verificationStatus !== 15 ? (
                <View style={{ flexDirection: 'row' }}>
                  <CustomeIcon
                    name={'add-circle'}
                    size={Dimension.font18}
                    color={colors.BrandColor}
                  />
                  <Text style={styles.addnewtxt}> Add new</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          </View>

          <FlatList
            data={PickupAddressData}
            renderItem={renderItems}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      )}
      {profileData && profileData.verificationStatus !== 15 ? (
        <View style={styles.bottombtnWrap}>
          <CustomButton
            buttonColor={colors.BrandColor}
            borderColor={colors.BrandColor}
            TextColor={colors.WhiteColor}
            TextFontSize={Dimension.font16}
            title={'Submit'}
            onPress={onsubmit}
          // onPress={() => dispatch(fetchProfile())}
          />

        </View>
      ) : null}

    </View>
  );
};
export default PickedUp;
