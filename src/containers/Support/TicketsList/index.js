import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
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
import styles from '../style';
import debounce from 'lodash.debounce';
import Dimension from '../../../Theme/Dimension';
import colors from '../../../Theme/Colors';

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
  const [timeFilter, setTimeFilter] = useState(180);
  const [inputValue, setInputValue] = useState('');
  const [fromReset, setFromReset] = useState(false);
  const dispatch = useDispatch();
  const onEndReachedCalledDuringMomentum = useRef(true);

  useEffect(() => {
    // if (ticketsStatus != STATE_STATUS.FETCHED) {
    //   fetchTicketListing(1, '');
    //   // dispatch(fetchTickets(1, 0, 0, ''));
    // }

    //fetch tickets commented!!!
    setInitLoader(false);
    if (ticketsStatus !== STATE_STATUS.FETCHED) {
      fetchTicketListing(1, '');
    }
  }, []);
  // && !initLoader

  useEffect(() => {
    if (ticketsStatus == STATE_STATUS.FETCHED && loader) {
      setLoader(false);
      setActiveFilterType(filtersTypeData[0].key);
    }
  }, [ticketsStatus]);

  const fetchTicketListing = (pageNo, search, fromReset) => {
    let fetchTicketListingObj = {
      page: pageNo,
      days: !fromReset ? timeFilter : 180,
      openOnly: !fromReset ? typeFilter : 0,
      search: search,
    };
    dispatch(fetchTickets(fetchTicketListingObj));
  };

  //api hit for orderWay, orderBy, appliedFilter changes
  const applyFilters = () => {
    if (!loader) {
      setLoader(true);
      setFiltersModal(false);
      fetchTicketListing(1, '');
    }
  };

  const resetFilters = () => {
    if (!loader) {
      setLoader(true);
      setFiltersModal(false);
      fetchTicketListing(1, '', true);
    }
  };

  const debouncedSave = useRef(
    debounce(text => {
      fetchTicketListing(1, text);
    }, 800),
  ).current;

  const onSearchText = text => {
    setInputValue(text);
    debouncedSave(text);
  };

  const getDate = date => {
    let mutatedate = date && date.split('T') && date.split('T')[0];
    let modifieddate = new Date(mutatedate);
    let months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return `${
      months[modifieddate.getMonth()]
    } ${modifieddate.getDate()}, ${modifieddate.getFullYear()} `;
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Conversation', {
            tickedId: item.id,
            page: 1,
            days: timeFilter,
            openOnly: typeFilter,
            search: '',
          })
        }
        style={styles.TicketOuterWrap}>
        <View style={styles.TicketTopWrap}>
          <Text
            style={[
              styles.ticketStatus,
              {
                color:
                  item.statusText == 'Open'
                    ? colors.BrandColor
                    : colors.blackColor,
              },
            ]}>
            {item.statusText}
          </Text>
          <Text style={styles.ticketIdTxt}>Ticket ID: {item.id}</Text>
          {item.type ?
          <View style={styles.TicketTypeWrap}>
            <Text style={styles.tickettypetxt}>{item.type}</Text>
          </View>
          :null}
        </View>
        <View style={styles.ticketBottomWrap}>
          <Text style={styles.ticketSubTxt}>{item.subject}</Text>
          <Text style={styles.TicketDate}>{getDate(item.created_at)}</Text>
        </View>
      </TouchableOpacity>
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

  const listEmptyComponent = () => {
    if (ticketsStatus == STATE_STATUS.FETCHED) {
      return (
        <View style={styles.EmptyChatWrap}>
          <Image
            source={require('../../../assets/images/EmptyChat.png')}
            style={{height: Dimension.height250, width: Dimension.width150}}
          />
          <Text style={styles.EmptyBoldTxt}>
            Voila! You Have Not Raised Any Query Yet
          </Text>
          <Text style={styles.EmptyLightTxt}>
            Click on below button as soon as you face any problem
          </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('NewTicket')}
            style={styles.NewTicktbtn}>
            <CustomeIcon
              name={'add-circle'}
              color={colors.WhiteColor}
              size={Dimension.font20}></CustomeIcon>
            <Text style={styles.NewTicktbtnTxt}>Raise new Ticket</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const ticketListing = () => {
    return (
      <View>
        <Text style={styles.SearchTicketTxt}>Search Tickets</Text>
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="Search by ticket number"
            placeholderTextColor={'#A2A2A2'}
            selectionColor={'#888'}
            returnKeyType={'search'}
            value={inputValue}
            onChangeText={onSearchText}
            style={styles.SearchInputCss}
          />
          <CustomeIcon name={'search'} style={styles.seacrhIcon}></CustomeIcon>
        </View>
        <View style={styles.filterRowWrap}>
          <Text style={styles.ticketTxt}>Tickets</Text>
          <TouchableOpacity
            onPress={() => setFiltersModal(true)}
            style={styles.filterBtn}>
            <CustomeIcon
              name={'filter-fill'}
              size={Dimension.font20}
              color={colors.FontColor}></CustomeIcon>
            <Text style={styles.filterTxt}>Filters</Text>
          </TouchableOpacity>
        </View>

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
    <View style={styles.ticketListContainer}>
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
          applyFilters={applyFilters}
          resetFilters={resetFilters}
          fromReset={fromReset}
          setFromReset={setFromReset}
        />
      )}
    </View>
  );
};

export default TicketsList;
