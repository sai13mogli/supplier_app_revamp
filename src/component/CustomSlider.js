import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Item from '../component/Item';

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

  const multiSliderValuesChange = values => {
    setSecond(values[0]);
    props.callback(values);
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
      <View>
        <MultiSlider
          vertical={true}
          values={props.values}
          step={1}
          onValuesChangeFinish={multiSliderValuesChange}
          min={0}
          max={4}
          allowOverlap={true}
          //   customMarker={CustomMarker}
          snapped={true}
          trackStyle={{backgroundColor: '#0000001F'}}
          selectedStyle={{backgroundColor: '#0000001F'}}
          //   sliderLength={Dimension.verticleSliderHeight - 20}
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
    bottom: 30,
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
});

export default CustomSlider;
