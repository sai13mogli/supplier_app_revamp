import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const MultiFileUpload = props => {
  const {docsList, title, subTitle, onUpload, onRemove} = props;

  const onOpenDocs = async () => {
    try {
      const res = await DocumentPicker.pick({});
      console.log('doc', res[0]);
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#000'}}>{doc.name}</Text>
          <Text style={{color: '#000'}} onPress={() => onRemove(doc.id)}>
            x
          </Text>
        </View>
      ))}
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: '#000',
          padding: 12,
        }}
        onPress={onOpenDocs}>
        <Text style={{color: '#000'}}>{title}</Text>
      </TouchableOpacity>
      <Text style={{color: '#000'}}>{subTitle}</Text>
    </View>
  );
};

export default MultiFileUpload;
