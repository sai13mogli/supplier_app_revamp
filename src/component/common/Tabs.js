import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

const Tabs = props => {
  const [activetab, setActiveTab] = useState(props.data[0].key);

  return (
    <View style={{flex: 1, paddingTop: 100}}>
      <View style={styles.tabContainer}>
        {props.data.map((tab, takIndex) => (
          <TouchableOpacity
            key={takIndex}
            onPress={() => setActiveTab(tab.key)}
            style={
              activetab == tab.key ? styles.activeTab : styles.inActiveTab
            }>
            <Text
              style={
                activetab == tab.key
                  ? styles.activeTabText
                  : styles.inActiveTabText
              }>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {props.data
        .filter(_ => _.key == activetab)
        .map(_ => (
          <_.component {..._} />
        ))}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#EAF2FF',
  },
  activeTab: {
    borderRadius: 8,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  inActiveTab: {
    borderRadius: 8,
    backgroundColor: '#EAF2FF',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  activeTabText: {
    alignSelf: 'center',
    color: '#fff',
  },
  inActiveTabText: {
    alignSelf: 'center',
    color: '#000',
  },
});
