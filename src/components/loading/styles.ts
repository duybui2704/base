import {StyleSheet} from 'react-native';
import {COLORS, Styles} from '@/theme';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/utils/DimensionUtils';

const styles = StyleSheet.create({
  inline: {
    ...Styles.shadow,
    marginVertical: 10,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    top: SCREEN_HEIGHT * 0.35,
    right: SCREEN_WIDTH * 0.35,
    alignSelf: 'center',
    height: SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH * 0.3,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
  },
  activityIndicatorSmall: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  txt: {
    ...Styles.typography.regular,
  },
});

export default styles;
