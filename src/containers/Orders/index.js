import React, {useState} from 'react';
import {Text} from 'react-native';
import CustomButton from '../../component/common/Button';
import DropDown from '../../component/common/DropDown';
import CustomeIcon from '../../component/common/CustomeIcon';
import Checkbox from '../../component/common/Checkbox/index';
import CustomeDatePicker from '../../component/common/Datepicker/index';
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';
const OrdersScreen = props => {
  const [gender, setGender] = useState('');
  const [isSelected, setSelection] = useState(false);

  const onChange = value => {
    setGender(value);
  };

  const onCheckAction = value => {
    setSelection(value);
  };

  return (
    <>
      <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
        OrdersScreen
      </Text>
      <CustomButton
        title={'Hello'}
        buttonColor={'dodgerblue'}
        iconName={'user'}
        icon={() => (
          <CustomeIcon
            name={'add-box'}
            size={Dimension.font22}
            color={colors.BrandColor}
          />
        )}
        showIcon
        iconColor={'#fff'}
        iconType={'font-awesome'}
        onPress={() => alert('running')}
        TextColor={colors.WhiteColor}
        borderColor={colors.WhiteColor}
      />

      <CustomButton
        title={'Open Notifications'}
        buttonColor={'dodgerblue'}
        iconName={'user'}
        icon={() => (
          <CustomeIcon
            name={'add-box'}
            size={Dimension.font22}
            color={colors.BrandColor}
          />
        )}
        showIcon
        iconColor={'#fff'}
        iconType={'font-awesome'}
        onPress={() => props.navigation.navigate('Notification')}
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
        title={'select Something'}
      />
      {/* End */}

      {/* Example for DatePicker Component */}

      <CustomeDatePicker display={'default'} />
      {/* Example for CheckBox Component */}
      <Checkbox
        checked={isSelected}
        onPress={() => setSelection(!isSelected)}
      />
    </>
  );
};

// Exampe for CustomButton Component

export default OrdersScreen;
