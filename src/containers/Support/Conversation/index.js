import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getConversation, closeTicket, reOpen} from '../../../services/support';
import Header from '../../../component/common/Header';
import styles from './style';
import Colors from '../../../Theme/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BASE_URL} from '../../../redux/constants';
import RNFetchBlob from 'rn-fetch-blob';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTickets} from '../../../redux/actions/support';
import Dimension from '../../../Theme/Dimension';
import CustomeIcon from '../../../component/common/CustomeIcon';
import Toast from 'react-native-toast-message';

const Conversation = props => {
  const flatlistRef = useRef();
  const [ticketId, setTicketId] = useState(props.route.params.tickedId || '');
  const [page, setPage] = useState(props.route.params.page || 1);
  const [days, setDays] = useState(props.route.params.days || 180);
  const [openOnly, setOpenOnly] = useState(props.route.params.openOnly || 0);
  const [search, setSearch] = useState(props.route.params.search || '');
  const [ticketConversation, setTicketConversation] = useState({});
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    getTicketConversation();
  }, []);

  const onReply = async () => {
    setLoading(true);
    let token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const url = `${BASE_URL}api/ticket/reply`;
    const response = await RNFetchBlob.fetch(
      'POST',
      url,
      {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
      [
        {
          name: 'ticketNumber',
          data: String(ticketId),
        },
        {
          name: 'userId',
          data: String(ticketConversation.ticket.requester.id),
        },
        {
          name: 'body',
          data: String(body),
        },
      ],
    );

    const res = await response.json();
    // console.log(res);
    if (res.success) {
      setBody('');
      getTicketConversation();
    }
    setLoading(false);
  };

  const getTicketConversation = async () => {
    try {
      let supplierId = await AsyncStorage.getItem('userId');
      let payload = {
        ticketNumber: ticketId,
        supplierId: supplierId,
      };
      const {data} = await getConversation(payload);
      setTicketConversation({
        ...data.data,
        conversation: [
          {
            body_text: data.data.ticket.description_text,
            attachments: data.data.ticket.attachments,
            response: true,
            ticket_id: data.data.ticket.id,
            created_at: data.data.ticket.created_at,
            updated_at: data.data.ticket.updated_at,
          },
          ...data.data.conversation,
        ],
      });
      flatlistRef.current.scrollToEnd({animating: true});
    } catch (error) {
      console.log(error);
    }
  };

  //modify date
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

  const getCreatedDate = createddate => {
    let updatedDate = new Date(
      new Date(createddate).getTime() + (5 * 60 + 30) * 60000,
    ).toISOString();
    let mutatedate =
      updatedDate && updatedDate.split('T') && updatedDate.split('T')[0];
    let createdtime =
      updatedDate && updatedDate.split('T') && updatedDate.split('T')[1];
    let modifieddate = mutatedate.split('-').reverse().join('/');

    let mutatetime = '';
    [...createdtime].forEach(_ => {
      if (_ != 'Z') {
        mutatetime = mutatetime + _;
      }
    });

    // Check correct time format and split into components
    let modifiedtime = mutatetime
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [mutatetime];

    if (modifiedtime.length > 1) {
      modifiedtime = modifiedtime.slice(1);
      modifiedtime[5] = +modifiedtime[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      modifiedtime[0] = +modifiedtime[0] % 12 || 12;
    }
    modifiedtime = [
      modifiedtime[0]
        .split('.')
        .map((_, k) => {
          return k == 1 ? '' : _;
        })
        .join(''),
    ];
    let adjustedtime = `${modifiedtime[0]}`;

    return `${modifieddate}, ${adjustedtime}`;
  };

  //activityIndicator
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

  //file size calculation

  const getFileSize = size => {
    let mbsize = size / 1000000;
    return mbsize.toFixed(2);
  };
  const renderListHeader1 = () => {
    return (
      <View style={styles.headerListWrap}>
        {renderListHeader()}
        {renderOpenCloseTicket()}
      </View>
    );
  };
  const renderListHeader = () => {
    return ticketConversation && ticketConversation.ticket ? (
      <View style={styles.headerListInnerWrap}>
        <Text style={styles.HeaderTicketTxt}>
          {(ticketConversation &&
            ticketConversation.ticket &&
            ticketConversation.ticket.subject) ||
            ''}
        </Text>
        {/* {ticketConversation &&
        ticketConversation.ticket &&
        ticketConversation.ticket.attachments &&
        ticketConversation.ticket.attachments.length ? (
          <TouchableOpacity
            style={{backgroundColor: 'red'}}
            onPress={() =>
              downloadFile(
                ticketConversation &&
                  ticketConversation.ticket &&
                  ticketConversation.ticket.attachments &&
                  ticketConversation.ticket.attachments[0],
              )
            }>
            <Text style={{color: '#fff', fontSize: 12, fontWeight: '300'}}>
              {getFileSize(
                ticketConversation &&
                  ticketConversation.ticket &&
                  ticketConversation.ticket.attachments &&
                  ticketConversation.ticket.attachments[0].size,
              )}
              MB
            </Text>
            <Text style={{color: '#000'}}>download</Text>
          </TouchableOpacity>
        ) : null} */}

        <Text style={styles.HeaderTicketDate}>
          {getDate(
            (ticketConversation &&
              ticketConversation.ticket &&
              ticketConversation.ticket.created_at) ||
              '',
          )}
        </Text>
      </View>
    ) : null;
  };

  const downloadFile = attachment => {
    const {attachment_url, content_type, name, size} = attachment;
    const {config, fs} = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;
    // return config({
    //   // add this option that makes response data to be stored as a file,
    //   // this is much more performant.
    //   fileCache: true,
    //   addAndroidDownloads: {
    //     useDownloadManager: true,
    //     notification: true,
    //     description: 'Downloading file',
    //     path: downloads + '/' + name + '.pdf',
    //   },
    // })
    //   .fetch('GET', attachment_url)
    //   .then(res => {
    //     console.log('res hai dost', res);
    //   })
    //   .catch(e => {
    //     console.log('err hai dost', e);
    //   });

    let options = {
      fileCache: true,
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        description: 'Downloading file',
        path: downloads + '/' + name,
      },
    };
    config(options)
      .fetch('GET', attachment_url)
      .then(res => {
        //Showing alert after successful downloading
        alert(JSON.stringify(res));
        // Toast.show({
        //   type: 'success',
        //   text2: 'Invoice Downloaded',
        //   visibilityTime: 2000,
        //   autoHide: true,
        // });
      })
      .catch(err => {
        console.log(err, 'error');
      });
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          item && item.response ? styles.systemChatWrap : styles.userchatmWrap,
        ]}>
        <View
          style={[item && item.response ? styles.systemchat : styles.userchat]}>
          <Text
            style={[
              item && item.response ? styles.systemchatTxt : styles.userchatTxt,
            ]}>
            {item.body_text}
          </Text>
          {item && item.attachments && item.attachments.length ? (
            <TouchableOpacity
              style={styles.DocDownWrapBtn}
              onPress={() => downloadFile(item && item.attachments[0])}>
              <View style={{flex: 1}}>
                <Text style={styles.DocName} numberOfLines={1}>
                  {item.attachments &&
                    item.attachments[0] &&
                    item.attachments[0].name}
                </Text>
                <Text style={styles.DocName}>
                  {getFileSize(
                    item.attachments &&
                      item.attachments[0] &&
                      item.attachments[0].size,
                  )}
                  MB
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <CustomeIcon
                  name={'download'}
                  color={Colors.BrandColor}
                  size={Dimension.font16}></CustomeIcon>
                <Text style={styles.DownloadTxt}>Download</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
        <Text
          style={[
            item && item.response ? styles.systemchatDate : styles.userchatDate,
          ]}>
          {getCreatedDate(item && item.created_at)}
        </Text>
      </View>
    );
  };

  const listEmptyComponent = () => (
    <>
      {/* <View
        style={{
          paddingHorizontal: Dimension.padding10,
          backgroundColor: Colors.grayShade3,
        }}>
        <Text style={styles.SearchTicketTxt}>Search Tickets</Text>
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="Type your question here"
            placeholderTextColor={'#A2A2A2'}
            selectionColor={'#888'}
            returnKeyType={'search'}
            // value={inputValue}
            //onChangeText={onSearchText}
            style={styles.SearchInputCss}
          />
          <CustomeIcon name={'search'} style={styles.seacrhIcon}></CustomeIcon>
        </View>
        <Text style={styles.ticketTxt}>Tickets</Text>
      </View> */}
      {/* <View style={styles.EmptyChatWrap}>
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
            color={Colors.WhiteColor}
            size={Dimension.font20}></CustomeIcon>
          <Text style={styles.NewTicktbtnTxt}>Raise new Ticket</Text>
        </TouchableOpacity>
      </View> */}
    </>
  );

  //render conversation
  const renderConversation = () => {
    return (
      <FlatList
        ref={flatlistRef}
        data={ticketConversation.conversation || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}-item`}
        // ListHeaderComponent={renderListHeader1}
        ListEmptyComponent={listEmptyComponent}
      />
    );
  };

  const closeOpenedTicket = async () => {
    try {
      setTicketConversation({});
      const {data} = await closeTicket(ticketId);
      if (data && data.success) {
        getTicketConversation();
        fetchTicketListing();
        Toast.show({
          type: 'success',
          text2: 'Ticket closed successfully',
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const reopenTicket = async () => {
    try {
      setTicketConversation({});
      const {data} = await reOpen(ticketId);
      if (data && data.success) {
        getTicketConversation();
        fetchTicketListing();
        Toast.show({
          type: 'success',
          text2: 'Ticket reopened successfully',
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderOpenCloseTicket = () => {
    if (
      ticketConversation &&
      ticketConversation.ticket &&
      ticketConversation.ticket.statusText == 'Open'
    ) {
      return (
        <TouchableOpacity
          onPress={() => closeOpenedTicket()}
          style={styles.ticketStatusBtn}>
          <Text style={styles.ticketstatusTxt}>CLICK TO CLOSE THE TICKET</Text>
          <CustomeIcon
            name={'arrow-forward'}
            color={Colors.FontColor}
            size={Dimension.font20}></CustomeIcon>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => reopenTicket()}
          style={styles.ticketStatusBtn}>
          <Text style={styles.ticketstatusTxt}>CLICK TO REOPEN THE TICKET</Text>
          <CustomeIcon
            name={'arrow-forward'}
            color={Colors.FontColor}
            size={Dimension.font20}></CustomeIcon>
        </TouchableOpacity>
      );
    }
  };

  const fetchTicketListing = () => {
    let fetchTicketListingObj = {
      page: page,
      days: days,
      openOnly: openOnly,
      search: search,
    };
    dispatch(fetchTickets(fetchTicketListingObj));
  };

  if (ticketConversation && ticketConversation.ticket) {
    return (
      <View style={styles.ContainerCss}>
        <Header
          showBack
          showBell
          navigation={props.navigation}
          showText={
            ticketConversation && ticketConversation.ticket
              ? `${
                  (ticketConversation &&
                    ticketConversation.ticket &&
                    ticketConversation.ticket.statusText) ||
                  ''
                }  #${
                  (ticketConversation &&
                    ticketConversation.ticket &&
                    ticketConversation.ticket.id) ||
                  ''
                }`
              : ''
          }
        />
        <View style={styles.headerListWrap}>
          {renderListHeader()}
          {renderOpenCloseTicket()}
        </View>
        {renderConversation()}

        {ticketConversation &&
        ticketConversation.ticket &&
        ticketConversation.ticket.statusText == 'Open' ? (
          <View style={styles.InputWrap}>
            <TextInput
              placeholder="Type message"
              placeholderTextColor={'#78849E'}
              value={body}
              onChangeText={text => setBody(text)}
              style={styles.InputCss}
            />
            <TouchableOpacity
              disabled={!body || loading}
              onPress={onReply}
              style={styles.SendBtn}>
              {loading ? (
                <ActivityIndicator size={'small'} color={Colors.WhiteColor} />
              ) : (
                <Image
                  source={require('../../../assets/images/Send.png')}
                  style={{height: Dimension.width22, width: Dimension.width22}}
                />
              )}
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  } else {
    return renderLoader();
  }
};

export default Conversation;
