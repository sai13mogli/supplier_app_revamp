import React, {useState} from 'react';
import {CheckBox} from 'react-native-elements';

const DotCheckbox = props => {
  const {inputDetails, onCheck, toggleCheck, value} = props;

  return (
    <>
      {(inputDetails || []).map((_, i) => (
        <CheckBox
          title={_.title}
          onPress={() => onCheck(_.title)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={_.title == value ? true : false}
        />
      ))}
    </>
  );
};

export default DotCheckbox;
