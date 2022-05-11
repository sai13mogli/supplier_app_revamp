import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
  Image,
} from 'react-native';
import styles from './style';
import {searchFaqs} from '../../../services/support';
import Colors from '../../../Theme/Colors';
import Dimension from '../../../Theme/Dimension';
import CustomeIcon from '../../../component/common/CustomeIcon';
import RenderHtml, {defaultSystemFonts}  from 'react-native-render-html';
//import ULElement from 'react-native-render-html/lib/typescript/elements/ULElement';
const systemFonts = [...defaultSystemFonts, 'Poppins-Regular']

const FAQS = props => {
  const [search, setSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState('Popular Queries');
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  const TABS = [
    {
      title: 'Popular Queries',
      key: 'Popular Queries',
    },
    {
      title: 'Account Related',
      key: 'Account Related',
    },
    {
      title: 'Product/Catalog Listing Related',
      key: 'Product/Catalog Listing Related',
    },
    {
      title: 'Order Related',
      key: 'Order related',
    },
    {
      title: 'Payment Related',
      key: 'Payment related',
    },
    {
      title: 'Fees & Penalty Related',
      key: 'Fees & Penalty related',
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
    console.log(item);
    let text = item.answer;
    const source = {
      html: item.answer
    };
    const mixedStyles = {
      whiteSpace: 'normal',
      color: Colors.FontColor,
      fontSize:Dimension.font12,
      fontFamily:Dimension.CustomRegularFont,
      
    }
    const mixedStyles1={
      paddingLeft:0,
      marginLeft:0,
      backgroundColor:"#000"
    }
  //  text = text.split('</p>').join('').split('<p>');
  //  const regex = /(<([^>]+)>)/gi;
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionTxt}>{item.question}</Text>
        <RenderHtml
            //contentWidth={'300'}
            source={source}
            baseStyle ={mixedStyles}
            systemFonts={systemFonts}
            
            
          />
        {/* {text.map((li, liI) =>
          liI == 0 ? null : (
            // <View style={styles.liContainer} key={liI}>
            //   <View style={styles.liDot} />
            //   <Text style={styles.ansTxt}>{li.replace(regex, '')}</Text>
            // </View>
            <RenderHtml
            //contentWidth={width}
            source={li}
          />
          ),
        )} */}
      </View>
    );
  };

  const onChangeText = val => {
    setSearch(val);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headingTxt}>Have A Question ?</Text>
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
        <Text style={styles.headingTxt}>Topics</Text>
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
      </View>
      {loader ? (
        <ActivityIndicator
          style={{alignSelf: 'center', padding: 12}}
          color={Colors.BrandColor}
        />
      ) : (
        <FlatList
          renderItem={renderItem}
          data={data}
          contentContainerStyle={{paddingBottom: 280}}
          style={{marginHorizontal: Dimension.margin10}}
          ListEmptyComponent={
            <View style={styles.EmptyChatWrap}>
              <Image
                source={require('../../../assets/images/EmptyChat.png')}
                style={{height: Dimension.height250, width: Dimension.width150}}
              />
              <Text style={styles.EmptyBoldTxt}>No FAQ's found</Text>
            </View>
          }
          keyExtractor={(item, index) => `${index}-item`}
        />
      )}
    </>
  );
};

export default FAQS;
