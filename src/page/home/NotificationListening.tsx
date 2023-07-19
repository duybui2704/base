/* eslint-disable react-hooks/exhaustive-deps */
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import {observer} from 'mobx-react';
import React, {useCallback, useEffect} from 'react';
import PushNotification from 'react-native-push-notification';

import {isIOS} from '@/common/Configs';
import Utils from '@/utils/Utils';

const NotificationListening = observer(({children}: any) => {
  const createToken = useCallback(async () => {
    const fcmToken = await Utils.getFcmToken();
    console.log('fcmToken ==', fcmToken);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLocalNotificationIOS = (notification: any) => {
    const isClicked = notification.getData().userInteraction === 1;
    if (isClicked) {
      navigateNotify();
    }
  };

  const pushNotificationLocal = useCallback(async (remoteMessage: any) => {
    if (isIOS) {
      PushNotificationIOS.addNotificationRequest({
        id: 'notificationWithSound',
        title: remoteMessage?.notification?.title,
        body: remoteMessage?.notification?.body,
        sound: 'customSound.wav',
      });
    } else {
      console.log('PushNotification');
      PushNotification.localNotification({
        // id: 'notificationWithSound',
        // autoCancel: true,
        channelId: 'FoodCourt-chanel',
        // showWhen: true,
        title: remoteMessage?.notification?.title,
        message: remoteMessage?.notification?.body,
        // vibrate: true,
        // vibration: 300,
        // playSound: true,
        // soundName: 'default',
      });
      console.log('Đã gọi PushNotification.localNotification');
    }
  }, []);

  const navigateNotify = useCallback(() => {
    console.log('navigateNotify');
  }, []);

  useEffect(() => {
    Utils.configNotification(navigateNotify);
    if (isIOS) {
      PushNotificationIOS.addEventListener('localNotification', onLocalNotificationIOS);
    }
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log('unsubscribe', remoteMessage);

      pushNotificationLocal(remoteMessage);
    });
    console.log('messaging');
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.log('Message handled in the background!', remoteMessage);
    });
    messaging().onNotificationOpenedApp((remoteMessage: any) => {
      if (remoteMessage) {
        navigateNotify();
      }
    });
    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        if (remoteMessage) {
          navigateNotify();
        }
      });
    return unsubscribe;
  }, [navigateNotify, onLocalNotificationIOS, pushNotificationLocal]);

  useEffect(() => {
    createToken();
  }, []);

  return <>{children}</>;
});

export default NotificationListening;
