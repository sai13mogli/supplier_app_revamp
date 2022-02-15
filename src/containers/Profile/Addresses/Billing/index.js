import React, { useEffect,useState,} from 'react';
import {Text,View,FlatList,ScrollView, TouchableOpacity} from 'react-native';
import colors from "../../../../Theme/Colors"
import {useSelector, useDispatch} from 'react-redux';
import {fetchAddressDetails} from '../../../../redux/actions/profile';
import Dimension from "../../../../Theme/Dimension";
import CustomButton from '../../../../component/common/Button';
import CustomeIcon from '../../../../component/common/CustomeIcon';
import styles from './styles';
import AddressesModal from '../../../../component/common/AddressesModal';

const SupportScreen = () => {
  const [data,setData]= useState( [
    { id: '1', lable: 'First item', checked : false},
    { id: '2', lable: 'Second item',checked : false },
    { id: '3', lable: 'Third item' ,checked : false},
    { id: '4', lable: 'Fourth item' ,checked : false},
    { id: '5', lable: 'Fifth item' ,checked : false},
    { id: '6', lable: 'Sixth item' ,checked : false},
    { id: '7', lable: 'Seventh item',checked : false }
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const addressesData = useSelector(state => (state.profileReducer.addressesDetails.data));
  console.log("Daakka====>",addressesData);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchAddressDetails());
  },[]);

   const renderItems = ({item}) => (
    <View style={{flex:1,top:60}}>
      <View style={styles.wrap}>
        <View style={styles.nameWrap}>
        <Text style={[styles.name,{fontSize:15,}]}>Nitin Bansal</Text>
        {
          item.isDefault?
          <Text style={styles.type}>default</Text>:null
        }
        </View>
        <Text style={styles.addresses}>{item.address1} ,{item.address2},{item.city}</Text>
        <Text style={[styles.addresses,{top:20,fontSize:12}]}>{item.state},{item.pincode}</Text>
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
          
          <FlatList
          data={addressesData}
          renderItem={renderItems}
          keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView> 
            <CustomButton
              title={'SUBMIT'}
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

export default SupportScreen;