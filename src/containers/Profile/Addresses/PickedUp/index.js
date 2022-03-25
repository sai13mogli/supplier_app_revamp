import React, { useEffect, useState, } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import colors from "../../../../Theme/Colors"
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddressDetails } from '../../../../redux/actions/profile';
import Dimension from "../../../../Theme/Dimension";
import CustomButton from '../../../../component/common/Button';
import CustomeIcon from '../../../../component/common/CustomeIcon';
import styles from './styles';

const PickedUp = (props) => {

  const profileData = useSelector(state => state.profileReducer.data || {});
  const addressesData = useSelector(state => state.profileReducer.addressesDetails.data || {});
  const filterById = (obj) => {
    if (obj.type == 4) {
      return true
    }
    return false;
  }
  console.log(addressesData)
  var PickupAddressData = addressesData.filter(filterById);
  var sortedData = PickupAddressData.sort(function (x) {
    return (x.default == 'true') ? 0 : x ? -1 : 1;
  });

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
        <Text style={styles.AddressTxt}>{item.address1} ,{item.address2},{item.city}</Text>
        <Text style={styles.AddressTxt}>{item.state},{item.pincode}</Text>
        <View style={styles.buttonWrap}>
          <View style={{ marginRight: 15, flex: 1 }}>
            <CustomButton
              title={"REMOVE"}
              buttonColor={colors.WhiteColor}
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
            >

            </CustomButton>
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
            {PickupAddressData.length} Pickup Addresses
          </Text>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('EditAddress',
              )
            }
          >
            <View style={{ flexDirection: "row" }}>
              <CustomeIcon name={'add-circle'} size={Dimension.font18} color={colors.BrandColor} />
              <Text style={styles.addnewtxt}> Add new</Text>
            </View>
          </TouchableOpacity>

        </View>

        <FlatList
          data={PickupAddressData}
          renderItem={renderItems}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
      <View style={styles.bottombtnWrap}>


        <CustomButton
          title={'Submit'}
          buttonColor={colors.BrandColor}

          // onPress={navigateToAddresses}
          TextColor={colors.WhiteColor}
          borderColor={colors.WhiteColor}
          TextFontSize={Dimension.font16}
        />
      </View>
    </View>

  );
};
export default PickedUp;