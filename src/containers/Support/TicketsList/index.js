import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTickets} from '../../../redux/actions/support';
import {STATE_STATUS} from '../../../redux/constants';
import FilterModal from '../../../component/FilterModal';
import {filtersTypeData, filtersData} from '../../../redux/constants/support';
import CustomeIcon from '../../../component/common/CustomeIcon';

const TicketsList = props => {
  const ticketsList = useSelector(state => state.supportReducer.data || []);
  const ticketsStatus = useSelector(
    state => state.supportReducer.status || STATE_STATUS.UNFETCHED,
  );
  const pageIndex = useSelector(state => state.supportReducer.page || 0);

  const maxPage = 15;
  const [initLoader, setInitLoader] = useState(true);
  const [loader, setLoader] = useState(true);
  const [filtersModal, setFiltersModal] = useState(false);
  const [activeFilterType, setActiveFilterType] = useState('type');
  const [typeFilter, setTypeFilter] = useState(0);
  const [timeFilter, setTimeFilter] = useState('0');
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const onEndReachedCalledDuringMomentum = useRef(true);

  useEffect(() => {
    // if (ticketsStatus != STATE_STATUS.FETCHED) {
    //   fetchTicketListing(1, '');
    //   // dispatch(fetchTickets(1, 0, 0, ''));
    // }
    // if (ticketsStatus !== STATE_STATUS.FETCHED) {

    // }

    //fetch tickets commented!!!
    fetchTicketListing(1, '');
    setInitLoader(false);
  }, []);

  useEffect(() => {
    if (ticketsStatus == STATE_STATUS.FETCHED && loader && !initLoader) {
      setLoader(false);
      setActiveFilterType(filtersTypeData[0].key);
    }
  }, [ticketsStatus]);

  const fetchTicketListing = (pageNo, search) => {
    let fetchTicketListingObj = {
      page: pageNo,
      days: timeFilter,
      openOnly: typeFilter,
      search: search,
    };
    dispatch(fetchTickets(fetchTicketListingObj));
  };

  //api hit for orderWay, orderBy, appliedFilter changes
  useEffect(() => {
    if (!loader) {
      setLoader(true);
      fetchTicketListing(1, '');
    }
  }, [typeFilter, timeFilter]);

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

  const renderLoader = () => {
    return (
      <View
        style={{
          flex: 1,
          height: Dimensions.get('window').height,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 50,
        }}>
        <ActivityIndicator
          size={'large'}
          color={'red'}
          style={{alignSelf: 'center'}}
        />
      </View>
    );
  };

  const endReachedFetchListing = () => {
    if (
      ticketsStatus === STATE_STATUS.FETCHED &&
      ticketsStatus !== STATE_STATUS.FETCHING &&
      pageIndex + 1 < maxPage &&
      !loader
    ) {
      fetchTicketListing(pageIndex + 1, '');
    }
  };

  const listEmptyComponent = () => (
    <Text style={{color: '#000'}}>No Tickets Found!!</Text>
  );

  const ticketListing = () => {
    return (
      <View>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
          Search Tickets
        </Text>
        <TextInput
          placeholder="Type your question here"
          placeholderTextColor={'#A2A2A2'}
          selectionColor={'#888'}
          returnKeyType={'search'}
          value={inputValue}
          onChangeText={value => {
            setInputValue(value);
          }}
        />
        <CustomeIcon name={'search'}></CustomeIcon>
        <TouchableOpacity onPress={() => setFiltersModal(true)}>
          <Text
            style={{
              color: '#000',
              fontSize: 14,
              fontWeight: 'bold',
              marginTop: 50,
            }}>
            Filters
          </Text>
        </TouchableOpacity>
        <FlatList
          data={ticketsList}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-item`}
          onEndReachedThreshold={0.9}
          ListFooterComponent={renderFooter}
          style={{paddingBottom: 380}}
          contentContainerStyle={{paddingBottom: 380}}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          onEndReached={({distanceFromEnd}) => {
            if (!onEndReachedCalledDuringMomentum.current) {
              endReachedFetchListing();
              onEndReachedCalledDuringMomentum.current = true;
            }
          }}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          // onEndReached={() => {
          //   console.log('***********');
          //   endReachedFetchListing();
          // }}
          ListEmptyComponent={listEmptyComponent}
        />
      </View>
    );
  };

  const renderFooter = () => {
    if (ticketsStatus == STATE_STATUS.FETCHING && pageIndex > 0) {
      return (
        <View style={{padding: 100}}>
          <ActivityIndicator
            style={{alignSelf: 'center'}}
            color="rgba(217, 35, 45, 1)"
            size={'large'}
          />
        </View>
      );
    }
    return null;
  };

  const renderListing = () => {
    if (initLoader) {
      return renderLoader();
    } else if (
      loader ||
      (pageIndex == 0 &&
        [(STATE_STATUS.UNFETCHED, STATE_STATUS.FETCHING)].includes(
          ticketsStatus,
        ))
    ) {
      return renderLoader();
    }
    return ticketListing();
  };

  return (
    <View>
      {renderListing()}
      {filtersModal && (
        <FilterModal
          filtersModal={filtersModal}
          setFiltersModal={setFiltersModal}
          activeFilterType={activeFilterType}
          setActiveFilterType={setActiveFilterType}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
        />
      )}
    </View>
  );
};

export default TicketsList;
