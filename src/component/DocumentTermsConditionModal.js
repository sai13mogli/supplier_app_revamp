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
                        <Text style={styles.ModalHeading}>Terms and Conditions</Text>
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
        marginBottom: Dimension.margin12,
        //alignSelf: 'center',
        marginHorizontal:Dimension.padding15,
        borderBottomColor:colors.BoxBorderColor,
        borderBottomWidth:1,
        paddingVertical:2
    },
    terms: {
        fontSize: Dimension.font12,
        color: colors.BrandColor,
        marginLeft:Dimension.margin5,
        fontFamily: Dimension.CustomMediumFont,
    },
    enterPrice: {
        fontSize: Dimension.font12,
        color: colors.FontColor,
        fontFamily: Dimension.CustomMediumFont,
       
        
    },
    modalContainer: {
        backgroundColor: colors.WhiteColor,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        marginTop: 'auto',
        paddingVertical: Dimension.padding20,
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
        paddingHorizontal: Dimension.padding15,
        
    },
    ModalHeading: {
        fontSize: Dimension.font14,
        color: colors.FontColor,
        fontFamily: Dimension.CustomSemiBoldFont,
        marginBottom: Dimension.margin20,
    },

});

export default DocumentTermsConditionModal;

