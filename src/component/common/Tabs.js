import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import colors from "../../Theme/Colors";
import Dimension from "../../Theme/Dimension";

const Tabs = props => {
  const [activetab, setActiveTab] = useState(props.data[0].key);

  return (
    <>
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
    </>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
   // borderRadius: 16,
    backgroundColor: '#fff',
    width:"100%"

  },
  activeTab: {
   backgroundColor: '#fff',
   //paddingVertical: 12,
    width:"50%",
    borderBottomColor:colors.BrandColor,
   borderBottomWidth:3
  },
  inActiveTab: {
    
    backgroundColor: '#fff',
    borderBottomColor:colors.WhiteColor,
   borderBottomWidth:3,
    width:"50%"
  },
  activeTabText: {
    alignSelf: 'center',
    color: colors.FontColor,
    fontFamily:Dimension.CustomRegularFont,
    fontSize:Dimension.font14
  },
  inActiveTabText: {
    alignSelf: 'center',
    color: colors.FontColor,
    fontFamily:Dimension.CustomRegularFont,
    fontSize:Dimension.font14
  },
});
