import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../generic/navigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dimension from '../Theme/Dimension';
import colors from '../Theme/Colors';
import CustomeIcon from '../component/common/CustomeIcon';
import {
  APP_STACK_SCREENS,
  AUTH_STACK_SCREENS,
  BOTTOM_TAB_SCREENS,
} from '../constants/index';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../generic/index';
//import {toastConfig} from '../generic/navigator';

const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const horizontalAnimation = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const navOptionHandler = () => ({
  headerShown: false,
  tabBarShowLabel: false,
  ...horizontalAnimation,
  // ...TransitionPresets.SlideFromRightIOS,
});

const Routes = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const tabBarIcon = (focused, color, route, rest) => {
    let currentScreen = BOTTOM_TAB_SCREENS.find(
      screen => screen.name === route.name,
    );
    let tabName = currentScreen['name'];
    let iconName = currentScreen[focused ? 'activeIcon' : 'inactiveIcon'];
    return (
      <TouchableOpacity
        style={styles.iconAlignment}
        onPress={() => rest.navigation.navigate(route.name)}>
        <CustomeIcon
          name={iconName}
          size={Dimension.font16}
          color={color}></CustomeIcon>
        <Text style={[styles.tabText, { color: focused ? color : '#A2A2A2' }]}>
          {tabName}
        </Text>
      </TouchableOpacity>
    );
  };

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        initialParams={{
          setIsLoggedIn,
        }}
        screenOptions={({ route, ...rest }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color }) =>
            tabBarIcon(focused, color, route, rest),
          lazy: false,
          safeAreaInsets: { bottom: 0 },
          tabBarStyle: {
            paddingTop: Dimension.padding10,
            paddingBottom: Dimension.padding18,
            borderWidth: 0,
            borderColor: colors.WhiteColor,
            // borderTopLeftRadius: 16,
            //borderTopRightRadius: 16,
            backgroundColor: "#fff",
            height: Platform.OS === 'ios' ? 85 : 80,
            borderBottomWidth: 0,
          },
        })}
        tabBarOptions={tabBarOptions}>
        {BOTTOM_TAB_SCREENS.map((screen, key) => (
          <Tab.Screen
            key={key}
            // lazy={true}
            params={{ setIsLoggedIn }}
            initialParams={{
              setIsLoggedIn,
            }}
            name={screen.name}
            component={prop => (
              <screen.component
                key={key}
                {...prop}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          />
        ))}
      </Tab.Navigator>
    );
  };

  const linking = {
    prefixes: [
      'https://www.suppliercentralqa.moglilabs.com',
      'www.suppliercentralqa.moglilabs.com://',
    ],
    config: {
      initialRouteName: 'HomeApp',
      screens: {
        HomeApp: {
          screens: {
            Orders: {
              path: 'Orders',
            },
            Support: {
              path: 'Support',
            },
            Notification: {
              path: 'Notification',
            },
            More: {
              path: 'More',
            },
          },
        },
      },
    },
  };

  const fallbackComponent = () => (
    <ActivityIndicator
      size={'large'}
      color={'red'}
      style={{
        backgroundColor: '#e7e7e7',
        borderRadius: 8,
        width: '100%',
        marginHorizontal: 12,
        marginBottom: 8,
        paddingVertical: 50,
        alignSelf: 'center',
      }}
    />
  );

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      fallback={fallbackComponent}>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash">
        {!isLoggedIn ? (
          <>
            {(AUTH_STACK_SCREENS || []).map((screen, key) => (
              <AppStack.Screen
                key={key}
                name={screen.name}
                screenOptions={{
                  headerShown: false,
                }}
                component={screen.component}
                initialParams={{
                  setIsLoggedIn,
                }}
              />
            ))}
          </>
        ) : (
          <>
            <AppStack.Screen
              screenOptions={{
                headerShown: false,
              }}
              name="HomeApp"
              component={TabNavigator}
              options={navOptionHandler}
              initialParams={{
                setIsLoggedIn,
              }}
            />
            {(APP_STACK_SCREENS || []).map((screen, key) => (
              <AppStack.Screen
                key={key}
                name={screen.name}
                screenOptions={{
                  headerShown: false,
                }}
                initialParams={{
                  setIsLoggedIn,
                }}
                component={screen.component}
              // options={navOptionHandler}
              />
            ))}
          </>
        )}
      </AppStack.Navigator>
      {/* <Toast ref={ref => Toast.setRef(ref)} /> */}
      <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
  },
  //   IconDefaultColor: {color: colors.ExtralightGrayText},
  tabText: {
    fontSize: Dimension.font10,
    fontFamily: Dimension.CustomMediumFont,
    marginTop: Dimension.margin4,
    color: colors.eyeIcon
  },
  iconAlignment: {
    alignItems: 'center', alignSelf: 'center',
    //paddingTop:Dimension.padding10,
    // paddingBottom:Dimension.padding20
  },
});
const tabBarOptions = {
  activeTintColor: '#D9232D',
  inactiveTintColor: '#C4C4C4',
  showLabel: false,
  lazy: false,
  style: styles.tabBar,
  safeAreaInsets: { bottom: 0 },
};

export default Routes;
