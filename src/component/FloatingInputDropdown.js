import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import CustomeIcon from '../component/common/CustomeIcon';
import Dimension from '../Theme/Dimension';
import colors from '../Theme/Colors';

const FloatingInputDropdown = props => {
    const { options, onValueChange, selectedValue, title, isImp } = props;
    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        if (props.handleFocus) {
            props.handleFocus();
        }
    };

    useEffect(() => {
        handleBlur();
        if (props.autoFocus) {
            handleFocus();
        }
    }, []);


    const handleBlur = runOnBlur => {
        if (props.hideLabel) {
            setIsFocused(true);
        } else {
            if (!props.value) {
                setIsFocused(false);
            } else {
                setIsFocused(true);
            }
        }
        if (props.onBlur && runOnBlur) {
            props.onBlur();
        }
    };

    const renderComponent = () => {
        return (
            <View>


                <Input
                    {...props}
                    label={() => (
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.labelStyle}>{props.label}</Text>
                            {props.isImp ? <Text style={styles.starIcon}>*</Text> : null}
                        </View>
                    )}
                    value={typeof props.value == 'function' ? getValue : props.value}
                    rightIcon={props.extraView ? <Menu
                        visible={visible}
                        anchor={
                            <TouchableOpacity onPress={showMenu} style={styles.dropDownBtn}>
                                <Text style={styles.qtVal}>{selectedValue}</Text>
                                <CustomeIcon
                                    name="arrow-drop-down-line"
                                    size={24}
                                    color={colors.FontColor}></CustomeIcon>
                            </TouchableOpacity>
                        }
                        onRequestClose={hideMenu}
                        style={styles.dropDownWrap}>
                        {options.map((item, itemIndex) => (
                            <MenuItem
                                onPress={() => {
                                    onValueChange(item.value, item.label);
                                    hideMenu();
                                }}
                                textStyle={styles.dropdownval}
                                style={styles.dropDowninnerWrap}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Menu> : null}
                    selectionColor={'#3c3c3c'}
                    disabled={props.disabled}
                    onFocus={handleFocus}
                    onBlur={() => handleBlur(true)}
                    containerStyle={styles.WrapperStyle}
                    inputContainerStyle={
                        props.IsMultiline
                            ? styles.MultiinputContainerStyle
                            : styles.inputContainerStyle
                    }

                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    rightIconContainerStyle={
                        props.isfromLogin
                            ? props.disabled ? styles.disabledIconBtnStyle : styles.iconBtnstyle

                            : styles.iconStyle
                    }
                    errorStyle={styles.errorText}
                    disabledInputStyle={styles.disabledInputStyle}
                    errorMessage={props.showError ? props.errorMessage : null}
                >
                </Input>

            </View>


        );
    };

    if (props.fromCategoryBrand) {
        if (props.brandName) {
            return renderComponent();
        } else if (props.isDeletedKey == '2' && props.brandListingUrl) {
            return renderComponent();
        } else {
            return null;
        }
    } else {
        return renderComponent();
    }
};

const styles = StyleSheet.create({
    WrapperStyle: {
        paddingHorizontal: 0,
    },
    dropDownBtn: {
        flexDirection: 'row',
        marginRight: -Dimension.margin15,
        borderColor: colors.FontColor,
        paddingHorizontal: Dimension.padding15,
        paddingVertical: Dimension.padding10,
        borderRadius: 4,
        height: Dimension.height40,
    },
    dropdownval: {
        fontSize: Dimension.font12,
        color: colors.FontColor,
        fontFamily: Dimension.CustomRegularFont,
        paddingLeft: Dimension.padding12,
        paddingRight: Dimension.padding12,
        borderBottomColor: colors.eyeIcon,
        borderBottomWidth: 0.5,
        width: '100%',
        paddingVertical: Dimension.padding10,
    },
    qtVal: {
        fontSize: Dimension.font12,
        fontFamily: Dimension.CustomRegularFont,
        color: colors.PrimaryTextColor,
        textAlign: 'center',
        top: 2,
        textAlignVertical: 'center',
        paddingLeft: Dimension.padding10,
    },
    labelStyle: {
        fontSize: Dimension.font10,
        color: colors.FontColor,
        fontFamily: Dimension.CustomMediumFont,
        marginLeft: Dimension.margin12,
        marginBottom: Dimension.margin5,
    },
    dropDowninnerWrap: {
        width: '100%',
    },
    starIcon: {
        color: colors.BrandColor,
        fontSize: Dimension.font10,
        fontFamily: Dimension.CustomMediumFont,
    },
    inputContainerStyle: {
        borderWidth: 1,
        borderColor: colors.FontColor,
        borderRadius: 4,
        height: Dimension.height40,
        paddingBottom: 0,
    },
    MultiinputContainerStyle: {
        borderWidth: 1,
        borderColor: colors.FontColor,
        borderRadius: 4,
        paddingHorizontal: Dimension.padding12,
        height: Dimension.height90,
        paddingBottom: 0,
    },
    labelStyle: {
        fontSize: Dimension.font10,
        color: colors.FontColor,
        fontFamily: Dimension.CustomMediumFont,
        marginLeft: Dimension.margin12,
        marginBottom: Dimension.margin5,
        fontWeight: 'normal',
    },
    inputStyle: {
        fontSize: Dimension.font12,
        color: colors.FontColor,
        fontFamily: Dimension.CustomRegularFont,
        paddingLeft: Dimension.padding12,
        paddingRight: Dimension.padding12,
    },
    iconStyle: {
        width: Dimension.width28,
        height: Dimension.height24,
        marginRight: Dimension.padding10,
    },
    iconBtnstyle: {
        paddingRight: Dimension.padding10,
    },
    disabledIconBtnStyle: {
        backgroundColor: colors.DisableStateColor,
        paddingRight: Dimension.padding10,
    },
    errorText: {
        fontSize: Dimension.font10,
        color: colors.BrandColor,
        fontFamily: Dimension.CustomMediumFont,
    },
    disabledInputStyle: {
        fontSize: Dimension.font12,
        color: colors.FontColor,
        fontFamily: Dimension.CustomRegularFont,
        paddingLeft: Dimension.padding12,
        paddingRight: Dimension.padding12,
        backgroundColor: colors.DisableStateColor,
        opacity: 1,
        padding: .1
    },
});

export default FloatingInputDropdown;
