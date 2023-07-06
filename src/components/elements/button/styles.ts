import {StyleSheet} from 'react-native';

import {COLORS, Styles} from '@/theme';
import {Configs} from '@/common/Configs';

export const styles = StyleSheet.create({
  // default
  container: {
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'center',
    height: Configs.FontSize.size45,
    borderRadius: Configs.FontSize.size8,
    flexDirection: 'row',
  },
  icon: {
    width: Configs.IconSize.size14,
    height: Configs.IconSize.size14,
    marginRight: 5,
  },
  rightIcon: {
    paddingLeft: 10,
  },
  lefIconFont: {
    ...Styles.typography.regular,
    paddingRight: 20,
    fontSize: Configs.IconSize.size30,
  },
  text: {
    ...Styles.typography.medium,
    textAlign: 'center',
    flex: 1,
    color: COLORS.WHITE,
  },
  // background & border
  redButton: {
    backgroundColor: COLORS.RED,
  },
  whiteButton: {
    backgroundColor: COLORS.WHITE,
  },
  blueButton: {
    backgroundColor: COLORS.BLUE,
  },
  blackButton: {
    backgroundColor: COLORS.BLACK,
  },
  grayButton: {
    backgroundColor: COLORS.GRAY,
  },
});
