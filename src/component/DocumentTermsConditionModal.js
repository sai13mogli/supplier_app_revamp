import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal, Linking, FlatList } from "react-native";
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../services/auth';
import Dimension from "../Theme/Dimension";
import colors from "../Theme/Colors"
import CustomButton from '../component/common/Button';
import CustomeIcon from '../component/common/CustomeIcon';
import FloatingInput from './common/FloatingInput';
import Toast from 'react-native-toast-message';

const DocumentTermsConditionModal = props => {

    const [email, setEmail] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [emalError, setEmalError] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        onPress,
        onClose,
        transparent,
        visible
    } = props;



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
                        <Text style={styles.ModalHeading}>Terms and Coditions</Text>
                        <TouchableOpacity
                            onPress={onPress}
                        ><CustomeIcon
                                name={'close'}
                                size={Dimension.font22}
                                color={colors.FontColor}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapView}>
                        <Text style={styles.enterPrice}>for ENTERPRISE(OFFLINE)</Text>
                        <TouchableOpacity
                            onPress={() => Linking.openURL('https://suppliercentralqa.moglilabs.com/files/enterprise-supplier-aggrement.pdf')}
                        ><Text style={styles.terms}>Terms & Condition</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.wrapView}>
                        <Text style={styles.enterPrice}>for ONLINE(RETAIL)</Text>
                        <TouchableOpacity
                            onPress={() => Linking.openURL('https://suppliercentralqa.moglilabs.com/files/supplier-aggrement.pdf')}
                        ><Text style={styles.terms}>Terms & Condition</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapView}>
                        <Text style={styles.enterPrice}>for ABFRL</Text>
                        <TouchableOpacity
                            onPress={() => Linking.openURL('https://suppliercentralqa.moglilabs.com/files/abg-supplier-aggrement.pdf')}
                        ><Text style={styles.terms}>Terms & Condition</Text>
                        </TouchableOpacity>

                    </View>

                </View>


            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    wrapView: {
        flexDirection: 'row',
        marginBottom: Dimension.margin16,
        alignSelf: 'center',
    },
    terms: {
        fontSize: Dimension.font16,
        color: colors.BrandColor,
        marginLeft: Dimension.margin5,
        fontFamily: Dimension.CustomMediumFont,
    },
    enterPrice: {
        fontSize: Dimension.font16,
        color: colors.FontColor,
        fontFamily: Dimension.CustomMediumFont,
        marginBottom: Dimension.margin40,
        alignSelf: 'center',
    },
    modalContainer: {
        backgroundColor: colors.WhiteColor,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        marginTop: 'auto',
        paddingTop: Dimension.padding20,
    },
    ModalheadingWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Dimension.padding15,
        marginBottom: Dimension.margin20
    },
    ModalHeading: {
        fontSize: Dimension.font16,
        color: colors.FontColor,
        fontFamily: Dimension.CustomSemiBoldFont,
        marginBottom: Dimension.margin20,
    },

});

export default DocumentTermsConditionModal;

