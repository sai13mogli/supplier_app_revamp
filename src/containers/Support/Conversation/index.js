import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getConversation} from '../../../services/support';
import Header from '../../../component/common/Header';
import styles from './style';
import RNFetchBlob from 'rn-fetch-blob';

const Conversation = props => {
  const [ticketId, setTicketId] = useState(props.route.params.tickedId || '');
  const [ticketConversation, setTicketConversation] = useState({});

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
        <TouchableOpacity>
          <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold'}}>
            {(ticketConversation &&
              ticketConversation.ticket &&
              ticketConversation.ticket.subject) ||
              ''}
          </Text>
          <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold'}}>
            {getDate(
              (ticketConversation &&
                ticketConversation.ticket &&
                ticketConversation.ticket.created_at) ||
                '',
            )}
          </Text>
        </TouchableOpacity>
      </View>
    ) : null;
  };

  const downloadFile = attachment => {
    const {attachment_url, content_type, name, size} = attachment;
    const {config, fs} = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir;
    return config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        description: 'Downloading file',
        path: downloads + '/' + name + '.pdf',
      },
    }).fetch('GET', attachment_url);
  };

  const renderItem = ({item, index}) => {
    return (
      <>
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
      </>
    );
  };

  //render conversation
  const renderConversation = () => {
    return (
      <FlatList
        data={ticketConversation && ticketConversation.conversation}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}-item`}
        ListHeaderComponent={renderListHeader()}
      />
    );
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

        {renderConversation()}
      </View>
    );
  } else {
    return renderLoader();
  }
};

export default Conversation;
