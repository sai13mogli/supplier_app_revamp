import React, {useEffect, useState, createRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Header from '../../component/common/Header';
import styles from './style';
import CustomeIcon from '../../component/common/CustomeIcon';
import {OrderedMap} from 'immutable';
import {PROFILE_TABS} from '../../constants';
import FloatingLabelInputField from '../../component/common/FloatingInput';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../component/common/Button';
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';
import {Input, Icon, BottomSheet} from 'react-native-elements';
import DotCheckbox from '../../component/common/Checkbox';
import FileUpload from '../../component/common/FileUpload';
import ActionSheet from 'react-native-actions-sheet';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch} from 'react-redux';
import {fetchBusinessDetails} from '../../redux/actions/profile';

const ProfileScreen = props => {
  const {navigate} = useNavigation();
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [check, setCheck] = useState(false);
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('Address*');
  const [singleFile, setSingleFile] = useState('');

  const dispatch = useDispatch();
  const actionSheetRef = createRef();

  useEffect(() => {
    dispatch(fetchBusinessDetails());
  });

  const inputDetails = [
    {
      title: () => renderTitle('Mobile Number'),
      state: phone,
      disabled: false,
      onChange: text => setPhone(text),
      errorText: 'Kindly enter your phone number',
      placeholder: 'Tap to Upload',
      keyboardType: 'number-pad',
      //   onBlur: onBlurPhone,
    },
    {
      title: () => renderTitle('Address'),
      state: address,
      disabled: false,
      onChange: text => setAddress(text),
      errorText: 'Kindly enter your phone number',
      placeholder: 'Tap to Upload',

      //   onBlur: onBlurAddress,
    },
  ];

  const renderTitle = title => {
    return (
      <>
        <Text style={{color: '#000'}}>{title}</Text>
        <Text style={{color: 'red'}}>*</Text>
      </>
    );
  };

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
      <View>
        <FloatingLabelInputField
          label={() => title()}
          onChangeText={text => onChange(text)}
          value={state}
          placeholder={placeholder}
          disabled={disabled}
          keyboardType={keyboardType}
          extraView={() => (
            <TouchableOpacity style={{}}>
              <CustomeIcon name={'calendar'} size={24}></CustomeIcon>
            </TouchableOpacity>
          )}
          //   blur={onBlur}
        />
      </View>
    );
  };

  const uploadFromCamera = cheque => {
    const options = {
      mediaType: 'photo',
      noData: true,
      includeBase64: false,
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
        addItemImage(response, cheque);
        return;
      }
    });
  };

  const addItemImage = (photos, cheque) => {
    console.log(photos, 'photos hai bhai');
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
          let imagesArr = [];
          let obj = {};
          console.log(photo.type);

          let parsedString = JSON.parse(res['data']);
          imagesArr.push({file: photo, url: parsedString.data});
          obj.images = imagesArr;
          setImages([...obj.images]);
        })
        .catch(error => {
          console.log('inCatch!', error);
        });
    });
  };

  const uploadFromFileExp = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res[0].fileCopyUri);
      console.log('Type : ' + res[0].type);
      console.log('File Name : ' + res[0].name);
      console.log('File Size : ' + res[0].size);

      setSingleFile(res[0]);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled from single doc picker');
      } else {
        throw err;
      }
    }
  };

  const openSelection = selection => {
    switch (selection) {
      case 'Camera':
        actionSheetRef.current?.setModalVisible(false);
        uploadFromCamera(false);
        break;

      case 'File Explorer':
        actionSheetRef.current?.setModalVisible(false);
        uploadFromFileExp();
        break;

      default:
        actionSheetRef.current?.setModalVisible(false);
        break;
    }
  };

  const onCheck = term => {
    setValue(term);
  };

  const navigateToAddresses = () => {
    navigate('Addresses');
  };

  return (
    <View>
      <Header showBack showText={'My Profile'} />
      {PROFILE_TABS.map((tab, tabIndex) => (
        <TouchableOpacity
          key={tabIndex}
          onPress={() => props.navigation.navigate(tab.route)}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
            {tab.title}
            {'\n'}
            {tab.completed ? 'Completed' : 'Not Completed'}
          </Text>
        </TouchableOpacity>
      ))
        .toList()
        .toArray()}
      {inputDetails.map((_, k) => renderInputText(_))}
      <DotCheckbox
        inputDetails={inputDetails}
        value={value}
        onCheck={onCheck}
      />
      <TouchableOpacity
        onPress={() => actionSheetRef.current?.setModalVisible(true)}>
        <FileUpload />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('BusinessDetails')}>
        <Text style={{color: '#000'}}>Business Details</Text>
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

      <CustomButton
        buttonColor={'dodgerblue'}
        iconName={'user'}
        icon={() => (
          <CustomeIcon
            name={'add-box'}
            size={Dimension.font22}
            color={colors.BrandColor}
          />
        )}
        title={'Addresses'}
        showIcon
        iconColor={'#fff'}
        iconType={'font-awesome'}
        onPress={navigateToAddresses}
        TextColor={colors.WhiteColor}
        borderColor={colors.WhiteColor}
      />
    </View>
  );
};

export default ProfileScreen;
