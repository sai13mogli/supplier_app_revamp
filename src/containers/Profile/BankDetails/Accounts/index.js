import React, { useEffect, useState, } from 'react';
import { Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import colors from "../../../../Theme/Colors"
import { useSelector, useDispatch } from 'react-redux';
import Dimension from "../../../../Theme/Dimension";
import CustomeIcon from '../../../../component/common/CustomeIcon';
import styles from './styles';

const ifscCodeRegex = '^[A-Za-z]{4}[a-zA-Z0-9]{7}$'

const Accounts = (props) => {
  const bankDetails = useSelector(state => (state.profileReducer.bankDetails.data || {}));

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.ContainerCss}>
        <View style={styles.pendingBox}>
          <View style={styles.pendingWrap}>
            <Text style={styles.Pendingtxt}>Pending For Approval</Text>
            <TouchableOpacity onPress={() => {
              props.navigation.navigate('EditBankAccount',
                {
                  editID: bankDetails.id,
                  // addressesDetails: item
                })
            }}>
              <View style={{ flexDirection: "row", marginLeft: 120 }}>
                <CustomeIcon name={'add-circle'} size={Dimension.font18} color={colors.BrandColor} />
                <Text style={styles.addnewtxt}>
                  Edit
                </Text>
              </View>
            </TouchableOpacity>

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginHorizontal: -50 }}>
            <View style={styles.textWrap}>
              <Text style={styles.Detailtxt}>
                Name
              </Text>
              <Text style={styles.Detailtxt}>
                Account No
              </Text>
              <Text style={styles.Detailtxt}>
                Account Type
              </Text>
              <Text style={styles.Detailtxt}>
                IFSC
              </Text>
              <Text style={styles.Detailtxt}>
                Bank name
              </Text>
              <Text style={styles.Detailtxt}>
                Branch
              </Text>
              {/* <Text style={styles.Detailtxt}>
                Branch code
              </Text> */}
            </View>

            <View style={styles.textWrap}>
              <Text style={[styles.Detailtxt]}>
                {bankDetails.accountHolderName}
              </Text>
              <Text style={styles.Detailtxt}>
                {bankDetails.accountNumber}
              </Text>
              <Text style={styles.Detailtxt}>
                {
                  bankDetails.accountType == 1 ? "Current" : bankDetails.accountType == 2 ?
                    "Saving" : bankDetails.accountType == 3 ? "Joint" : ""
                }
              </Text>
              <Text style={styles.Detailtxt}>
                {bankDetails.ifscCode}
              </Text>
              <Text style={styles.Detailtxt}>
                {bankDetails.bankName}
              </Text>
              <Text style={styles.Detailtxt}>
                {bankDetails.branch}
              </Text>
              <Text style={styles.Detailtxt}>
                {/* {bankDetails.bra} */}
              </Text>
            </View>

          </View>


        </View>

      </ScrollView>


    </View>

  );
};

export default Accounts;