import * as React from 'react';
import {StackActions} from '@react-navigation/native';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}

export const toastConfig = {
  success: ({text1, text2, onPress, ...rest}) => (
    <View
      style={{
        height: 53,
        width: '95%',
        backgroundColor: '#000',
        borderRadius: 5,
      }}>
      <Text
        style={{
          color: '#fff',
          fontSize: 12,
          fontWeight: 'bold',
          marginTop: 18,
          marginLeft: 10,
        }}>
        {text2}
      </Text>
    </View>
  ),
  error: ({text1, text2, onPress, ...rest}) => (
    <View
      style={{
        height: 53,
        width: '95%',
        backgroundColor: '#000',
        borderRadius: 5,
      }}>
      <Text
        style={{
          color: '#fff',
          fontSize: 12,
          fontWeight: 'bold',
          marginTop: 18,
          marginLeft: 10,
        }}>
        {text2}
      </Text>
    </View>
  ),
};
