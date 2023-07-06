import {StyleSheet} from 'react-native';

import {Configs} from '@/common/Configs';
import {COLORS} from './colors';

export const Styles = {
  typography: StyleSheet.create({
    // white
    regularSmall: {
      color: COLORS.BLACK,
      fontSize: Configs.FontSize.size10,
      fontFamily: Configs.FontFamily.regular,
    },
    regular: {
      color: COLORS.BLACK,
      fontSize: Configs.FontSize.size14,
      fontFamily: Configs.FontFamily.regular,
    },
    regularBig: {
      color: COLORS.BLACK,
      fontSize: Configs.FontSize.size16,
      fontFamily: Configs.FontFamily.regular,
    },
    regularBigX: {
      color: COLORS.BLACK,
      fontSize: Configs.FontSize.size18,
      fontFamily: Configs.FontFamily.regular,
    },
    medium: {
      color: COLORS.BLACK,
      fontSize: Configs.FontSize.size14,
      fontFamily: Configs.FontFamily.medium,
    },
    mediumSmall: {
      color: COLORS.BLACK,
      fontSize: Configs.FontSize.size10,
      fontFamily: Configs.FontFamily.medium,
    },
    mediumBig: {
      color: COLORS.BLACK,
      fontSize: Configs.FontSize.size16,
      fontFamily: Configs.FontFamily.medium,
    },
    mediumBigX: {
      color: COLORS.BLACK,
      fontSize: Configs.FontSize.size18,
      fontFamily: Configs.FontFamily.medium,
    },
    boldSmall: {
      color: COLORS.BLACK,
      fontSize: Configs.FontSize.size10,
      fontFamily: Configs.FontFamily.bold,
    },
    bold: {
      color: COLORS.BLACK,
      fontSize: Configs.FontSize.size14,
      fontFamily: Configs.FontFamily.bold,
    },
    boldBig: {
      color: COLORS.BLACK,
      fontSize: Configs.FontSize.size16,
      fontFamily: Configs.FontFamily.bold,
    },
    boldBigX: {
      color: COLORS.BLACK,
      fontSize: Configs.FontSize.size18,
      fontFamily: Configs.FontFamily.bold,
    },
  }),
  shadow: {
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
  },
  heavyShadow: {
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 2,
    shadowRadius: 14,
    elevation: 10,
  },
  textTransform: {
    textTransform: 'uppercase',
  },
};

export const HtmlStyles = {
  a: {
    ...Styles.typography.regular,
    color: COLORS.BLACK,
    fontSize: Configs.FontSize.size13,
    textAlign: 'center',
  },
  b: {
    ...Styles.typography.medium,
    color: COLORS.BLACK,
    fontSize: Configs.FontSize.size13,
    textAlign: 'center',
  },
  w: {
    ...Styles.typography.regular,
    color: COLORS.WHITE,
    fontSize: Configs.FontSize.size13,
    textAlign: 'center',
  },
};

export const RenderHtmlStyle = {
  p: {
    paddingTop: 0,
    paddingBottom: 0,
  },
};
