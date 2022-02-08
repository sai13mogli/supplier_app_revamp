import React, { useEffect,useState,} from 'react';
import {Text,View,FlatList,ScrollView} from 'react-native';
import colors from "../../../../Theme/Colors"
import {useSelector, useDispatch} from 'react-redux';
import {fetchAddressDetails} from '../../../../redux/actions/Addresses';
import Dimension from "../../../../Theme/Dimension";
import CustomButton from '../../../../component/common/Button';
import CustomeIcon from '../../../../component/common/CustomeIcon';
import styles from './styles';

const PickedUp = () => {
  const [data,setData]= useState( [
    { id: '1', lable: 'First item', checked : false},
    { id: '2', lable: 'Second item',checked : false },
    { id: '3', lable: 'Third item' ,checked : false},
    { id: '4', lable: 'Fourth item' ,checked : false},
    { id: '5', lable: 'Fifth item' ,checked : false},
    { id: '6', lable: 'Sixth item' ,checked : false},
    { id: '7', lable: 'Seventh item',checked : false }
  ]);
  const addressesData = useSelector(state => (state.addressesReducer || {}).addresses);

  const dispatch = useDispatch();
  useEffect(() => {
    const data = {
      userId: '123676',
      token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1NjY2MDUiLCJyb2xlIjoiU1VQUExJRVIiLCJpYXQiOjE2NDQyMjkxMDcsImV4cCI6MTY0NDMxNTUwN30.VrAgBof0aJGg5N98xA-llF402zk-etjIxj-KCHqXawpEg1v6-p47qh_WQfODhFqtQ7_338j8fcW7UC7alndDZw"
    }
    dispatch(fetchAddressDetails(data));
    
   }, []);

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
          02 Pickup Address
        </Text>
        <CustomeIcon name={'add-box'} size={Dimension.font22} color={colors.BrandColor}
        style={{left:50}} />
        <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.BrandColor,right:20}}>
          Add new
        </Text>
        </View>  
          
          <FlatList
          data={data}
          renderItem={renderItems}
          keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView> 
         
    </View>
    
  );
};
export default PickedUp;