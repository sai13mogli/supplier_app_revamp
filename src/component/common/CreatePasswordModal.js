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
import Progress from 'react-native-progress/Bar';
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
      
      <CustomeIcon
        onPress={() => setIsSecure(!isSecure)}
        name="eye-open"
        color={Colors.eyeIcon}
        size={Dimension.font20}
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
          <View style={styles.progressbarWrap}>
            <View style={{flex:.8}}>
            <Progress
              width={null}
              animated={false}
              progress={
               // PROGRESS[profileData.verificationStatus]
                0.5
              }
              color={Colors.SuccessStateColor}
              unfilledColor={Colors.grayShade11}
              borderColor={Colors.grayShade11}
              height={Dimension.height5}
            />
            </View>
            
            <View style={{flex:.2,  alignItems:"flex-end",}}>
            <Text style={styles.progressBottomtxt}>
              Weak
            </Text>
            </View>
            
          </View>
          <View style={styles.passwordConditionWrap}>

          <View style={{flexDirection:"row",}}>
          <View style={styles.dotStyle}></View>
            <Text style={styles.ConditionTxt}>
          
          At least 8 characters—the more characters, the better.
        </Text>
          </View>
          <View style={{flexDirection:"row",}}>
          <View style={styles.dotStyle}></View>
          <Text style={styles.ConditionTxt}>
            A mixture of both uppercase and lowercase letters.
          </Text>
          </View>
          
          <View style={{flexDirection:"row",}}>
          <View style={styles.dotStyle}></View>
          <Text style={styles.ConditionTxt}>A mixture of letters and numbers.</Text>
          </View>
          <View style={{flexDirection:"row",}}>
          <View style={styles.dotStyle}></View>
          <Text style={styles.ConditionTxt}>
            Inclusion of at least one special character, e.g., ! @ # ? ]
          </Text>
          </View>
          </View>
        </View>

        <View style={styles.bottomBtnWrap}>
          <CustomButton
            title={'CONFIRM'}
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
    padding: Dimension.padding15,
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
  passwordConditionWrap:{
    paddingVertical:Dimension.padding30
  },
  ConditionTxt:{
    fontSize: Dimension.font12,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomRegularFont ,
    marginBottom: Dimension.margin3,
  },
  dotStyle:{
    width:Dimension.height5,
    height:Dimension.height5,
    borderRadius:5,
    backgroundColor:Colors.eyeIcon,
    alignItems:"center",
    marginRight:Dimension.margin5,
    marginTop:Dimension.margin5
  },
  progressbarWrap:{
    paddingVertical:Dimension.padding5,
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
 
  progressBottomtxt:{
    fontSize: Dimension.font10,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
  
    
  },
});

export default CreatePasswordModal;
