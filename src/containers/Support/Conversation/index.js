import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getConversation} from '../../../services/support';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Theme/Colors';

const Conversation = props => {
  const [ticketId, setTicketId] = useState(props.route.params.tickedId || '');
  const [ticketData, setTicketData] = useState({});
  const [body, setBody] = useState('');

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
      setTicketData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>index</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: '#000',
          borderWidth: 0.6,
          borderRadius: 4,
          margin: 12,
        }}>
        <TextInput
          placeholder="Type message"
          placeholderTextColor={'#ccc'}
          value={body}
          onChangeText={text => setBody(text)}
          style={{width: '78%', padding: 8, color: '#000'}}
        />
        <TouchableOpacity
          style={{margin: 4, padding: 8, backgroundColor: Colors.BrandColor}}>
          <Icon
            name={'chevron-right'}
            size={20}
            style={{color: '#fff', alignSelf: 'center'}}
            color={'#fff'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Conversation;
