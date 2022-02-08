import React, {useState} from 'react';
import {View,Text,} from 'react-native';

const Header = props => {
return (
    <View>
        <Text>{props.showText}</Text>
    </View>
)
}

export default Header;