import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getConversation} from '../../../services/support';

const Conversation = props => {
  const [ticketId, setTicketId] = useState(props.route.params.tickedId || '');

  useEffect(() => {
    getTicketConversation();
  }, []);

  const getTicketConversation = async () => {
    try {
      let supplierId = await AsyncStorage.getItem('userId');
      let payload = {
        ticketNumber: ticketId,
        supplierId: supplierId,
      };

      const {data} = await getConversation(payload);
      console.log('data', data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default Conversation;
