import React from 'react';
import {Picker} from '@react-native-picker/picker';

const DropDown = props => {
  const {items, selectedValue, placeholder, onValueChange, enabled} = props;
  return (
    <Picker
      mode="dropdown"
      note
      selectedValue={selectedValue}
      placeholder={placeholder}
      onValueChange={onValueChange}
      // style={}  //to be added
      enabled={enabled}>
      <Picker.Item
        key={'noKey'}
        label={placeholder}
        // style={} // to be added
        value={''}
      />
      {items.map((item, itemKey) => (
        <Picker.Item
          key={itemKey}
          label={item.label}
          // style={} //to be added
          value={item.value}
        />
      ))}
    </Picker>
  );
};

export default DropDown;
