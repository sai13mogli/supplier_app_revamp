import React from 'react';
import Modal from 'react-native-modal';
import {filtersTypeData, filtersData} from '../redux/constants/support';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Button,
  Dimensions,
} from 'react-native';
import colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
import DotCheckbox from './common/Checkbox';
const deviceWidth = Dimensions.get('window').width;

const FilterModal = props => {
  const getValue = value => {
    props.setFilterValue(value);
  };

  const renderRight = () => {
    if (
      filtersData &&
      filtersData[props.activeFilterType] &&
      filtersData[props.activeFilterType].length
    ) {
      return (
        <DotCheckbox
          data={filtersData && filtersData[props.activeFilterType]}
          onCheck={getValue}
          value={props.filterValue}
        />
      );
    }
  };

  return (
    <Modal
      overlayPointerEvents={'auto'}
      isVisible={props.filtersModal}
      onTouchOutside={() => {
        props.setFiltersModal(false);
      }}
      onDismiss={() => {
        props.setFiltersModal(false);
      }}
      coverScreen={true}
      style={styles.modalWrap}
      deviceWidth={deviceWidth}
      hasBackdrop={true}
      onBackdropPress={() => props.setFiltersModal(false)}
      onBackButtonPress={() => props.setFiltersModal(false)}>
      <View style={styles.modalView}>
        <View style={styles.modalViewInner}>
          <View style={styles.ModalContentWrap}>
            <View style={styles.signUpWrap}>
              <View style={styles.textView}>
                <View style={styles.sortBy}>
                  <Text style={styles.Title}>Filter</Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      props.setFiltersModal(false);
                    }}>
                    <Text
                      style={{color: '#000', fontSize: 12, fontWeight: 'bold'}}>
                      close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {filtersTypeData.map((item, index) => (
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
              {renderRight()}
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

export default FilterModal;
