import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Dimension from '../Theme/Dimension';

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
  active:{
    width:Dimension.width60,
    transform: [{ rotate: '90deg' }],
      textAlign: 'left',
      fontSize:Dimension.font10,
      color:'#363636',
      fontFamily:Dimension.CustomMediumFont,
      bottom:-Dimension.padding50

  },
  inactive:{
      width:Dimension.width60,
      flex:1,
      textAlignVertical: 'center',
      textAlign: 'center',
      fontWeight:'normal',
      color:'#363636',
      fontSize:Dimension.font10,
      fontFamily:Dimension.CustomMediumFont
  },
  line:{
      fontSize:25,
      textAlign: 'center',
      color:"#0000001F",
      marginTop:-Dimension.margin20,
  }
});

export default Item;
