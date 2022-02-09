import React, { useEffect,useState,} from 'react';
import {Text,View,FlatList,ScrollView, TouchableOpacity} from 'react-native';
import colors from "../../../../Theme/Colors"
import {useSelector, useDispatch} from 'react-redux';
import {fetchBankDetails} from '../../../../redux/actions/profile';
import Dimension from "../../../../Theme/Dimension";
import CustomButton from '../../../../component/common/Button';
import CustomeIcon from '../../../../component/common/CustomeIcon';
import styles from './styles';
import AddressesModal from '../../../../component/common/AddressesModal';

const Accounts = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const bankData = useSelector(state => (state.profileReducer.bankDetails.data));
  console.log("BankData====>",bankData);
  const dispatch = useDispatch();
  
  useEffect(() => {
      dispatch(fetchBankDetails());
  },[]);

   const renderItems = ({item}) => (
    <View style={{flex:1,top:60}}>
      <View style={styles.wrap}>
        <View style={styles.nameWrap}>
        <Text style={[styles.name,{fontSize:15,}]}>Nitin Bansal</Text>
        <Text style={styles.type}>default</Text>
        </View>
        <Text style={styles.addresses}>D-188,Block D ,Sector 10,Noida</Text>
        <Text style={[styles.addresses,{top:20,fontSize:12}]}>Uttar Pardesh</Text>
        <View style={styles.buttonWrap}>
        <View style={styles.remove}>
          <Text style={[styles.name,{fontSize:15,top:2}]}>Remove</Text>
        </View> 
        <View style={styles.remove}>
        <Text style={[styles.name,{fontSize:15,top:2}]}>Edit</Text>
          </View> 
        </View>
        
      </View>
     </View>
  )

  return (
    <View style={{flex:1}}>
      <ScrollView indicatorStyle="white">
       <View style={{flexDirection:'row',top:30,justifyContent:'space-between'}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000',left:20}}>
          03 Billing Address
        </Text>
        <CustomeIcon name={'add-box'} size={Dimension.font22} color={colors.BrandColor}
        style={{left:50}} />
        <TouchableOpacity >
           <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.BrandColor,right:20}}>
          Add new
        </Text>
        </TouchableOpacity>
       
        </View>  
          
          
          </ScrollView> 
            <CustomButton
              title={'NEXT'}
              buttonStyle={styles.submit}
              // onPress={navigateToAddresses}
              TextColor={colors.WhiteColor}
              borderColor={colors.WhiteColor}
            /> 
          {/* <AddressesModal
           visible={modalVisible}
           transparent={true}
           onPress={() => setModalVisible(true)}
           onPress={() => setModalVisible(!modalVisible)}
          />   */}
         
    </View>
    
  );
};

export default Accounts;