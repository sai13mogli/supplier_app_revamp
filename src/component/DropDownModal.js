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
import colors from '../Theme/Colors';
import DotCheckbox from '../component/common/Checkbox';

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
      style={styles.modalWrap}
      deviceWidth={deviceWidth}
      hasBackdrop={true}>
      <View style={styles.modalView}>
        <View style={styles.modalViewInner}>
          <View style={styles.ModalContentWrap}>
            <View style={styles.signUpWrap}>
              <View style={styles.textView}>
                <View style={styles.sortBy}>
                  <Text style={styles.Title}>Filter</Text>
                </View>
                <View>
                  <TouchableOpacity onPress={props.closeModal}>
                    <Text
                      style={{color: '#000', fontSize: 12, fontWeight: 'bold'}}>
                      close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <DotCheckbox
                data={items}
                onCheck={getFilterValue}
                value={props.selectedValue}
                formfilterModal={true}
              />

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
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  ModalContentWrap: {
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
    // backgroundColor: colors.PrimaryTextColor,
  },
  signUpWrap: {
    backgroundColor: colors.WhiteColor,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 200,
    padding: 100,
  },
  SoryByData: {
    borderTopColor: colors.ProductBorderColor,
    flexDirection: 'row',
    padding: Dimension.padding15,
    borderTopWidth: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  radioWrap: {marginTop: Dimension.margin5},
  sortBtdata: {
    alignSelf: 'center',
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomMediumFont,
    color: colors.PrimaryTextColor,
    marginLeft: Dimension.margin20,
  },
  modalWrap: {
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
    paddingLeft: 0,
    margin: 0,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'relative',
    width: '100%',
  },
  modalViewInner: {position: 'absolute', bottom: 0, width: '100%'},
  textView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Dimension.padding15,
  },
  sortBy: {paddingBottom: Dimension.padding15},
  modalClose: {fontSize: Dimension.font20},
  row: {flexDirection: 'row'},
  Title: {
    fontSize: Dimension.font14,
    color: colors.PrimaryTextColor,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  activeBackground: {
    backgroundColor: 'red',
  },
  inactiveBackground: {
    backgroundColor: '#fff',
  },
});

export default DropDownModal;
