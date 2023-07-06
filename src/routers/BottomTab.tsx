/* eslint-disable react/prop-types */
import ScreenName from '@/common/screenNames';
import Home from '@/page/home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {ViewProps} from 'react-native';
import IcHome from '@/assets/svg/tabs/ic_home.svg';
import IcAccount from '@/assets/svg/tabs/ic_account.svg';
import Login from '@/page/login';
import {COLORS} from '@/theme';

const Tab = createBottomTabNavigator();
const screenOptions = {headerShown: false};
const Stack = createNativeStackNavigator();
const TabsData = [
  {
    name: ScreenName.homeStack,
    label: 'HomeStack',
    icon: <IcHome />,
    color: COLORS.GRAY,
    index: 0,
  },
  {
    name: ScreenName.authStack,
    label: 'AuthStack',
    icon: <IcAccount />,
    color: COLORS.GRAY,
    index: 1,
  },
];

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={ScreenName.homeStack} component={Home} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={ScreenName.authStack} component={Login} />
    </Stack.Navigator>
  );
};

const TabBar = ({props}: any) => {
  const {focused, tabName} = props;
  const tab = TabsData.filter(item => item?.name === tabName || item?.label === tabName)[0];
  const getColor = useCallback(() => {
    if (focused) return 'orange';
    return 'gray';
  }, [focused]);

  return <>{tab.icon}</>;
};

const MyBottomTabs = () => {
  const onTabPress = useCallback((e: any, navigation: any, route: any) => {
    e?.preventDefault();
    navigation.navigate(route?.name);
  }, []);

  const getTabBarVisibility = useCallback((route: object) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === undefined ||
      routeName === ScreenName.authStack ||
      routeName === ScreenName.homeStack
    ) {
      return {display: 'flex'};
    }
    return {display: 'none'};
  }, []);

  const getOptions = useCallback(
    (props: any) => ({
      tabBarIcon: (data: any) => <TabBar props={{...data, tabName: props?.route?.name}} />,
      tabBarStyle: getTabBarVisibility(props?.route) as ViewProps,
    }),
    [getTabBarVisibility],
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          padding: 5,
        },
      }}>
      <Tab.Screen
        name={ScreenName.homeStack}
        component={HomeStack}
        options={getOptions}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            onTabPress(e, navigation, route);
          },
        })}
      />
      <Tab.Screen
        name={ScreenName.authStack}
        component={AuthStack}
        options={getOptions}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            onTabPress(e, navigation, route);
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default MyBottomTabs;
