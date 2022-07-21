import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';
import CustomeIcon from './CustomeIcon';

const FileUpload = props => {
  const {
    label,
    onPress,
    isImp,
    value,
    loading,
    showDoc,
    onRemove,
    id,
    fId,
    closeDoc,
    openDoc,
    uploadFromCamera,
    fileUpload,
    fromCategoryBrand,
    uploadDocument,
    errorState,
    errorText,
    disabled,
  } = props;

  if (fileUpload == 2 || fileUpload == 3) {
    return (
      <TouchableOpacity onPress={disabled ? null : onPress}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.labelStyle}>{label}</Text>
          {isImp ? <Text style={styles.starIcon}>*</Text> : null}
        </View>
        <View style={styles.inputContainerStyle}>
          {!value ? (
            <Text style={styles.placeholderCss}>Tap to upload</Text>
          ) : (
            <View style={{flexDirection: 'row', width: '85%'}}>
              <Text style={styles.inputStyle} numberOfLines={1}>
                {value}
              </Text>
              {closeDoc ? (
                <TouchableOpacity
                  disabled={disabled}
                  onPress={() => {
                    console.log('doc id', id);
                    onRemove(id);
                  }}>
                  <CustomeIcon
                    name={'close'}
                    size={Dimension.font20}
                    color={colors.FontColor}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          )}
          {loading ? (
            <ActivityIndicator
              size={'small'}
              color={'red'}
              style={{marginRight: 4}}
            />
          ) : showDoc ? (
            <TouchableOpacity onPress={() => openDoc(id)}>
              <CustomeIcon
                name={'eye-open'}
                size={Dimension.font20}
                color={colors.eyeIcon}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity disabled={disabled} onPress={uploadDocument}>
              <CustomeIcon
                name={'upload'}
                size={Dimension.font20}
                color={colors.BrandColor}
              />
            </TouchableOpacity>
          )}
        </View>
        {errorState ? <Text style={styles.errText}>{errorText}</Text> : null}
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};
const styles = StyleSheet.create({
  WrapperStyle: {
    marginBottom: Dimension.margin10,
    paddingHorizontal: 0,
  },
  errText: {
    fontSize: Dimension.font10,
    color: colors.BrandColor,
    bottom: Dimension.margin5,
    fontFamily: Dimension.CustomMediumFont,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: colors.FontColor,
    borderRadius: 4,
    paddingHorizontal: Dimension.padding12,
    height: Dimension.height40,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Dimension.margin10,
    backgroundColor: colors.WhiteColor,
    textAlignVertical: 'center',
    paddingVertical: Dimension.padding12,
  },
  placeholderCss: {
    fontSize: Dimension.font14,
    color: colors.placeholderColor,
    fontFamily: Dimension.CustomMediumFont,
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
    fontSize: Dimension.font14,
    color: colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,

    paddingLeft: 0,
  },
  iconStyle: {
    width: Dimension.width24,
    height: Dimension.height24,
    paddingRight: 0,
  },
  errorText: {
    fontSize: Dimension.font10,
    color: colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  disabledInputStyle: {
    fontSize: Dimension.font14,
    color: colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,

    paddingLeft: 0,
    backgroundColor: colors.DisableStateColor,
  },
  labelStyle: {
    fontSize: Dimension.font10,
    color: colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft: Dimension.margin12,
    marginBottom: Dimension.margin5,
  },
  starIcon: {
    color: colors.BrandColor,
    fontSize: Dimension.font10,

    fontFamily: Dimension.CustomMediumFont,
  },
});
export default FileUpload;
