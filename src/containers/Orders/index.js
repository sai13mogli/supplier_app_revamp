import React, {useState} from 'react';
import {Text} from 'react-native';
import CustomButton from '../../component/common/Button';
import DropDown from '../../component/common/DropDown';
import CustomeIcon from '../../component/common/CustomeIcon';
import Dimension from "../../Theme/Dimension";
import colors from "../../Theme/Colors"
const OrdersScreen = () => {
  const [gender, setGender] = useState('');

  const onChange = value => {
    setGender(value);
  };

  return (
    <>
      <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
        OrdersScreen
      </Text>

      {/* Exampe for CustomButton Component */}
      <CustomButton
        title={'Hello'}
        buttonColor={'dodgerblue'}
        iconName={'user'}
        icon={() => <CustomeIcon name={'add-box'} size={Dimension.font22} color={colors.BrandColor} />}
        showIcon
        iconColor={'#fff'}
        iconType={'font-awesome'}
        onPress={() => alert('running')}
        TextColor={colors.WhiteColor}
        borderColor={colors.WhiteColor}
      />
      {/* End */}

      {/* Example for Dropdown Component */}
      <DropDown
        // enabled={false}
        placeholder={'Gender'}
        items={[
          {label: 'Male', value: 'M'},
          {label: 'Female', value: 'F'},
        ]}
        selectedValue={gender}
        onValueChange={onChange}
      />
      {/* End */}
    </>
  );
};

export default OrdersScreen;
