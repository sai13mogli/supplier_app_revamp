import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import colors from '../../../../Theme/Colors';
import {useSelector, useDispatch} from 'react-redux';
import Dimension from '../../../../Theme/Dimension';
import CustomeIcon from '../../../../component/common/CustomeIcon';
import styles from './styles';

const Accounts = props => {
  const bankDetails = useSelector(
    state => state.profileReducer.bankDetails.data || {},
  );
  const profileData = useSelector(state => state.profileReducer.data || {});

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.ContainerCss}>
        <View style={styles.pendingBox}>
          <View style={styles.pendingWrap}>
            <Text style={styles.Pendingtxt}>
              Bank Account Details Provided To Moglix
            </Text>
            {profileData?.verificationStatus < 10 ? (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('EditBankAccount', {
                    editID: bankDetails.id,
                  });
                }}>
                <View style={{flexDirection: 'row'}}>
                  <CustomeIcon
                    name={'edit-box'}
                    size={Dimension.font16}
                    color={colors.BrandColor}
                  />
                  <Text style={styles.addnewtxt}>Edit</Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: Dimension.padding15,
            }}>
            <View style={styles.HeadingWrap}>
              <Text style={styles.DetailHeading}>Name</Text>
              <Text style={styles.DetailHeading}>Account No</Text>
              <Text style={styles.DetailHeading}>Account Type</Text>
              <Text style={styles.DetailHeading}>IFSC</Text>
              <Text style={styles.DetailHeading}>Bank name</Text>
              <Text style={styles.DetailHeading}>Branch</Text>
              {/* <Text style={styles.Detailtxt}>
                Branch code
              </Text> */}
            </View>

            <View style={styles.textWrap}>
              <Text style={[styles.Detailtxt]}>
                {bankDetails.accountHolderName}
              </Text>
              <Text style={styles.Detailtxt}>{bankDetails.accountNumber}</Text>
              <Text style={styles.Detailtxt}>
                {bankDetails.accountType == 1
                  ? 'Current'
                  : bankDetails.accountType == 2
                  ? 'Saving'
                  : bankDetails.accountType == 3
                  ? 'Joint'
                  : ''}
              </Text>
              <Text style={styles.Detailtxt}>{bankDetails.ifscCode}</Text>
              <Text style={styles.Detailtxt}>{bankDetails.bankName}</Text>
              <Text style={styles.Detailtxt}>{bankDetails.branch}</Text>
              <Text style={styles.Detailtxt}>{/* {bankDetails.bra} */}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Accounts;
