import React, {
  useState,
  useRef,
  forwardRef,
  useEffect,
  createRef,
  useCallback,
} from 'react';
import {
  View,
  findNodeHandle,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';

const { width, height } = Dimensions.get('window');

const Tabs = props => {
  const [activetab, setActiveTab] = useState(props.data[0].key);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef();

  useEffect(() => {
    if (props.route && props.route.params && props.route.params.parentTab) {
      if (props.route.params.parentTab == 'faqs') {
      } else if (props.route.params.parentTab == 'supportTicket') {
        onItemPress(1);
      }
    }
  }, []);

  // const Indicator = ({measures, scrollX}) => {
  //   const inputRange = (props.data || []).map((_, i) => i * width);

  //   const indicatorWidth = scrollX.interpolate({
  //     inputRange,
  //     outputRange: measures.map(measure => measure.width),
  //   });

  //   console.log('inputRange', inputRange, indicatorWidth);
  //   const translateX = scrollX.interpolate({
  //     inputRange,
  //     outputRange: measures.map(measure => measure.x),
  //   });

  //   const scaleX = scrollX.interpolate({
  //     inputRange,
  //     outputRange: measures.map((item, i) =>
  //       i > 0 ? item.width / measures[0].width : 1,
  //     ),
  //   });

  //   const translateX = scrollX.interpolate({
  //     inputRange,
  //     outputRange: measures.map(
  //       (item, i) => item.x + item.width / 2 - measures[0].width / 2,
  //     ),
  //   });

  //   return (
  //     <Animated.View
  //       style={{
  //         position: 'absolute',
  //         height: 4,
  //         width: indicatorWidth,
  //         left: 0,
  //         backgroundColor: 'red',
  //         bottom: -10,
  //         transform: [
  //           {
  //             translateX,
  //           },
  //         ],
  //       }}></Animated.View>
  //   );
  // };

  const OneTab = forwardRef(({ item, onItemPress }, ref) => {
    return (
      <TouchableOpacity
        onPress={onItemPress}
        style={activetab == item.key ? styles.activeTab : styles.inActiveTab}>
        <View ref={ref}>
          <Text
            style={
              activetab == item.key
                ? styles.activeTabText
                : styles.inActiveTabText
            }>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });

  const CustomTabs = ({ data, scrollX, onItemPress }) => {
    // const [measures, setMeasures] = useState([]);
    const containerRef = useRef();
    // useEffect(() => {
    //   let m = [];
    //   data.forEach(item => {
    //     item.ref?.current?.measureLayout(
    //       containerRef.current,
    //       (x, y, width, height) => {
    //         m.push({
    //           x,
    //           y,
    //           width,
    //           height,
    //           key: item.key,
    //         });
    //         if (m.length === data.length) {
    //           setMeasures(m);
    //         }
    //       },
    //     );
    //   });
    // }, []);

    // console.log('measures hai dost', measures);

    return (
      <View
        style={{
          position: 'absolute',
          top: -5,
          width,
        }}>
        <View
          ref={containerRef}
          style={{
            justifyContent: 'space-evenly',
            flex: 1,
            flexDirection: 'row',
            borderBottomColor: colors.placeholderColor,
            borderBottomWidth: 1,
          }}>
          {data.map((item, index) => {
            return (
              <OneTab
                key={item.key}
                item={item}
                ref={item.ref}
                onItemPress={() => onItemPress(index)}
              />
            );
          })}
        </View>
        {/* {measures.length > 0 && (
          <Indicator measures={measures} scrollX={scrollX} />
        )} */}
      </View>
    );
  };

  const onItemPress = useCallback(itemIndex => {
    flatListRef?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
  });

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    setActiveTab(viewableItems[0].key);
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={props.data}
        scrollEnabled={!props.hideScroll}
        keyExtractor={item => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        bounces={false}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <item.component
                onItemPress={onItemPress}
                {...item}
                navigation={props.navigation}
              />
            </View>
          );
        }}
      />
      <CustomTabs
        scrollX={scrollX}
        data={props.data}
        onItemPress={onItemPress}
      />
    </View>
    // <>
    //   <View style={styles.tabContainer}>
    //     {props.data.map((tab, takIndex) => (
    //       <TouchableOpacity
    //         key={takIndex}
    //         onPress={() => setActiveTab(tab.key)}
    //         style={
    //           activetab == tab.key ? styles.activeTab : styles.inActiveTab
    //         }>
    //         <Text
    //           style={
    //             activetab == tab.key
    //               ? styles.activeTabText
    //               : styles.inActiveTabText
    //           }>
    //           {tab.name}
    //         </Text>
    //       </TouchableOpacity>
    //     ))}
    //   </View>
    //   {props.data
    //     .filter(_ => _.key == activetab)
    //     .map(_ => (
    //       <_.component {..._} />
    //     ))}
    // </>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.placeholderColor,
    borderBottomWidth: 1,
  },

  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    // borderRadius: 16,
    backgroundColor: '#fff',
    width: '100%',
  },
  activeTab: {
    backgroundColor: '#fff',
    // paddingVertical: 12,
    width: '50%',
    borderBottomColor: colors.BrandColor,
    borderBottomWidth: 3,
  },
  inActiveTab: {
    backgroundColor: '#fff',
    borderBottomColor: colors.WhiteColor,
    borderBottomWidth: 3,
    width: '50%',
    // paddingVertical: 12,
  },
  activeTabText: {
    alignSelf: 'center',
    color: colors.BrandColor,
    fontFamily: Dimension.CustomRegularFont,
    fontSize: Dimension.font14,
  },
  inActiveTabText: {
    alignSelf: 'center',
    color: colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    fontSize: Dimension.font14,
  },
});
