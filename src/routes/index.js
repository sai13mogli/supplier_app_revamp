import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  APP_STACK_SCREENS,
  AUTH_STACK_SCREENS,
  BOTTOM_TAB_SCREENS,
} from '../constants/index';

const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const horizontalAnimation = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({current, layouts}) => {
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
    //   let iconName = currentScreen[focused ? 'activeIcon' : 'inactiveIcon'];
    return (
      <TouchableOpacity
        style={styles.iconAlignment}
        onPress={() => rest.navigation.navigate(route.name)}>
        {/* <CustomeIcon name={iconName} size={26} color={color}></CustomeIcon> */}
        {/* {tabName == 'Profile' ? (
                <ProfileTabIcon focused={focused} iconName={iconName} color={color} />
              ) : currentScreen.iconType ? (
                <BottomIcon name={iconName} size={26} color={color} />
              ) : (
                <Icon name={iconName} size={26} color={color} />
              )} */}
        <Text style={[styles.tabText, {color: focused ? color : '#3c3c3c'}]}>
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
        screenOptions={({route, ...rest}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color}) =>
            tabBarIcon(focused, color, route, rest),
          lazy: false,
          safeAreaInsets: {bottom: 0},
        })}
        tabBarOptions={tabBarOptions}>
        {BOTTOM_TAB_SCREENS.map((screen, key) => (
          <Tab.Screen
            key={key}
            // lazy={false}
            params={{setIsLoggedIn}}
            initialParams={{
              setIsLoggedIn,
            }}
            name={screen.name}
            component={prop => (
              <screen.component {...prop} setIsLoggedIn={setIsLoggedIn} />
            )}
          />
        ))}
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash">
        {!isLoggedIn ? (
          <>
            {AUTH_STACK_SCREENS.map((screen, key) => (
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
            {APP_STACK_SCREENS.map((screen, key) => (
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
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
  },
  //   IconDefaultColor: {color: colors.ExtralightGrayText},
  tabText: {
    fontSize: 10,
    // fontFamily: Dimension.CustomMediumFont,
    marginTop: 4,
  },
  iconAlignment: {alignItems: 'center', alignSelf: 'center'},
});
const tabBarOptions = {
  activeTintColor: '#D9232D',
  inactiveTintColor: '#C4C4C4',
  showLabel: false,
  lazy: false,
  style: styles.tabBar,
  safeAreaInsets: {bottom: 0},
};

export default Routes;
