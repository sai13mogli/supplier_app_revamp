import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import styles from './style';
import {searchFaqs} from '../../../services/support';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import CustomeIcon from '../../../component/common/CustomeIcon';

const FAQS = props => {
  const [search, setSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState('Catalog Related');
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  const TABS = [
    {
      title: 'Catalog Related',
      key: 'Catalog Related',
    },
    {
      title: 'Order Related',
      key: 'Order Related',
    },
    {
      title: 'Account Related',
      key: 'Account Related',
    },
    {
      title: 'Payment Related',
      key: 'Payment Related',
    },
  ];

  useEffect(() => {
    getFaqsData();
  }, []);

  useEffect(() => {
    getFaqsData();
  }, [selectedTab]);

  const getFaqsData = async () => {
    setLoader(true);
    const {data} = await searchFaqs(selectedTab, search);
    if (data.data) {
      setData(data.data);
    }
    setLoader(false);
  };

  const renderItem = ({item, index}) => {
    let text = item.answer;
    text = text
      .split('<ul>')
      .join('')
      .split('</li>')
      .join('')
      .split('</ul>')
      .join('')
      .split('<li>');
    const regex = /(<([^>]+)>)/gi;
    return (
      <View style={styles.questionContainer}>
        <Text style={{color: '#000'}}>{item.question}</Text>
        {text.map((li, liI) =>
          liI == 0 ? null : (
            <View style={styles.liContainer} key={liI}>
              <View style={styles.liDot} />
              <Text>{li.replace(regex, '')}</Text>
            </View>
          ),
        )}
      </View>
    );
  };

  const onChangeText = val => {
    setSearch(val);
  };

  return (
    <View style={styles.container}>
      <Text style={{color: '#000'}}>Have a Questiion ?</Text>
      <View style={styles.searchWrapper}>
        <TextInput
          placeholderTextColor={Colors.eyeIcon}
          onChangeText={onChangeText}
          value={search}
          // blurOnSubmit={blurOnSubmit}
          placeholder={'Type your question here'}
          style={styles.SearchInputCss}
          onSubmitEditing={getFaqsData}
        />
        <CustomeIcon
          onPress={getFaqsData}
          name={'search'}
          style={styles.seacrhIcon}></CustomeIcon>
      </View>
      <Text style={{color: '#000'}}>Topics</Text>
      <ScrollView horizontal={true}>
        <View style={styles.tabContainer}>
          {TABS.map((tab, tabIndex) => (
            <TouchableOpacity
              style={
                tab.key == selectedTab ? styles.activeTab : styles.inactiveTab
              }
              onPress={() => setSelectedTab(tab.key)}
              key={tabIndex}>
              <Text
                style={
                  tab.key == selectedTab
                    ? styles.activeTabText
                    : styles.inactiveTabText
                }>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {loader ? (
        <ActivityIndicator
          style={{alignSelf: 'center', padding: 12}}
          color={Colors.BrandColor}
        />
      ) : (
        <FlatList
          renderItem={renderItem}
          data={data}
          contentContainerStyle={{marginVertical: Dimension.margin4}}
          ListEmptyComponent={
            <Text style={{alignSelf: 'center', padding: 12}}>
              No FAQ's found
            </Text>
          }
          keyExtractor={(item, index) => `${index}-item`}
        />
      )}
    </View>
  );
};

export default FAQS;
