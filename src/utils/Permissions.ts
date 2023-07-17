import {PermissionsAndroid} from 'react-native';

const requestLocationPermission = async () => {
  try {
    console.log('requestLocationPermission');
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'We need your permission to access your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Permission granted, you can now access the location.
    } else {
      // Permission denied, handle accordingly.
    }
  } catch (err) {
    console.warn(err);
  }
};

export {requestLocationPermission};
