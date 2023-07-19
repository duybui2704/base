import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import {Platform} from 'react-native';

async function getFcmToken() {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    return fcmToken;
  }
  return null;
}

const createChannel = () => {
  if (Platform.OS === 'android') {
    PushNotification.createChannel(
      {
        channelId: 'FoodCourt-chanel', // (required)
        channelName: 'FoodCourt', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        importance: Importance.HIGH,
      },
      (created: any) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }
};

async function requestUserPermissionNotify() {
  const authStatus = await messaging().requestPermission({
    alert: false,
    badge: true,
  });
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

async function configNotification(onNotification: () => void) {
  requestUserPermissionNotify();
  createChannel();

  if (Platform.OS === 'android') {
    PushNotification.configure({
      async onNotification(notification: any) {
        if (notification.channelId) {
          onNotification();
        }
      },

      onAction(notification: any) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError(err: any) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }
}

function getFileName(file?: any) {
  if (file?.name !== undefined) {
    return file.name;
  }
  if (file?.filename !== undefined && file?.filename !== null) {
    return file?.filename;
  }
  const type = file?.mime || file?.type;
  return `${Math.floor(Math.random() * Math.floor(999999999))}.${type?.split('/')[1]}`;
}

export default {
  getFileName,
  configNotification,
  getFcmToken,
};
