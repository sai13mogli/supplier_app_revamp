import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { sendOtpForLogin, loginWithOtp } from '../services/auth';
import { updateEmail, updatePhone } from '../services/profile';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
import CustomButton from './common/Button';
import CustomeIcon from './common/CustomeIcon';
import FloatingInput from './common/FloatingInput';
import Toast from 'react-native-toast-message';

const UpdateNumberAndEmaiModal = props => {
    let interval = {};
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState(false);
    const [phone, setphone] = useState('');
    const [numberError, setNumberError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [inputType, setInputType] = useState(true);
    const [timer, setTimer] = useState(0);
    const [email, setEmail] = useState('');
    const [phoneEdit, setPhoneEdit] = useState(false);
    const [emailEdit, setEmailEdit] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [sendOtp, setSendOtp] = useState(false);
    const [resendOtp, setResendOtp] = useState(false);
    const businessDetails = useSelector(
        state => state.profileReducer.businessDetails.data || {},
    );

    useEffect(() => {
        if (props.frombusinessDetails) {
            onSendOtp();
        } else {
            setIsVisible(true);
            initializeCounter();
        }
    }, []);

    useEffect(() => {
        // if (props.route.params && props.route.params.disabled) {
        setPhoneEdit(false);
        setEmailEdit(false);
        // }
    }, []);

    useEffect(() => {
        if (
            phone &&
            phone.length &&
            phone.length == 10 &&
            phone !== (businessDetails.profile || {}).phone
        ) {
            setPhoneVerified(false);
            setSendOtp(true);
        }
    }, [phone]);

    const initializeCounter = () => {
        setTimer(60);
        interval = setInterval(() => {
            setTimer(timer => {
                if (timer > 0) {
                    return timer - 1;
                } else {
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);
    };

    // const getExtraView = () => {
    //     if (email && email.length && email.length == 10 && timer >= 1) {
    //         return (
    //             <Text style={styles.sendOtptext}>
    //                 00:{String(timer).length > 1 ? String(timer) : `0${timer}`}
    //             </Text>
    //         );
    //     } else {
    //         return (
    //             <Text style={styles.sendOtptext} onPress={onSendOtp}>
    //                 Resend OTP
    //             </Text>
    //         );
    //     }
    // };

    const getExtraOTPView = (phone) => {
        if (!phoneEdit) {
            return (
                <TouchableOpacity onPress={() => setPhoneEdit(true)}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000' }}>
                        EDIT
                    </Text>
                </TouchableOpacity>
            );
        } else if (phoneVerified) {
            return (
                <CustomeIcon
                    name={'right-tick-line'}
                    color={colors.SuccessStateColor}
                    size={Dimension.font20}></CustomeIcon>
            );
        } else {
            if (sendOtp) {
                if (phone && phone.length && phone.length == 10 && timer >= 1) {
                    return (
                        <TouchableOpacity style={styles.setndOtpBtn}>
                            <Text style={styles.sendOtptext}>
                                00:{String(timer).length > 1 ? String(timer) : `0${timer}`}
                            </Text>
                        </TouchableOpacity>
                    );
                } else {
                    return (
                        <TouchableOpacity
                            onPress={() => onSendOtp(6)}
                            style={styles.setndOtpBtn}>
                            <Text style={styles.sendOtptext}>
                                {resendOtp ? 'Resend OTP' : 'Send OTP'}
                            </Text>
                        </TouchableOpacity>
                    );
                }
            }
        }
    };

    // const onSendOtp = async () => {
    //     if (!props.frombusinessDetails) {
    //         initializeCounter();
    //         const { data } = await sendOtpForLogin(props.email);
    //         if (!data.success) {
    //             setIsVisible(false);
    //             Toast.show({
    //                 type: 'error',
    //                 text2: data.message,
    //                 visibilityTime: 2000,
    //                 autoHide: true,
    //             });

    //             // alert(data.message);
    //             // props.onClose();
    //         } else {
    //             setIsVisible(true);
    //         }
    //     } else {
    //         setIsVisible(true);
    //     }
    // };

    const onSendOtp = async type => {
        if (type == 6) {
            if (phone === (businessDetails.profile || {}).phone) {
                setphoneError(true);
                setPhoneErrorMsg('This phone number already registered with us.');
            } else {
                if (phone && phone.length && phone.length == 10) {
                    initializeCounter(type);
                    const { data } = await sendOtpForVerification(type);
                    setOtpModal(true);
                } else {
                    setphoneError(true);
                }
            }
        } else {
            if (email === (businessDetails.profile || {}).email) {
                setemailError(true);
                setEmailErrorMsg('This email ID already registered with us.');
            } else {
                if (email && email.length && email.match(emailRegex)) {
                    initializeCounter(type);
                    const { data } = await sendOtpForVerification(type);
                    setOtpModal(true);
                } else {
                    setemailError(true);
                }
            }
        }
    };



    const onSubmit = async () => {
        setOtpError(false);
        if (otp && otp.length && otp.length == 6) {
            setLoading(true);

            if (props.frombusinessDetails && props.type == 6) {
                let payload = {
                    phone: phone,
                    otp: otp,
                };
                const { data } = await updatePhone(payload);
                let suc = true;
                if (data.success) {
                    setLoading(false);
                    setIsVisible(false);
                    props.setPhoneVerified(true);
                    props.setresendOtp(false);
                } else {
                    setLoading(false);
                    setIsVisible(false);
                    Toast.show({
                        type: 'error',
                        text2: data.message,
                        visibilityTime: 2000,
                        autoHide: true,
                    });
                }
            } else if (props.frombusinessDetails && props.type == 5) {
                let payload = {
                    email: props.email,
                    otp: otp,
                };
                const { data } = await updateEmail(payload);
                let suc = true;
                if (data.success) {
                    setLoading(false);
                    setIsVisible(false);
                    props.setEmailVerified(true);
                    props.setresendOtpEmail(false);
                } else {
                    setLoading(false);
                    setIsVisible(false);
                    Toast.show({
                        type: 'error',
                        text2: data.message,
                        visibilityTime: 2000,
                        autoHide: true,
                    });
                }
            }

        } else {
            setOtpError(true);
        }
    };

    return (
        <Modal
            isVisible={props.visible && isVisible}
            coverScreen={true}
            backdropOpacity={0.9}
            onRequestClose={props.onClose}
            style={{ padding: 0, margin: 0 }}
            overlayPointerEvents={'auto'}
            onTouchOutside={props.onClose}
            onDismiss={props.onClose}
            onBackButtonPress={props.onClose}
            onBackdropPress={props.onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.topbdr}></View>
                <View style={styles.ModalheadingWrapper}>
                    <Text style={styles.ModalHeading}>Update Phone Number</Text>
                    {/* :
                            <Text style={styles.ModalHeading}>Update E-mail</Text> */}
                    {/* } */}

                    <CustomeIcon
                        name={'close'}
                        size={Dimension.font22}
                        color={Colors.FontColor}
                        onPress={props.onClose}></CustomeIcon>
                </View>
                <View style={styles.ModalFormWrap}>

                    <FloatingInput
                        value={phone}
                        // disabled={!phoneEdit}
                        extraView={() => getExtraOTPView(phone)}
                        errorMessage={'Invalid Phone Number'}
                        showError={numberError}
                        onChangeText={text => setphone(text)}
                        maxLength={10}
                        onBlur={() =>
                            !phone || (phone && phone.length != 10)
                                ? setNumberError(true)
                                : setNumberError(false)
                        }
                        keyboardType={'number-pad'}
                        label={'Phone Number'}
                        title={'Phone Number'}
                        isImp={true}

                    />


                    <FloatingInput
                        value={otp}
                        errorMessage={'Invalid OTP'}
                        showError={otpError}
                        onChangeText={text => setOtp(text)}
                        maxLength={6}
                        onBlur={() =>
                            !otp || (otp && otp.length != 6)
                                ? setOtpError(true)
                                : setOtpError(false)
                        }
                        keyboardType={'number-pad'}
                        secureTextEntry={inputType}
                        label={'OTP'}
                        title={'OTP'}
                        isImp={true}
                        extraView={() => (
                            <CustomeIcon
                                onPress={() => setInputType(!inputType)}
                                name={'eye-open'}
                                color={inputType ? '#979797' : '#000'}
                                size={Dimension.font20}></CustomeIcon>
                        )}
                    />

                    <View style={styles.buttonWrap}>
                        <CustomButton
                            loading={loading}
                            disabled={loading}
                            title={'CANCEL'}
                            buttonColor={Colors.DisableStateColor}
                            onPress={props.onClose}
                            TextColor={Colors.blackColor}
                            borderColor={Colors.WhiteColor}
                            TextFontSize={Dimension.font16}
                        />
                        <CustomButton
                            loading={loading}
                            disabled={otp ? false : true}
                            title={'UPDATE'}
                            buttonColor={otp ? Colors.BrandColor : Colors.DisableStateColor}
                            onPress={onSubmit}
                            TextColor={otp ? Colors.WhiteColor : Colors.blackColor}
                            borderColor={Colors.WhiteColor}
                            TextFontSize={Dimension.font16}
                        />
                    </View>


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
    TopWrap: {
        paddingHorizontal: Dimension.padding15,
    },
    topbdr: {
        alignSelf: 'center',
        height: 3,
        backgroundColor: Colors.modalBorder,
        borderRadius: 2,
        width: Dimension.width70,
    },
    ChangeTxtCss: {
        fontSize: Dimension.font16,
        color: Colors.ApproveStateColor,
        fontFamily: Dimension.CustomSemiBoldFont,
    },
    ModalheadingWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Dimension.padding15,
        paddingHorizontal: Dimension.padding15,
    },
    ModalHeading: {
        fontSize: Dimension.font16,
        color: Colors.FontColor,
        fontFamily: Dimension.CustomRobotoBold,
        marginBottom: Dimension.margin40,
    },
    ModalFormWrap: {
        marginBottom: Dimension.margin20,
        paddingHorizontal: Dimension.margin15,
    },
    ModalBottomBtnWrap: {
        borderTopWidth: 1,
        borderTopColor: Colors.grayShade2,
        padding: Dimension.padding15,
        backgroundColor: Colors.WhiteColor,
    },
    buttonWrap: {
        marginVertical: Dimension.margin20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: Dimension.padding20
    },
    bottomTxt: {
        fontSize: Dimension.font14,
        color: Colors.FontColor,
        fontFamily: Dimension.CustomRegularFont,

        alignSelf: 'center',
    },
    requesttxt: {
        fontSize: Dimension.font14,
        color: Colors.ApproveStateColor,
        fontFamily: Dimension.CustomMediumFont,
        marginLeft: Dimension.margin5,
    },
    setndOtpBtn: {
        backgroundColor: Colors.LightBrandColor,
        paddingVertical: Dimension.padding8,
        paddingHorizontal: Dimension.padding10,
        borderRadius: 2,
        alignItems: "center"
    },
    sendOtptext: {
        fontSize: Dimension.font12,
        color: Colors.BrandColor,
        fontFamily: Dimension.CustomRegularFont,
    },
});

export default UpdateNumberAndEmaiModal;
