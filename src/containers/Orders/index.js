import React from 'react';
import {Text} from 'react-native';
import CustomButton from '../../component/common/Button';
import CustomeIcon from '../../component/common/CustomeIcon';
const OrdersScreen = () => {
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
        icon={() => <CustomeIcon name={'add-box'} size={22} />}
        showIcon
        iconColor={'#fff'}
        iconType={'font-awesome'}
        onPress={() => alert('running')}
      />
      {/* End */}
    </>
  );
};

export default OrdersScreen;
