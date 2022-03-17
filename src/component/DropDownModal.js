import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import Dimension from '../Theme/Dimension';
import Colors from '../Theme/Colors';
import DotCheckbox from '../component/common/Checkbox';
import CustomeIcon from './common/CustomeIcon';
// onBackdropPress={() => props.setFiltersModal(false)}
//       onBackButtonPress={() => props.setFiltersModal(false)}

const deviceWidth = Dimensions.get('window').width;

const DropDownModal = props => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mutateItems = (props.items || []).map((_, i) => ({
      ..._,
      title: _.label,
      key: _.value,
    }));
    setItems(mutateItems);
  }, []);

  const getFilterValue = value => {
    console.log(value);
    props.onSelect(value);
  };

  return (
    <Modal
      overlayPointerEvents={'auto'}
      isVisible={props.visible}
      onTouchOutside={props.closeModal}
      onDismiss={props.closeModal}
      coverScreen={true}
      onBackButtonPress={props.closeModal}
      style={{padding: 0, margin: 0}}
      deviceWidth={deviceWidth}
      hasBackdrop={true}>
      <View style={styles.modalContainer}>
        <View style={styles.topbdr}></View>
        <View style={styles.ModalheadingWrapper}>
          <Text style={styles.ModalHeading}>{props.title}</Text>
          <CustomeIcon
            name={'close'}
            size={Dimension.font22}
            color={Colors.FontColor}
            onPress={props.closeModal}></CustomeIcon>
        </View>

        <View style={styles.MidWrapper}>
          <DotCheckbox
            data={items}
            onCheck={getFilterValue}
            value={props.selectedValue}
            formfilterModal={true}
          />
        </View>

        {/* {filtersTypeData.map((item, index) => (
                <TouchableOpacity
                  onPress={() => props.setActiveFilterType(item.key)}
                  style={[
                    item && item.key == props.activeFilterType
                      ? styles.activeBackground
                      : styles.inactiveBackground,
                  ]}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 12,
                      fontWeight: 'bold',
                      margin: 10,
                    }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
              {renderRight()} */}
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
    padding: Dimension.padding20,
  },
  ModalHeading: {
    fontSize: Dimension.font16,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginBottom: Dimension.margin5,
  },

  MidWrapper: {
    marginVertical: Dimension.margin20,
    paddingHorizontal: Dimension.padding15,
  },
});

export default DropDownModal;
