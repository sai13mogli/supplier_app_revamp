import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal, ScrollView, FlatList } from "react-native";
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../services/auth';
import Dimension from "../Theme/Dimension";
import colors from "../Theme/Colors"
import CustomButton from '../component/common/Button';
import CustomeIcon from '../component/common/CustomeIcon';
import FloatingInput from './common/FloatingInput';
import Toast from 'react-native-toast-message';

const ForgotPasswordModal = props => {

    const [email, setEmail] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [inputType, setInputType] = useState(true);
    const [emalError, setEmalError] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const {
        onPress,
        onClose,
        transparent,
        visible
    } = props;

    const onContinue = async () => {

        setEmalError(false);
        if (email && email.length) {
            setLoading(true);
            let payload = {
                email: email
            };
            const { data, message } = await forgotPassword(payload);
            let suc = true;
            if (data.success) {
                setLoading(false);
                setIsVisible(true);
                props.onContinue(data);
                Toast.show({
                    type: 'success',
                    text2: data.message,
                    visibilityTime: 2000,
                    autoHide: true,
                });
            } else {
                setLoading(false);
                setIsVisible(true);
                alert('Invalid Email!');
            }

        } else {
            setEmalError(true);
        }
    };

    return (
        <Modal
            animationType="slide"
            overlayPointerEvents={'auto'}
            isVisible={visible && isVisible}
            onTouchOutside={onClose}
            transparent={transparent}
            hasBackdrop={true}
            backdropOpacity={0.4}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#0000004D',
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.ModalheadingWrapper}>
                        <Text style={styles.ModalHeading}>Forgot Password{props.header}</Text>
                        <TouchableOpacity
                            onPress={onPress}
                        ><CustomeIcon
                                name={'close'}
                                size={Dimension.font22}
                                color={colors.FontColor}
                            />
                        </TouchableOpacity>
                    </View>
                    <FloatingInput
                        value={email}
                        errorMessage={'Invalid Email'}
                        showError={emalError}
                        onChangeText={text => setEmail(text)}
                        onBlur={() =>
                            !email || (email && email.length)
                                ? setEmalError(true)
                                : setEmalError(false)
                        }
                        label={'Email'}
                        title={'Email'}
                        isImp={true}

                    />
                </View>
                <View style={styles.bottombtnWrap}>
                    <CustomButton
                        buttonColor={colors.BrandColor}
                        borderColor={colors.BrandColor}
                        TextColor={colors.WhiteColor}
                        TextFontSize={Dimension.font16}
                        title={'Continue'}
                        loading={loading}
                        onPress={onContinue}
                    />
                </View>

            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    container: {
    },
    Email: {
        fontSize: Dimension.font16,
        color: colors.FontColor,
        fontFamily: Dimension.CustomRegularFont,
        marginBottom: Dimension.margin40,
        alignSelf: 'center',
        marginHorizontal: Dimension.margin30
    },
    modalContainer: {
        backgroundColor: colors.WhiteColor,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        marginTop: 'auto',
        paddingTop: Dimension.padding80,
    },
    bottombtnWrap: {
        padding: Dimension.padding15,
        borderTopColor: colors.grayShade2,
        borderTopWidth: 1,
        backgroundColor: colors.WhiteColor
    },
    ModalheadingWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: Dimension.padding15,
    },
    ModalHeading: {
        fontSize: Dimension.font16,
        color: colors.FontColor,
        fontFamily: Dimension.CustomSemiBoldFont,
        marginBottom: Dimension.margin5,
    },

});

export default ForgotPasswordModal;

