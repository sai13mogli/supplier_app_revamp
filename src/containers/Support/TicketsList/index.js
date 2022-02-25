import React, {useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTickets} from '../../../redux/actions/support';
import {STATE_STATUS} from '../../../redux/constants';

const TicketsList = props => {
  const ticketsList = useSelector(state => state.supportReducer.data || []);
  const ticketsStatus = useSelector(
    state => state.supportReducer.status || STATE_STATUS.UNFETCHED,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (ticketsStatus != STATE_STATUS.FETCHED) {
      dispatch(fetchTickets(1, 0, 0, ''));
    }
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          borderColor: '#000',
          borderRadius: 4,
          borderWidth: 0.5,
          padding: 12,
          marginHorizontal: 12,
          marginTop: 12,
        }}>
        <Text style={{color: '#000'}}>{item.subject}</Text>
        <Text style={{color: '#000'}}>Ticket ID: {item.id}</Text>
        <Text style={{color: '#000'}}>{item.statusText}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={ticketsList}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}-item`}
      />
    </View>
  );
};

export default TicketsList;
