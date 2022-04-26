import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../Theme/Colors';
import CustomeIcon from './CustomeIcon';
import {Header, HeaderProps, Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';

import Dimension from '../../Theme/Dimension';
const AppHeader = props => {
  const notifications = useSelector(
    state => state.notificationsReducer.data || [],
  );

  const renderUnreadIcon = () => {
    let notificationsArr = ([...notifications] || []).map(_ => _.data);
    let flatArr = [];
    if (notificationsArr && notificationsArr.length) {
      flatArr = notificationsArr.flat();
    }
    let unread = (flatArr || []).find(_ => !_.readStatus);
    if (unread) {
      return <View style={styles.reddot}></View>;
    } else {
      return <></>;
    }
  };

  return (
    <Header
      backgroundColor="#fff"
      barStyle="dark-content"
      placement="left"
      elevated={false}
      containerStyle={{paddingVertical: Dimension.padding15}}
      //leftContainerStyle={{flex:1}}
      centerComponent={{text: props.showText, style: styles.headerTxt}}
      leftComponent={
        props.showBack && (
          <View style={styles.leftSection}>
            <CustomeIcon
              name={'arrow-back'}
              size={Dimension.font20}
              color={colors.FontColor}
              onPress={() => props.navigation.goBack()}></CustomeIcon>
            {/* <Text style={styles.headerTxt}>{props.showText}</Text> */}
          </View>
        )
      }
      //rightContainerStyle={{flex:1}}
      centerContainerStyle={{paddingLeft: Dimension.padding10}}
      rightComponent={
        props.showBell && (
          <View style={{flexDirection: 'row'}}>
            <CustomeIcon
              name={props.rightIconName}
              size={Dimension.font20}
              color={colors.FontColor}></CustomeIcon>
            {!props.fromnotification && (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Notification')}
                style={{position: 'relative', paddingLeft: Dimension.padding8}}>
                <CustomeIcon
                  name={'notification-3-line'}
                  size={Dimension.font20}
                  color={colors.FontColor}></CustomeIcon>
                {renderUnreadIcon()}
              </TouchableOpacity>
            )}
          </View>
        )
      }
    />
  );
};
const styles = StyleSheet.create({
  headerWrap: {},
  headerTxt: {
    fontSize: Dimension.font12,
    color: colors.headerTxtColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginTop: Dimension.margin5,
    //marginLeft:Dimension.margin10
  },
  leftSection: {flexDirection: 'row'},
  reddot: {
    width: Dimension.width8,
    height: Dimension.height8,
    borderRadius: Dimension.width10,
    backgroundColor: colors.BrandColor,
    position: 'absolute',
    top: Dimension.padding2,
    right: 0,
  },
});

export default AppHeader;
