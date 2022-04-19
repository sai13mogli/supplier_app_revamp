import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Dimension from '../../Theme/Dimension';
import Colors from '../../Theme/Colors';
import CustomeIcon from './CustomeIcon';

const MultiFileUpload = props => {
  const {docsList, title, subTitle, onUpload, onRemove} = props;

  const onOpenDocs = async () => {
    try {
      const res = await DocumentPicker.pick({});
      onUpload({...res[0], id: Date.now()});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled from single doc picker');
      } else {
        console.log('error', err);
        throw err;
      }
    }
  };

  return (
    <View>
      {docsList.map((doc, docKey) => (
        <View style={styles.fileOutWrap}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.IconWrap}>
              <CustomeIcon
                name={'orders-line'}
                size={Dimension.font22}
                color={Colors.eyeIcon}></CustomeIcon>
            </View>
            <Text style={styles.DocumentName}>{doc.name}</Text>
          </View>

          <CustomeIcon
            name={'delete'}
            size={Dimension.font22}
            color={Colors.blackColor}
            onPress={() => onRemove(doc.id)}></CustomeIcon>
          {/* <Text style={{color: '#000'}} onPress={() => onRemove(doc.id)}>
            x
          </Text> */}
        </View>
      ))}
      <TouchableOpacity style={styles.uploadBtn} onPress={onOpenDocs}>
        <Text style={styles.uploadBTnTxt}>{title}</Text>
        <Image
          source={require('../../assets/images/attachIcon.png')}
          style={{
            height: Dimension.height16,
            width: Dimension.height16,
            marginLeft: Dimension.margin5,
          }}
        />
      </TouchableOpacity>
      <Text style={styles.subTitleTxt}>{subTitle}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  ContainerCss: {
    backgroundColor: Colors.WhiteColor,
    paddingHorizontal: Dimension.padding15,
  },
  BottomWrap: {
    borderTopWidth: 1,
    borderTopColor: Colors.grayShade2,
    padding: Dimension.padding15,
    backgroundColor: Colors.WhiteColor,
  },
  subTitleTxt: {
    fontSize: Dimension.font10,
    fontFamily: Dimension.CustomRegularFont,
    color: Colors.eyeIcon,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: Dimension.margin5,
  },
  uploadBtn: {
    borderWidth: 1,
    borderColor: Colors.BrandColor,
    borderRadius: 4,
    borderStyle: 'Dashed',
    flexDirection: 'row',
    paddingVertical: Dimension.padding12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBTnTxt: {
    ontSize: Dimension.font14,
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.BrandColor,
  },
  fileOutWrap: {
    backgroundColor: Colors.grayShade5,
    borderColor: Colors.BoxBorderColor,
    borderWidth: 1,
    padding: Dimension.padding5,
    paddingRight: Dimension.padding12,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Dimension.margin20,
    textAlignVertical: 'center',
    alignItems: 'center',
  },
  DocumentName: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomRegularFont,
    color: Colors.FontColor,
    marginLeft: Dimension.margin10,
  },
  IconWrap: {
    width: Dimension.width50,
    height: Dimension.height45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.BoxBorderColor,
    borderRadius: 4,
    backgroundColor: Colors.WhiteColor,
  },
});
export default MultiFileUpload;
