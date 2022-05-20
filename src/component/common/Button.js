import React from 'react';
import {Button} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';

const CustomButton = props => {
  const {
    disabled,
    showIcon,
    loading,
    loadingColor,
    iconName,
    iconType,
    iconColor,
    icon,
    title,
    onPress,
    buttonColor,
    TextColor,
    borderColor,
    CustomeButtonStyle,
    TextFontSize,
    size,
  } = props;

  return (
    <Button
      onPress={onPress}
      title={title}
      loading={loading}
      loadingProps={{
        size: 'small',
        color: loadingColor,
      }}
      size={size || 'md'}
      icon={icon}
      disabled={disabled || loading}
      iconRight={showIcon}
      iconContainerStyle={styles.iconWrapper}
      buttonStyle={[
        styles.btnStyle,
        {backgroundColor: buttonColor, borderColor: borderColor},
      ]}
      customeButtonStyle={CustomeButtonStyle}
      containerStyle={styles.btnWrapper}
      titleStyle={[
        styles.btnTextStyle,
        {color: TextColor, fontSize: TextFontSize},
      ]}
      disabledStyle={[
        styles.btnStyle,
        {backgroundColor: buttonColor, borderColor: borderColor},
      ]}
      disabledTitleStyle={[
        styles.btnTextStyle,
        {color: TextColor, fontSize: TextFontSize},
      ]}
    />
  );
};
const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: colors.BrandColor,
    borderWidth: 1,
    borderRadius: 4,
    width: '100%',
  },
  btnTextStyle: {
    fontSize: Dimension.font16,
    color: colors.WhiteColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  btnWrapper: {},
  iconWrapper: {marginLeft: Dimension.margin15},
});
export default CustomButton;
