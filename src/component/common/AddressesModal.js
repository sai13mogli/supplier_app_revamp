import React, {useState}from "react";
import {View,StyleSheet,Text,TouchableOpacity,Modal} from "react-native";
import { CheckBox, Icon } from 'react-native-elements';
// import Dimension from "../../../Theme/Dimension";
// import colors from "../../../Theme/Colors"
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
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.addButton}
               onPress={onPress}
              >
              <Text style={styles.addButtonText}>Open</Text>
            </TouchableOpacity>
          </View>
  
          <Modal
            animationType="slide"
            transparent={transparent}
            visible={props.visible}
            onRequestClose={props.onClose}
            >
                <View
                    style={{
                    height: '80%',
                    marginTop: 'auto',
                    backgroundColor: 'rgba(52, 52, 52, 0.7)',
                    }}>
            <View style={styles.footer}>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={onPress}
            //   onPress={() => setModalVisible(!modalVisible)}
              >
              <Text style={styles.addButtonText}>Close</Text>
            </TouchableOpacity>
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
      header: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      headerText: {
        color: 'black',
        fontSize: 18,
        padding: 26,
      },
      noteHeader: {
        backgroundColor: '#42f5aa',
        alignItems: 'center',
        justifyContent: 'center',
       
      },
      footer: {
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: 'white',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      },
      textInput: {
        alignSelf: 'stretch',
        color: 'black',
        padding: 20,
        backgroundColor: '#ddd',
        borderTopWidth: 2,
        borderTopColor: '#ddd',
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
      addButtonText: {
        color: '#fff',
        fontSize: 18,
      }
  });

export default AddressesModal;

/* Created By Aakash  -------*/