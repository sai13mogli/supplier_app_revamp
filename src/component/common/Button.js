import React from 'react';
import {Button} from 'react-native-elements';

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
      icon={icon}
      disabled={disabled || loading}
      iconRight={showIcon}
      // iconContainerStyle={{marginLeft: 10}}
      // buttonStyle={{
      //   backgroundColor: buttonColor,
      //   borderColor: 'transparent',
      //   borderWidth: 0,
      //   borderRadius: 30,
      // }}
      // containerStyle={{
      //   width: 200,
      //   marginHorizontal: 50,
      //   marginVertical: 10,
      // }}
    />
  );
};

export default CustomButton;
