import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { filtersTypeData, filtersData } from '../redux/constants/support';
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
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
import DotCheckbox from './common/Checkbox';
import CustomSlider from './CustomSlider';
import CustomeIcon from './common/CustomeIcon'

const deviceWidth = Dimensions.get('window').width;

const FilterModal = props => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [currentSlider, setCurrentSlider] = useState(0);

  const getFilterValue = value => {
    console.log('value hai dost', value);
    props.setFiltersModal(false);
    props.setTypeFilter(value);
  };

  const renderRight = () => {
    if (props.activeFilterType == 'type') {
      return (
        <View style={styles.RightInnerPart}>
          <DotCheckbox
            data={filtersData && filtersData[props.activeFilterType]}
            onCheck={getFilterValue}
            value={props.typeFilter}
            formfilterModal={true}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.RightInnerPart}>
          <View
            style={{
              // marginTop: Dimension.margin10,
              //height: Dimension.height300,
              //right: '30%',
              //paddingVertical: Dimension.padding80,
            }}>
            <CustomSlider
              values={[sliderIndex]}
              min={1}
              max={4}
              LRpadding={0}
              callback={singleSliderValueCallback}
              single={true}
            />
          </View>
        </View>
      );
    }
  };

  const singleSliderValueCallback = values => {
    let days = 180;
    if (values[0] == 0) {
      setSliderIndex(0);
      days = 180;
    }
    if (values[0] == 1) {
      setSliderIndex(1);
      days = 90;
    }
    if (values[0] == 2) {
      setSliderIndex(3);
      days = 30;
    }
    if (values[0] == 3) {
      setSliderIndex(3);
      days = 15;
    }
    if (values[0] == 4) {
      setSliderIndex(4);
      days = 7;
    }
    setCurrentSlider(days);
    props.setFiltersModal(false);
    props.setTimeFilter(days);
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
      style={{ padding: 0, margin: 0 }}
      deviceWidth={deviceWidth}
      hasBackdrop={true}
      onBackdropPress={() => props.setFiltersModal(false)}
      onBackButtonPress={() => props.setFiltersModal(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.topbdr}></View>
        <View style={styles.ModalheadingWrapper}>
          <Text style={styles.ModalHeading}>filter</Text>
          <CustomeIcon
            name={'close'}
            size={Dimension.font22}
            color={Colors.FontColor}
            onPress={() => {
              props.setFiltersModal(false);
            }}></CustomeIcon>
        </View>


        <View style={styles.MidWrapper}>
          <View style={styles.leftPart}>
            {filtersTypeData.map((item, index) => (
              <TouchableOpacity
                onPress={() => props.setActiveFilterType(item.key)}
                style={[
                  item && item.key == props.activeFilterType
                    ? styles.activeBackground
                    : styles.inactiveBackground,
                ]}>
                <Text
                  style={[
                    item && item.key == props.activeFilterType
                      ? styles.LeftActiveTxt
                      : styles.LeftInActiveTxt,
                  ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.rightPart}>
            {renderRight()}
          </View>
        </View>



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
  TopWrap: {
    paddingHorizontal: Dimension.padding15,
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
    paddingVertical: Dimension.padding15,
  },
  ModalHeading: {
    fontSize: Dimension.font16,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginBottom: Dimension.margin5,
  },
  ModalFormWrap: {
    marginBottom: Dimension.margin20,
  },
  ModalBottomBtnWrap: {
    borderTopWidth: 1,
    borderTopColor: Colors.grayShade2,
    padding: Dimension.padding15,
    backgroundColor: Colors.WhiteColor,
  },

  MidWrapper: {
    flexDirection: "row",
    borderTopColor: Colors.grayShade2,
    borderTopWidth: 1,

  },
  leftPart: {
    flex: 3,
    borderRightColor: Colors.grayShade2,
    borderRightWidth: 1,


  },
  activeBackground: {
    backgroundColor: Colors.LightBrandColor,
    paddingVertical: Dimension.padding15,
    paddingHorizontal: Dimension.padding20
  },
  inactiveBackground: {
    backgroundColor: '#fff',
    paddingVertical: Dimension.padding15,
    paddingHorizontal: Dimension.padding20
  },
  LeftInActiveTxt: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  LeftActiveTxt: {
    fontSize: Dimension.font14,
    color: Colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  rightPart: {
    flex: 7,
    //alignItems:"flex-start"
  },
  RightInnerPart: {
    paddingLeft: Dimension.padding30,
    marginBottom: Dimension.padding30
  },
});

export default FilterModal;
