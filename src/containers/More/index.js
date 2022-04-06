import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { MORE_TABS, PRIVACY_TABS } from '../../constants';
import styles from './style';
import CustomeIcon from '../../component/common/CustomeIcon';
import Dimension from '../../Theme/Dimension';
import Colors from '../../Theme/Colors';
import { useDispatch, useSelector } from 'react-redux';
const MoreScreen = props => {
  const dispatch = useDispatch();
  const profileStatus = useSelector(
    state => (state.profileReducer || {}).status || STATE_STATUS.UNFETCHED,
  );
  const profileData = useSelector(state => state.profileReducer.data || {});
  const navigateFn = () => props.navigation.navigate();
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* <Text style={{marginTop: 40}}>
        {(profileData.userInfo || {}).contactName} |{' '}
        {(profileData.userInfo || {}).email}
      </Text>
      <Text style={{marginTop: 10}}>{(profileData.userInfo || {}).phone}</Text>
      <Text style={{marginTop: 10}}>
        {(profileData.userInfo || {}).entityName} Since March 2021
      </Text> */}
      <View style={{ marginTop: 20 }}>
        {MORE_TABS.map((tab, tabIndex) => (
          <View>
            <TouchableOpacity
              key={tabIndex}
              style={styles.profileTabWrap}
              onPress={() => props.navigation.navigate(`${tab.route}`)}>
              <View style={{ flexDirection: 'row' }}>
                <View style={[styles.IconWrap]}>
                  <CustomeIcon
                    name={tab.icon}
                    color={Colors.headerTxtColor}
                    size={Dimension.font14}></CustomeIcon>
                </View>
                <View>
                  <Text style={styles.tabTitle}>{tab.title}</Text>
                </View>
              </View>

              <CustomeIcon
                name={'arrow-forward'}
                color={Colors.headerTxtColor}
                size={Dimension.font18}></CustomeIcon>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={{ marginTop: 20 }}>
        {PRIVACY_TABS.map((tab, tabIndex) => (
          <View>
            <TouchableOpacity
              key={tabIndex}
              style={styles.profileTabWrap}
              onPress={() => props.navigation.navigate(`${tab.route}`)}>
              <View style={{ flexDirection: 'row' }}>
                <View style={[styles.IconWrap]}>
                  <CustomeIcon
                    name={tab.icon}
                    color={Colors.headerTxtColor}
                    size={Dimension.font14}></CustomeIcon>
                </View>
                <View>
                  <Text style={styles.tabTitle}>{tab.title}</Text>
                </View>
              </View>

              <CustomeIcon
                name={'arrow-forward'}
                color={Colors.headerTxtColor}
                size={Dimension.font18}></CustomeIcon>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.varsionWrap}>
        <View style={{ flexDirection: 'row' }}>
          <CustomeIcon
            name={'device-mobile'}
            color={Colors.headerTxtColor}
            size={Dimension.font18}></CustomeIcon>

          <View
            style={{ flexDirection: 'column', marginTop: -Dimension.margin10 }}>
            <Text
              style={[styles.versionText, { marginLeft: Dimension.margin10 }]}>
              App Version 1.20
            </Text>
            <Text
              style={[styles.versionText, { marginLeft: Dimension.margin10 }]}>
              Last updated on 12-02-19
            </Text>
          </View>
          <Text
            numberOfLines={2}
            style={[
              styles.versionText,
              { marginLeft: Dimension.margin70, width: 80, bottom: 5 },
            ]}>
            No Update Available
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MoreScreen;
