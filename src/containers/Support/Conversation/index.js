import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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

const Conversation = props => {
  const [ticketId, setTicketId] = useState(props.route.params.tickedId || '');
  const [page, setPage] = useState(props.route.params.page || 1);
  const [days, setDays] = useState(props.route.params.days || 180);
  const [openOnly, setOpenOnly] = useState(props.route.params.openOnly || 0);
  const [search, setSearch] = useState(props.route.params.search || '');
  const [ticketConversation, setTicketConversation] = useState({});
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    getTicketConversation();
  }, []);

  const conversations = [
    {
      id: 36228073703,
      ticket_id: 216591,
      body: '<div>debit note creted</div>',
      body_text: 'debit note creted',
      user_id: 36008129900,
      attachments: [
        {
          name: 'Screenshot from 2021-09-21 16-39-15.png',
          content_type: 'image/png',
          size: 160535,
          attachment_url:
            'https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/36116529703/original/Screenshot%20from%202021-09-21%2016-39-15.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20220301%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220301T164435Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=e0d7f8aaf40cfb847682de19987e58d146420e05ba7581af39a720e084c50e0d',
        },
      ],
      created_at: '2022-02-12T09:32:48Z',
      updated_at: '2022-02-12T09:32:48Z',
      response: false,
      private: false,
    },
    {
      id: 36231446890,
      ticket_id: 216591,
      body: '<div>Testing purpose</div>',
      body_text: 'Testing purpose',
      user_id: 36008129900,
      attachments: [
        {
          name: '20210810_222227.jpg',
          content_type: 'image/jpeg',
          size: 18136,
          attachment_url:
            'https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/36118064826/original/20210810_222227.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20220301%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220301T164435Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=7485405e4396dfe2d67e988be042f880aeb7c36dfba72b1282dd02e970f6a8a9',
        },
      ],
      created_at: '2022-03-01T11:21:56Z',
      updated_at: '2022-03-01T11:21:56Z',
      response: false,
      private: false,
    },
    {
      id: 36231446890,
      ticket_id: 216591,
      body: '<div>Testing purpose</div>',
      body_text: 'Testing purpose',
      user_id: 36008129900,
      attachments: [],
      created_at: '2022-03-01T11:21:56Z',
      updated_at: '2022-03-01T11:21:56Z',
      response: true,
      private: false,
    },
  ];

  const onReply = async () => {
    let token = `Bearer ${await AsyncStorage.getItem('token')}`;
    const url = `${BASE_URL}api/ticket/reply`;
    console.log([
      {
        name: 'ticketNumber',
        data: ticketId,
      },
      {
        name: 'userId',
        data: ticketConversation.ticket.requester.id,
      },
      {
        name: 'body',
        data: body,
      },
    ]);
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
      getTicketConversation();
    }
  };

  const getTicketConversation = async () => {
    try {
      let supplierId = await AsyncStorage.getItem('userId');
      let payload = {
        ticketNumber: ticketId,
        supplierId: supplierId,
      };
      const {data} = await getConversation(payload);
      setTicketConversation(data.data);
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
    let mutatedate =
      createddate && createddate.split('T') && createddate.split('T')[0];
    let createdtime =
      createddate && createddate.split('T') && createddate.split('T')[1];
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
    console.log(modifiedtime);
    let adjustedtime = `${modifiedtime[0]}${modifiedtime[1]}${modifiedtime[2]}${modifiedtime[5]}`;

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

  const renderListHeader = () => {
    return ticketConversation && ticketConversation.ticket ? (
      <View style={{backgroundColor: 'blue'}}>
        <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold'}}>
          {(ticketConversation &&
            ticketConversation.ticket &&
            ticketConversation.ticket.subject) ||
            ''}
        </Text>
        {ticketConversation &&
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
        ) : null}

        <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold'}}>
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
    console.log('attachment', attachment);
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
        console.log('res -> ', JSON.stringify(res));
        // Toast.show({
        //   type: 'success',
        //   text2: 'Invoice Downloaded',
        //   visibilityTime: 2000,
        //   autoHide: true,
        // });
      })
      .catch(err => {
        console.log(err, 'error hai');
      });
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          item && item.response
            ? styles.systemchatmargin
            : styles.userchatmargin,
        ]}>
        <View
          style={[item && item.response ? styles.systemchat : styles.userchat]}>
          <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
            {item.body_text}
          </Text>
          {item && item.attachments && item.attachments.length ? (
            <TouchableOpacity
              style={{
                width: 90,
                height: 50,
                backgroundColor: 'red',
              }}
              onPress={() => downloadFile(item && item.attachments[0])}>
              <Text style={{color: '#fff', fontSize: 12, fontWeight: '300'}}>
                {item.attachments &&
                  item.attachments[0] &&
                  item.attachments[0].name}
              </Text>
              <Text style={{color: '#fff', fontSize: 12, fontWeight: '300'}}>
                {getFileSize(
                  item.attachments &&
                    item.attachments[0] &&
                    item.attachments[0].size,
                )}
                MB
              </Text>
              <Text style={{color: '#000'}}>download</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <Text style={{color: '#000', fontSize: 12, fontWeight: 'bold'}}>
          {getCreatedDate(item && item.created_at)}
        </Text>
      </View>
    );
  };

  const listEmptyComponent = () => (
    <TouchableOpacity onPress={() => props.navigation.navigate('NewTicket')}>
      <Text style={{color: '#000', fontSize: 12, fontWeight: 'bold'}}>
        Raise new Ticket
      </Text>
    </TouchableOpacity>
  );

  //render conversation
  const renderConversation = () => {
    return (
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}-item`}
        ListHeaderComponent={renderListHeader()}
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
        <TouchableOpacity onPress={() => closeOpenedTicket()}>
          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#000'}}>
            CLOSE TICKET
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => reopenTicket()}>
          <Text style={{fontSize: 12, fontWeight: '500', color: '#000'}}>
            CLICK REOPEN TICKET
          </Text>
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
      <View>
        <Header
          showBack
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
        {renderOpenCloseTicket()}
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
            disabled={!body}
            onPress={onReply}
            style={{margin: 4, padding: 8, backgroundColor: Colors.BrandColor}}>
            <Icon
              name={'chevron-right'}
              size={20}
              style={{color: '#fff', alignSelf: 'center'}}
              color={'#fff'}
            />
          </TouchableOpacity>
        </View>
        {renderConversation()}
      </View>
    );
  } else {
    return renderLoader();
  }
};

export default Conversation;
