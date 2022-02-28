import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Item = props => {
  const checkActive = () => {
    if (props.value >= props.first && props.value <= props.second) return true;
    else return true;
  };

  return (
    <View style={{}}>
      <Text style={[checkActive() ? styles.active : styles.inactive]}>
        {props.value} {props.text}
      </Text>
      {
        <Text style={[checkActive() ? styles.line : {}]}>
          {' '}
          {checkActive() ? '|' : ''}
        </Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  active: {
    width: 60,
    transform: [{rotate: '90deg'}],
    textAlign: 'left',
    fontSize: 10,
    color: '#363636',
    // fontFamily: Dimension.CustomMediumFont,
    bottom: 50,
  },
  inactive: {
    width: 60,
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'normal',
    color: '#363636',
    fontSize: 10,
    // fontFamily: Dimension.CustomMediumFont,
  },
  line: {
    fontSize: 25,
    textAlign: 'center',
    color: '#0000001F',
    marginTop: 20,
  },
});

export default Item;
