import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';
import Dimension from '../../../Theme/Dimension';
import colors from '../../../Theme/Colors';
import CustomeIcon from '../CustomeIcon';
import styles from './styles';

const Checkbox = props => {
  const {onPress, checked, title, isImage, image} = props;

  return (
    <CheckBox
      checked={checked}
      onPress={onPress}
      checkedIcon={
        <CustomeIcon
          name={'checkbox-tick'}
          size={Dimension.font20}
          color={colors.BrandColor}
        />
      }
      uncheckedIcon={
        <CustomeIcon
          name={'checkbox-blank'}
          size={Dimension.font20}
          color={colors.FontColor}
        />
      }
      textStyle={styles.checkboxTitle}
      fontFamily={Dimension.CustomMediumFont}
      wrapperStyle={styles.checkboxwrapper}
      containerStyle={styles.checkboxContainer}
      title={
        isImage ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{
                uri: `https://cdnx1.moglix.com/suppliercentral/${image}.png`,
              }}
              style={{
                height: Dimension.height32,
                width: Dimension.height32,
                marginLeft: Dimension.margin5,
              }}
            />
            <Text
              style={{
                fontSize: Dimension.font12,
                color: colors.FontColor,
                fontWeight: 'normal',
                marginLeft: Dimension.margin5,
                fontFamily: Dimension.CustomMediumFont,
              }}>
              {title}
            </Text>
          </View>
        ) : (
          title
        )
      }
    />
  );
};

export default Checkbox;

/* Created By Aakash  -------*/
