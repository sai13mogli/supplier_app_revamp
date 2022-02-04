import React, {useEffect, useState, createRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Header from '../../component/common/Header';
import styles from './style';
import {OrderedMap} from 'immutable';
import {PROFILE_TABS} from '../../constants';
import FloatingLabelInputField from '../../component/common/FloatingInput';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input, Icon} from 'react-native-elements';
import DotCheckbox from '../../component/common/Checkbox';
import FileUpload from '../../component/common/FileUpload';
// import ActionSheet from 'react-native-actions-sheet';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const ProfileScreen = props => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [check, setCheck] = useState(false);
  const [images, setImages] = useState([]);
  const actionSheetRef = createRef();

  const inputDetails = [
    {
      title: 'Mobile Number*',
      state: phone,
      disabled: false,
      onChange: text => setPhone(text),
      errorText: 'Kindly enter your phone number',
      placeholder: 'Tap to Upload',
      keyboardType: 'number-pad',
      //   onBlur: onBlurPhone,
    },
    {
      title: 'Address*',
      state: address,
      disabled: false,
      onChange: text => setAddress(text),
      errorText: 'Kindly enter your phone number',
      placeholder: 'Tap to Upload',

      //   onBlur: onBlurAddress,
    },
  ];

  const renderInputText = ({
    title,
    state,
    disabled,
    onChange,
    placeholder,
    errorText,
    keyboardType,
  }) => {
    return (
      <View key={title}>
        <FloatingLabelInputField
          label={title}
          onChangeText={text => onChange(text)}
          value={state}
          placeholder={placeholder}
          disabled={disabled}
          keyboardType={keyboardType}
          extraView={() => (
            <TouchableOpacity style={{width: 100, height: 100}}>
              <MatIcon name={'eye'} size={22} />
            </TouchableOpacity>
          )}
          //   blur={onBlur}
        />
      </View>
    );
  };

  const uploadImage = cheque => {
    const options = {
      mediaType: 'photo',
      noData: true,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        addItemImage(response, cheque);
        return;
      }
    });
  };

  const uploadFromCamera = cheque => {
    const options = {
      mediaType: 'photo',
      noData: true,
      includeBase64: false,
      // maxHeight: 200,
      // maxWidth: 200,
      cameraType: 'back',
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // console.log('launchCamera ka error hai bhai', response);
        addItemImage(response, cheque);

        return;
      }
    });
  };

  const addItemImage = (photos, cheque) => {
    photos.assets.map((photo, i) => {
      const fData = new FormData();
      if (photo.type == null) {
        photo.type = 'image/jpeg';
      }

      const file = {
        name: photo.fileName,
        type: photo.type,
        uri: photo.uri,
        data: RNFetchBlob.wrap(photo.uri),
      };

      fData.append('productImage', file);
      let requestArr = [
        {
          name: 'productImage',
          filename: file.name,
          type: file.type,
          data: RNFetchBlob.wrap(file.uri),
        },
      ];

      const url = `https://api.moglix.com/payment/uploadImageS`;

      RNFetchBlob.fetch(
        'POST',
        url,
        {
          'Content-Type': 'multipart/form-data',
          'x-access-token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e30.edKPYBF-sVknVkDgurp2I_EJbELHz1DjYhae4JctY10',
          'x-request-id':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e30.93rqsC7X2fiCb6aHasPvMe9bCaYJu9CAWgLaAQBFz8Y',
        },
        requestArr,
      )
        .then(res => {
          let imagesArr = images;
          let obj = {};
          console.log(photo.type);

          let parsedString = JSON.parse(res['data']);
          imagesArr.push({file: photo, url: parsedString.data});
          obj.images = imagesArr;

          setImages([...obj.images]);
          console.log('imagesArr', imagesArr);
        })
        .catch(error => {
          console.log('inCatch!', error);
        });
    });
  };

  const openSelection = selection => {
    switch (selection) {
      case 'Gallery':
        actionSheetRef.current?.setModalVisible(false);
        uploadImage(false);
        break;

      case 'Camera':
        actionSheetRef.current?.setModalVisible(false);
        uploadFromCamera(false);
        break;

      default:
        actionSheetRef.current?.setModalVisible(false);
        break;
    }
  };

  return (
    <View>
      <Header showBack showText={'My Profile'} />
      {/* {PROFILE_TABS.map((tab, tabIndex) => (
        <TouchableOpacity
          key={tabIndex}
          onPress={() => props.navigation.navigate('Documents')}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
            {tab.title}
            {'\n'}
            {tab.completed ? 'Completed' : 'Not Completed'}
          </Text>
        </TouchableOpacity>
      )).toList()} */}
      {inputDetails.map((_, k) => renderInputText(_))}
      <DotCheckbox
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={check}
        onPress={() => setCheck(!check)}
      />
      <TouchableOpacity
        style={{backgroundColor: 'red', width: 100, height: 100}}
        onPress={
          () => actionSheetRef.current?.setModalVisible(true)
          // uploadImage(false);
        }>
        <FileUpload />
      </TouchableOpacity>
      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheet}>
          {['Camera', 'File Explorer', 'Cancel'].map(_ => (
            <TouchableOpacity onPress={() => openSelection(_)}>
              <Text style={styles.modalText}>{_}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ActionSheet>

      {/* <Input placeholder="MobileNumber" onChangeText={text => setPhone(text)} /> */}
    </View>
  );
};

export default ProfileScreen;
