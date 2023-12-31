import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Platform, ViewStyle} from 'react-native';
import appsFlyer from 'react-native-appsflyer';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppStoreProvider} from '../provider/app-provider/index';
import {COLORS} from '../theme/colors';
// import {navigationRef} from './Navigator';
// import RootStack from './RootStack';
// import {AFInit, AFLogEvent} from '@/utils/AppsFlyer';
import {enableScreens} from 'react-native-screens';
import RootStack from './RouteStack';
import {navigationRef} from './Navigator';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {PopupsProvider} from '@/provider/popups-provider';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.GRAY,
  },
};
const styles = {
  flex: 1,
} as ViewStyle;

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      enableScreens(false);
    }
  }, []);

  //   CodePush.sync(
  //     codePushOptions,
  //     status => {
  //       switch (status) {
  //         // case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
  //         //   break;
  //         // case CodePush.SyncStatus.INSTALLING_UPDATE:
  //         //   break;
  //         case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
  //           break;
  //         case CodePush.SyncStatus.UP_TO_DATE:
  //           break;
  //         default:
  //           break;
  //       }
  //     },
  //     () => {
  //       console.log('code push');
  //     },
  //   );

  useEffect(() => {
    const AFGCDListener = appsFlyer.onInstallConversionData(res => {
      const isFirstLaunch = res?.data?.is_first_launch;
      // console.log('onInstallConversionData = ' + JSON.stringify(res));
      // alert('onInstallConversionData = ' + JSON.stringify(res));
      if (isFirstLaunch && JSON.parse(isFirstLaunch) === true) {
        // AFLogEvent('af_first_open', res?.data);
        // alert(`2 = ${  JSON.stringify(res?.data)}`);
      }
    });

    const AFUDLListener = appsFlyer.onDeepLink(res => {
      if (res?.deepLinkStatus !== 'NOT_FOUND') {
        try {
          const data = res?.data;
          // alert(`3 = ${  JSON.stringify(res?.data)}`);

          if (data) {
            let source = 'AppsFlyer';
            const campaignName = data.c;
            if (campaignName) {
              source = `${source}:${campaignName}`;
            }
            // setLocale(LOCALE_KEY.deep_linking_source, source);
          }

          // setLocale(LOCALE_KEY.deep_linking_data, JSON.stringify(data));
          // console.log('onDeepLink found = ' + JSON.stringify(res));
          // alert('onDeepLink found = ' + JSON.stringify(res?.data));
        } catch (e) {
          console.log('err');
        }
      }
    });

    // AFInit();

    return () => {
      AFGCDListener();
      AFUDLListener();
    };
  }, []);
  return (
    <SafeAreaProvider>
      <AppStoreProvider>
        <PopupsProvider>
          <NavigationContainer ref={navigationRef} theme={MyTheme}>
            <GestureHandlerRootView style={styles}>
              <BottomSheetModalProvider>
                <RootStack />
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </NavigationContainer>
        </PopupsProvider>
      </AppStoreProvider>
    </SafeAreaProvider>
  );
};

// const codePushOptions = {
//   installMode: CodePush.InstallMode.IMMEDIATE,
//   checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
// };

// export default CodePush(codePushOptions)(App);
export default App;
