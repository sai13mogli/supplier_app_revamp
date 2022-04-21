
import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Dimension from '../Theme/Dimension';
import colors from "../Theme/Colors"









export const toastConfig = {
  view_cart_toast: ({text1, text2, onPress, ...rest}) => (
    <View style={styles.cartTstView}>
      <View style={styles.cartInrView}>
        <Text style={styles.text}>{text2}</Text>
        <TouchableOpacity onPress={onPress} style={styles.cartView}>
          <Text style={styles.text3}>VIEW CART</Text>
        </TouchableOpacity>
      </View>
    </View>
  ),
  success: ({text1, text2, onPress, ...rest}) => (
    <View style={styles.successView}>
      <Text style={styles.successText}>{text2}</Text>
    </View>
  ),
  error: ({text1, text2, onPress, ...rest}) => (
    <View style={styles.errorView}>
      <Text style={styles.errorText}>{text2}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: Dimension.CustomBoldFont,
  },
  text3: {
    color: colors.WhiteColor,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: Dimension.margin18,
    marginLeft: Dimension.margin10,
    fontFamily: Dimension.CustomBoldFont,
  },
  errorText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: Dimension.margin18,
    marginLeft: Dimension.margin10,
    fontFamily: Dimension.CustomBoldFont,
  },
  successView: {
    height: 53,
    width: '95%',
    backgroundColor: colors.WhiteColor,
    borderRadius: 5,
  },
  errorView: {
    height: 53,
    width: '95%',
    backgroundColor: colors.error,
    borderRadius: 5,
  },
});
