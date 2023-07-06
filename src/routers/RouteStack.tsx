import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react';
import React, {useCallback, useMemo} from 'react';
import {Platform} from 'react-native';

import {ScreenName} from '../common/screenNames';
import Login from '@/page/login';
import MyBottomTabs from './BottomTab';

const screenOptions = {headerShown: false};
const Stack = createNativeStackNavigator();

export const isIOS = Platform.OS === 'ios';

const RootStack = observer(() => {
  const AuthStack = useCallback(() => {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={ScreenName.login} component={Login} />
      </Stack.Navigator>
    );
  }, []);

  const HomeStack = useCallback(() => {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={ScreenName.login} component={Login} />
      </Stack.Navigator>
    );
  }, []);

  const AppStack = useCallback(
    () => (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={ScreenName.authStack} component={AuthStack} />
        <Stack.Screen name={ScreenName.bottomTab} component={MyBottomTabs} />
        <Stack.Screen name={ScreenName.homeStack} component={HomeStack} />
      </Stack.Navigator>
    ),
    [AuthStack, HomeStack],
  );

  const renderRootStack = useMemo(() => <AppStack />, [AppStack]);
  return renderRootStack;
});
export default RootStack;
