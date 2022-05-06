import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../../../Theme/Colors';
import { useSelector, } from 'react-redux';
import Dimension from '../../../../Theme/Dimension';
import CustomeIcon from '../../../../component/common/CustomeIcon';
import CustomButton from '../../../../component/common/Button';
import styles from './styles';

const Accounts = props => {
  const bankDetails = useSelector(
    state => state.profileReducer.bankDetails.data || {},
  );
  const profileData = useSelector(state => state.profileReducer.data || {});

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.ContainerCss}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('EditBankAccount', {

            });
          }}>
          {/* {
            profileData ? null : */}
          <Text style={styles.addbank}>Add bank account</Text>
          {/* } */}

        </TouchableOpacity>
        {
          profileData ?
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
                    {profileData && profileData.verificationStatus !== 15 ?
                      <View style={{ flexDirection: 'row' }}>
                        <CustomeIcon
                          name={'edit-box'}
                          size={Dimension.font16}
                          color={colors.BrandColor}
                        />
                        <Text style={styles.addnewtxt}>Edit</Text>
                      </View> : (null)
                    }
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
                  <Text style={styles.Detailtxt}></Text>
                </View>
              </View>
            </View> : null
        }

      </ScrollView>
      {profileData && profileData.verificationStatus !== 15 ? (
        <View style={styles.bottombtnWrap}>
          <CustomButton
            buttonColor={colors.BrandColor}
            borderColor={colors.BrandColor}
            TextColor={colors.WhiteColor}
            TextFontSize={Dimension.font16}
            title={'Next'}
            onPress={() => { props.onItemPress(1) }}
          />
        </View>
      ) : null
      }
    </View>
  );
};

export default Accounts;
