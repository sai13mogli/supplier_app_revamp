import React, {useEffect, useState} from 'react';
import {Dimensions, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';
import CustomButton from './Button';
import CustomeIcon from './CustomeIcon';
import FloatingLabelInputField from './FloatingInput';
import {setUserPassword} from '../../services/auth';

const deviceWidth = Dimensions.get('window').width;

const CreatePasswordModal = props => {
  useEffect(() => {
    if (init) {
      onPasswordBlur();
    } else {
      setInit(true);
    }
  }, [password]);

  const {visible, onClose, onSuccess} = props;
  const [init, setInit] = useState(false);
  const [loader, setLoader] = useState(false);
  const [password, setpassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isSecure, setIsSecure] = useState(true);

  const getExtraView = () => {
    return (
      <Icon
        onPress={() => setIsSecure(!isSecure)}
        name="eye"
        color={'#ccc'}
        size={20}
      />
    );
  };

  const onPasswordBlur = () => {
    if (
      password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      )
    ) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const onSubmit = async () => {
    if (
      password &&
      password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      )
    ) {
      try {
        setLoader(true);
        const {data} = await setUserPassword(password);
        if (data.success) {
          setLoader(false);
          onSuccess();
        }
      } catch (e) {
        setLoader(false);
      }
    } else {
      onPasswordBlur();
    }
  };

  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      onDismiss={onClose}
      overlayPointerEvents={'auto'}
      coverScreen={true}
      style={{padding: 0, margin: 0}}
      deviceWidth={deviceWidth}
      hasBackdrop={true}>
      <View style={styles.modalContainer}>
        <View style={styles.topbdr}></View>
        <View style={styles.ModalheadingWrapper}>
          <Text style={styles.ModalHeading}>Create Password</Text>
          <CustomeIcon
            name={'close'}
            size={Dimension.font22}
            color={Colors.FontColor}
            onPress={() => {
              props.setFiltersModal(false);
            }}></CustomeIcon>
        </View>
        <View style={{padding: Dimension.padding10}}>
          <FloatingLabelInputField
            title={'Type Password'}
            label={'Type Password'}
            isImp={true}
            value={password}
            onChangeText={text => setpassword(text)}
            errorMessage={'Invalid password'}
            placeholder={'Type your password'}
            showError={passwordError}
            onBlur={() => onPasswordBlur()}
            secureTextEntry={isSecure}
            extraView={() => getExtraView()}
          />
          <Text style={{color: '#000'}}>
            At least 8 characters—the more characters, the better.
          </Text>
          <Text style={{color: '#000'}}>
            A mixture of both uppercase and lowercase letters.
          </Text>
          <Text style={{color: '#000'}}>A mixture of letters and numbers.</Text>
          <Text style={{color: '#000'}}>
            Inclusion of at least one special character, e.g., ! @ # ? ]
          </Text>
        </View>

        <View style={styles.bottomBtnWrap}>
          <CustomButton
            title={'NEXT'}
            disabled={loader || passwordError || !password}
            loading={loader}
            buttonColor={Colors.BrandColor}
            onPress={onSubmit}
            TextColor={Colors.WhiteColor}
            borderColor={Colors.BrandColor}
            TextFontSize={Dimension.font16}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.WhiteColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingTop: Dimension.padding10,
  },
  topbdr: {
    alignSelf: 'center',
    height: 3,
    backgroundColor: Colors.modalBorder,
    borderRadius: 2,
    width: Dimension.width70,
  },
  ModalheadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Dimension.padding15,
  },
  ModalHeading: {
    fontSize: Dimension.font16,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginBottom: Dimension.margin5,
  },
  bottomBtnWrap: {
    padding: Dimension.padding15,

    borderTopColor: Colors.grayShade1,
    borderTopWidth: 1,
    backgroundColor: '#fff',
  },
});

export default CreatePasswordModal;
