import React, { useEffect,useState,} from 'react';
import {Text,View,FlatList,ScrollView, StyleSheet,TouchableOpacity} from 'react-native';

import colors from "../../../../Theme/Colors"
import {useSelector, useDispatch} from 'react-redux';
import Dimension from "../../../../Theme/Dimension";
import CustomButton from '../../../../component/common/Button';
import CustomeIcon from '../../../../component/common/CustomeIcon';
import styles from './styles';
import AddressesModal from '../../../../component/common/AddressesModal';

const Billing = () => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const addressesData = useSelector(state => (state.profileReducer.addressesDetails.data));
  console.log("Daakka====>",addressesData);

  const renderItems = ({item}) => (
    <View style={{flex:1,}}>
      <View style={styles.wrap}>
        <View style={styles.nameWrap}>
        <Text style={styles.UserNameCss}>Nitin Bansal</Text>
        {
          item.isDefault?
          <Text style={styles.AddressType}>default</Text>:null
        }
        </View>
        <Text style={styles.AddressTxt}>{item.address1} ,{item.address2},{item.city}</Text>
        <Text style={styles.AddressTxt}>{item.state},{item.pincode}</Text>
        <View style={styles.buttonWrap}>
          <View style={{marginRight:15,flex:1}}>
            <CustomButton
            title={"REMOVE"}
            buttonColor={colors.WhiteColor}
           // onPress={navigateToAddresses}
            TextColor={colors.FontColor}
            borderColor={colors.grayShade1}
            TextFontSize={Dimension.font14}
            >

            </CustomButton>
          </View>
          <View style={{flex:1}}>
            <CustomButton
            title={"EDIT"}
            buttonColor={colors.WhiteColor}
            onPress={() => setModalVisible(true)}
            onPress={() => setModalVisible(!modalVisible)}
            TextColor={colors.BrandColor}
            borderColor={colors.BrandColor}
            TextFontSize={Dimension.font14}
            />
          </View>
       
        </View>
        
      </View>
     </View>
  )

  return (
    <View style={{flex:1}}>
      <ScrollView style={styles.ContainerCss}>
       <View style={styles.TopWrap}>
        <Text style={styles.Pageheading}>
          03 Billing Address
        </Text>
        <View style={{flexDirection:"row"}}>
        <CustomeIcon name={'add-circle'} size={Dimension.font18} color={colors.BrandColor} />
        <Text style={styles.addnewtxt}>
          Add new
        </Text>
        </View>
        
        </View>  
          
          <FlatList
          data={addressesData}
          renderItem={renderItems}
          keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView> 
          <View style={styles.bottombtnWrap}>
            <CustomButton
               buttonColor={colors.BrandColor}
               borderColor={colors.BrandColor }
               TextColor={colors.WhiteColor }
               TextFontSize={Dimension.font16}
               title={'NEXT'}
               loading={loading}
              //  onPress={onSubmit}
            /> 
          <AddressesModal
           visible={modalVisible}
           transparent={true}
           onPress={() => setModalVisible(true)}
           onPress={() => setModalVisible(!modalVisible)}
          />  
         
    </View>
    </View>
    
  );
};

export default Billing;