import React from 'react';
import {Text, View} from 'react-native';
import TicketsList from './TicketsList';

const SupportScreen = () => {
  return (
    <View>
      <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
        SupportScreen
      </Text>
      <TicketsList />
    </View>
  );
};

export default SupportScreen;
