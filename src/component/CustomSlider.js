import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Item from '../component/Item';
import Dimension from '../Theme/Dimension';

const CustomSlider = props => {
  const [first, setFirst] = useState(props.min);
  const [second, setSecond] = useState(4);

  const renderScale = () => {
    let text = 'month';
    var arr = [6, 3, 1, 15, 7];
    const items = [];
    for (let i = 0; i <= arr.length - 1; i++) {
      if (i == 3 || i == 4) {
        text = 'days';
      } else if (i == 2) {
        text = 'month';
      } else {
        text = 'months';
      }
      items.push(
        <Item value={' ' + arr[i]} first={first} second={second} text={text} />,
      );
    }
    return items;
  };

  useEffect(() => {
    multiSliderValuesChange(props.values);
  }, []);

  const multiSliderValuesChange = values => {
    setSecond(values[0]);
    props.callback(values);
    props.setValue(values[0]);
  };

  return (
    <View>
      {
        <View
          style={[
            styles.column,
            {
              transform: [{rotate: '-90deg'}],
              marginLeft: props.LRpadding,
              marginRight: props.LRpadding,
            },
          ]}>
          {renderScale()}
        </View>
      }
      <View style={styles.container}>
        <MultiSlider
          vertical={true}
          values={props.values}
          step={1}
          onValuesChangeFinish={multiSliderValuesChange}
          min={0}
          max={4}
          allowOverlap={true}
          customMarker={() => (
            <View style={styles.markerWrap}>
              <Image
                style={styles.image}
                source={require('../assets/images/slider-button.png')}
                resizeMode={'cover'}
              />
            </View>
          )}
          snapped={true}
          trackStyle={{backgroundColor: '#0000001F'}}
          selectedStyle={{backgroundColor: '#0000001F'}}
          sliderLength={Dimension.verticleSliderHeight}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: -Dimension.sliderBottomheight,
    //left:100
  },
  active: {
    textAlign: 'center',
    fontSize: 20,
    color: '#CECECE',
  },
  inactive: {
    textAlign: 'center',
    fontWeight: 'normal',
    color: '#bdc3c7',
  },
  line: {
    textAlign: 'center',
  },
  markerWrap: {
    width: Dimension.height50,
    height: Dimension.height50,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },

  image: {
    width: Dimension.width20,
    height: Dimension.width20,
  },
});

export default CustomSlider;
