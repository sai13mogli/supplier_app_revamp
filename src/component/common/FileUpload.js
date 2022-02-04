import React from 'react';
import {View, Text} from 'react-native';
import {Input, Icon} from 'react-native-elements';

const FileUpload = props => {
  return (
    <View>
      {props.disabled ? (
        <Text>{props.value}</Text>
      ) : (
        <Input
          {...props}
          rightIcon={'dot-circle-o'}
          underlineColorAndroid={'transparent'}
          selectionColor={'#3c3c3c'}
        />
      )}
    </View>
  );
};

export default FileUpload;
