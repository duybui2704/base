import {Dimensions, Platform} from 'react-native';
const screenScale = Dimensions.get('window').scale;

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_WIDTH_ANDROID = Dimensions.get('screen').width;
export const SCREEN_HEIGHT_ANDROID = Dimensions.get('screen').height;
function deviceHasNotch() {
  const _height = SCREEN_HEIGHT * screenScale;
  if (Platform.OS === 'ios') {
    switch (_height) {
      case 1792: // iPhone XR/ 11
      case 2436: // iPhone X/XS/11 Pro
      case 2688: // iPhone XS Max/11 Pro Max
      case 2778: // iPhone 12 ProMax,
      case 2340: // iPhone 12 mini
      case 2532: // iPhone 12, 12 pro
      case 2556: // iPhone 14 pro
        return true;
      case 2796: // iPhone 14 pro max
        return true;
      default:
        break;
    }
  }
  return false;
}

function getPaddingTopByDevice() {
  return deviceHasNotch() ? 12 : 0;
}

// check if devices is ipX, ipXS, ipXSMAx

function getPaddingBottomByDevice() {
  return deviceHasNotch() ? 12 : 0;
}

export default {
  SCREEN_WIDTH: SCREEN_WIDTH,
  SCREEN_HEIGHT: SCREEN_HEIGHT,
  getPaddingTopByDevice,
  getPaddingBottomByDevice,
};
