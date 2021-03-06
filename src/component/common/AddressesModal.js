import React, {useState}from "react";
import {View,StyleSheet,Text,TouchableOpacity,Modal,ScrollView} from "react-native";
import CustomeIcon from '../../component/common/CustomeIcon';
import Dimension from "../../Theme/Dimension";
import colors from "../../Theme/Colors"
import {OrderedMap} from 'immutable';

const AddressesModal = props => { 

    // const FORM_FIELDS = new OrderedMap({
    //     legalEntityName: {
    //       title: 'Legal Entity Name',
    //       placeholder: '',
    //       value: legalEntityName,
    //       onChangeText: text => setlegalEntityName(text),
    //       component: FloatingLabelInputField,
    //     },
    //     tradeName: {
    //       title: 'Trade Name',
    //       placeholder: '',
    //       value: tradeName,
    //       onChangeText: text => settradeName(text),
    //       component: FloatingLabelInputField,
    //     },
    //     contactName: {
    //       title: 'Contact Name',
    //       placeholder: '',
    //       value: contactName,
    //       onChangeText: text => setcontactName(text),
    //       component: FloatingLabelInputField,
    //     },
    //     gstin: {
    //       title: 'GSTIN',
    //       placeholder: '',
    //       value: gstin,
    //       onChangeText: text => setgstin(text),
    //       component: FloatingLabelInputField,
    //       onBlur: () => onGstinBlur(),
    //     },
    //     country: {
    //       title: 'Country',
    //       placeholder: 'Country',
    //       selectedValue: country,
    //       onValueChange: text => setcountry(text),
    //       component: DropDown,
    //       items: [
    //         {
    //           label: 'India',
    //           value: 217,
    //         },
    //       ],
    //       enabled: false,
    //     },
    //     pincode: {
    //       title: 'Pincode',
    //       placeholder: '',
    //       value: pincode,
    //       maxLength: 6,
    //       keyboardType: 'number-pad',
    //       onChangeText: text => setpincode(text),
    //       component: FloatingLabelInputField,
    //       onBlur: () => onPincodeBlur(),
    //     },
    //     state: {
    //       title: 'State',
    //       placeholder: 'State',
    //       selectedValue: state,
    //       onValueChange: text => setstate(text),
    //       component: DropDown,
    //       items: states,
    //       enabled: true,
    //     },
    //     city: {
    //       title: 'City',
    //       placeholder: 'City',
    //       selectedValue: city,
    //       onValueChange: text => setcity(text),
    //       component: DropDown,
    //       items: cities,
    //       enabled: true,
    //     },
    //     phone: {
    //       title: 'Phone',
    //       placeholder: '',
    //       value: phone,
    //       maxLength: 10,
    //       keyboardType: 'number-pad',
    //       onChangeText: text => setphone(text),
    //       component: FloatingLabelInputField,
    //     },
    //     email: {
    //       title: 'Email',
    //       placeholder: '',
    //       value: email,
    //       onChangeText: text => setemail(text),
    //       component: FloatingLabelInputField,
    //     },
    //     tan: {
    //       title: 'TAN',
    //       placeholder: '',
    //       value: tan,
    //       onChangeText: text => settan(text),
    //       component: FloatingLabelInputField,
    //     },
    //   });
    

  const {
    onPress,
    visible,
    transparent
  } = props;

  return (
       <View style={styles.container}>
       <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
            hasBackdrop={true}
            backdropOpacity={0.4}
            onRequestClose={props.onClose}
            >
                <View
                    style={{
                      height: '80%',
                      marginTop: 'auto',
                      borderRadius: 8,
                      padding: Dimension.padding10,
                      backgroundColor: 'red',
                    }}>
              <View style={styles.crossView}>
              <Text style={styles.AddressType}>default</Text>
              <TouchableOpacity
               onPress={onPress}
               >
              <CustomeIcon name={'right-tick-line'} color={colors.SuccessStateColor} size={Dimension.font20}></CustomeIcon>
              </TouchableOpacity>
              </View>  
              <ScrollView style={styles.ContainerCss}>
               
               </ScrollView>      
             
           
            </View>
          </Modal>
        </View>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#98B3B7',
    justifyContent: 'center',
  },
  crossView:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  ContainerCss:{
    backgroundColor:colors.WhiteColor,
    paddingHorizontal:Dimension.padding15
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#98B3B7',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
     
  });

export default AddressesModal;

/* Created By Aakash  -------*/